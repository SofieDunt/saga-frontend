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
import SoftButton from "../../components/softButton";
import { ButtonLabel, Header, PageContainer, StoryTitle } from "../../themes";
import AddStatusForm from "../../forms/addStatusForm";
import LinkButton from "../../components/linkButton";
import { ACTION_BUTTON_MARGIN, SECONDARY } from "../../themes";
import ExportForm from "../../forms/exportForm";
import SetInitialChoiceForm from "../../forms/setInitialChoiceForm";

enum SwitchFormTypes {
  ADD_STATUS,
  SET_INITIAL,
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
      Client.quitWork().then(() => {}, message.errorAlert);
    };

    window.addEventListener("unload", handleQuit);
    return () => window.removeEventListener("unload", handleQuit);
  });

  useEffect(() => {
    const handleLoaded = (res: Story): void => {
      if (res.name !== "") {
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

  const updateInitialChoice = (): void => {
    Client.getInitialChoice().then(
      (res: number) =>
        setWork((prev) => {
          return {
            name: prev.name,
            statuses: prev.statuses,
            choices: prev.choices,
            decisions: prev.decisions,
            choice: res,
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

  const onAddChoice = (): void => {
    Client.addChoice().then(updateChoicesAndDecisions, message.errorAlert);
  };

  if (!workName) {
    return (
      <PageContainer>
        <StoryTitle>{noWorkMessage}</StoryTitle>
        <LinkButton to={Routes.WRITER_LIBRARY} bg={SECONDARY}>
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
                choices={work.choices}
                decisions={work.decisions}
                statuses={work.statuses}
                onSuccess={updateChoicesAndDecisions}
                message={message}
              />
            );
          })}
        </Flex>
        <Header>Initial Choice: {work.choice}</Header>

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
              case SwitchFormTypes.SET_INITIAL:
                return (
                  <>
                    <Header>Set Initial Choice</Header>
                    <SetInitialChoiceForm
                      choices={work.choices}
                      onSuccess={updateInitialChoice}
                      message={message}
                    />
                  </>
                );
              case SwitchFormTypes.NONE:
              default:
                return (
                  <>
                    <SoftButton
                      text={"Add Status"}
                      margin={ACTION_BUTTON_MARGIN}
                      onClick={() => setCurrentForm(SwitchFormTypes.ADD_STATUS)}
                    />
                    <SoftButton
                      text={"Add Choice"}
                      margin={ACTION_BUTTON_MARGIN}
                      onClick={onAddChoice}
                    />
                    <SoftButton
                      text={"Set Initial Choice"}
                      margin={ACTION_BUTTON_MARGIN}
                      onClick={() =>
                        setCurrentForm(SwitchFormTypes.SET_INITIAL)
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
              margin={ACTION_BUTTON_MARGIN}
            />
            <SoftButton
              text={"Export to Player"}
              onClick={exportToPlayer}
              margin={ACTION_BUTTON_MARGIN}
            />
          </Flex>
        ) : (
          <Box mr={"10px"} width={"70%"}>
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
