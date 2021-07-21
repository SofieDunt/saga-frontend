import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import {
  ApplicationTypes,
  Choice,
  Decision,
  Story,
  StoryStatus,
} from "../../client/types";
import { Box, Flex } from "rebass";
import { ErrorHandlerProps, Routes } from "../../App";
import ChoiceCard from "../../components/choiceCard";
import TitleForm from "../../forms/titleForm";
import StatusCard from "../../components/statusCard";
import DecisionCard from "../../components/decisionCard";
import SoftButton from "../../components/softButton";
import {
  ButtonLabel,
  Header,
  PageContainer,
  StoryTitle,
} from "../../components/themeComponents";
import AddStatusForm from "../../forms/addStatusForm";
import AddSimpleDecisionForm from "../../forms/addSimpleDecisionForm";
import AddConsequentialDecisionForm from "../../forms/addConsequentialDecisionForm";
import AddSimpleDependentDecisionForm from "../../forms/addSimpleDependentDecisionForm";
import AddConsequentialDependentDecisionForm from "../../forms/addConsequentialDependentDecisionForm";
import LinkButton from "../../components/linkButton";
import { PURPLE } from "../../themes";
import ExportForm from "../../forms/exportForm";

const actionButtonMargin = "0 5px 5px 0";

enum SwitchFormTypes {
  ADD_STATUS,
  ADD_SIMPLE,
  ADD_CONSEQUENTIAL,
  ADD_SIMPLE_DEPENDENT,
  ADD_CONSEQUENTIAL_DEPENDENT,
  NONE,
}

const noStory: Story = {
  name: "",
  statuses: [],
  choices: [],
  decisions: [],
  choice: -1,
};

const WorkEditor: React.FC<ErrorHandlerProps> = ({ message }) => {
  const [workName, setWorkName] = useState<string>();
  const [work, setWork] = useState<Story>(noStory);
  const [noWorkMessage, setNoWorkMessage] = useState("Loading...");
  const [currentForm, setCurrentForm] = useState<SwitchFormTypes>(
    SwitchFormTypes.NONE
  );
  // Export Work Form
  const [exportVisible, setExportVisible] = useState(false);

  useEffect(() => {
    const handleQuit = (): void => {
      Client.quitWork().then(null, message.errorAlert);
    };

    window.addEventListener("unload", handleQuit);
    return () => window.removeEventListener("unload", handleQuit);
  });

  useEffect(() => {
    const handleLoaded = (res: Story): void => {
      if (res) {
        setWork(res);
        Client.getCurrentWorkName().then(
          (res: string) => setWorkName(res),
          message.errorAlert
        );
      } else {
        setWorkName(undefined);
        setNoWorkMessage(
          "Oops! Looks like you haven't loaded a story to edit!"
        );
      }
    };

    Client.getCurrentWork().then(handleLoaded, message.errorAlert);
  }, [message]);

  const getCurrentWork = (): void => {
    Client.getCurrentWork().then(
      (res: Story) => setWork(res),
      message.errorAlert
    );
  };

  const updateStatuses = (): void => {
    Client.getCurrentStatuses().then(
      (res: StoryStatus[]) =>
        setWork((prev) => {
          return {
            name: prev.name,
            statuses: res,
            choices: prev.choices,
            decisions: prev.decisions,
            choice: prev.choice,
          };
        }),
      message.errorAlert
    );
    setCurrentForm(SwitchFormTypes.NONE);
  };

  const updateChoicesAndDecisions = (): void => {
    Client.getCurrentChoices().then((res: Choice[]) => {
      Client.getCurrentDecisions().then((dRes: Decision[]) => {
        setWork((prev) => {
          return {
            name: prev.name,
            statuses: prev.statuses,
            choices: res,
            decisions: dRes,
            choice: prev.choice,
          };
        });
      }, message.errorAlert);
    }, message.errorAlert);
    setCurrentForm(SwitchFormTypes.NONE);
  };

  const exportToPlayer = (): void => {
    Client.exportToPlayer().then(
      () => message.triggerMessage("Successfully exported!"),
      message.errorAlert
    );
  };

  const onClickExport = (): void => {
    setExportVisible(true);
  };

  const onExportSuccess = (): void => {
    message.triggerMessage("Exported successfully!");
    setExportVisible(false);
  };

  if (!workName) {
    return (
      <PageContainer>
        <StoryTitle>{noWorkMessage}</StoryTitle>
        <LinkButton to={Routes.WRITER_LIBRARY} bg={PURPLE}>
          <ButtonLabel>Go back to your library!</ButtonLabel>
        </LinkButton>
      </PageContainer>
    );
  } else {
    return (
      <PageContainer>
        <StoryTitle>Story Editor</StoryTitle>
        <Header>Work: {workName}</Header>
        <TitleForm
          title={work.name}
          message={message}
          onFinish={getCurrentWork}
        />
        <Header>Statuses</Header>
        <Flex flexWrap={"wrap"}>
          {work.statuses.map((status: StoryStatus) => {
            return (
              <StatusCard
                key={status.name}
                status={status}
                updateStory={updateStatuses}
                message={message}
              />
            );
          })}
        </Flex>

        <Header>Choices</Header>
        <Flex flexWrap={"wrap"}>
          {work.choices.map((choice: Choice) => {
            return (
              <ChoiceCard
                key={choice.id}
                choice={choice}
                decisions={work?.decisions}
                onSuccess={updateChoicesAndDecisions}
                message={message}
              />
            );
          })}
        </Flex>
        <Header>Initial Choice: {work.choice}</Header>

        <Header>Decisions</Header>
        <Flex flexWrap={"wrap"}>
          {work.decisions.map((decision: Decision) => {
            return <DecisionCard key={decision.id} decision={decision} />;
          })}
        </Flex>

        <Header>Edit</Header>
        <Box>
          {(() => {
            switch (currentForm) {
              case SwitchFormTypes.ADD_STATUS:
                return (
                  <>
                    <Header>Add Status</Header>
                    <AddStatusForm onSuccess={updateStatuses} />
                  </>
                );
              case SwitchFormTypes.ADD_SIMPLE:
                return (
                  <>
                    <Header>Add Simple Decision</Header>
                    <AddSimpleDecisionForm
                      onSuccess={updateChoicesAndDecisions}
                      choices={work.choices}
                    />
                  </>
                );
              case SwitchFormTypes.ADD_CONSEQUENTIAL:
                return (
                  <>
                    <Header>Add Consequential Decision</Header>
                    <AddConsequentialDecisionForm
                      onSuccess={updateChoicesAndDecisions}
                      choices={work.choices}
                      statuses={work.statuses}
                    />
                  </>
                );
              case SwitchFormTypes.ADD_SIMPLE_DEPENDENT:
                return (
                  <>
                    <Header>Add Simple Dependent Decision</Header>
                    <AddSimpleDependentDecisionForm
                      onSuccess={updateChoicesAndDecisions}
                      choices={work.choices}
                      statuses={work.statuses}
                    />
                  </>
                );
              case SwitchFormTypes.ADD_CONSEQUENTIAL_DEPENDENT:
                return (
                  <>
                    <Header>Add Consequential Dependent Decision</Header>
                    <AddConsequentialDependentDecisionForm
                      onSuccess={updateChoicesAndDecisions}
                      choices={work.choices}
                      statuses={work.statuses}
                    />
                  </>
                );
              case SwitchFormTypes.NONE:
              default:
                return (
                  <>
                    <SoftButton
                      text={"Add Status"}
                      margin={actionButtonMargin}
                      onClick={() => setCurrentForm(SwitchFormTypes.ADD_STATUS)}
                    />
                    <br />
                    <SoftButton
                      text={"Add Simple Decision"}
                      margin={actionButtonMargin}
                      onClick={() => setCurrentForm(SwitchFormTypes.ADD_SIMPLE)}
                    />
                    <SoftButton
                      text={"Add Consequential Decision"}
                      margin={actionButtonMargin}
                      onClick={() =>
                        setCurrentForm(SwitchFormTypes.ADD_CONSEQUENTIAL)
                      }
                    />
                    <SoftButton
                      text={"Add Simple Dependent Decision"}
                      margin={actionButtonMargin}
                      onClick={() =>
                        setCurrentForm(SwitchFormTypes.ADD_SIMPLE_DEPENDENT)
                      }
                    />
                    <SoftButton
                      text={"Add Consequential Dependent Decision"}
                      margin={actionButtonMargin}
                      onClick={() =>
                        setCurrentForm(
                          SwitchFormTypes.ADD_CONSEQUENTIAL_DEPENDENT
                        )
                      }
                    />
                  </>
                );
            }
          })()}
          {currentForm !== SwitchFormTypes.NONE && (
            <SoftButton
              text={"Cancel"}
              onClick={() => setCurrentForm(SwitchFormTypes.NONE)}
            />
          )}
        </Box>
        <Header>Export</Header>
        {!exportVisible ? (
          <Flex>
            <SoftButton
              text={"Export"}
              onClick={onClickExport}
              margin={actionButtonMargin}
            />
            <SoftButton
              text={"Export to Player"}
              onClick={exportToPlayer}
              margin={actionButtonMargin}
            />
          </Flex>
        ) : (
          <Box minWidth={"400px"} mr={"10px"} width={"50%"}>
            <ExportForm
              name={workName}
              onSuccess={onExportSuccess}
              exportType={ApplicationTypes.WORK}
            />
            <SoftButton
              text={"Cancel"}
              onClick={() => setExportVisible(false)}
              margin={"10px 0 0 0"}
            />
          </Box>
        )}
      </PageContainer>
    );
  }
};

export default WorkEditor;
