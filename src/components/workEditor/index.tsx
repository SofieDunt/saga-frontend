import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import {
  Choice,
  Decision,
  ErrorResponse,
  Story,
  StoryStatus,
} from "../../client/types";
import { Box, Flex, Text } from "rebass";
import styled from "@emotion/styled";
import { ErrorHandlerProps } from "../../App";
import ChoiceCard from "../choiceCard";
import TitleForm from "../../forms/titleForm";
import StatusCard from "../statusCard";
import DecisionCard from "../decisionCard";
import SoftButton from "../softButton";
import { CurrentContainer, StoryTitle } from "../themeComponents";
import AddStatusForm from "../../forms/addStatusForm";

const Header = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  padding: 15px 0 5px;
`;

const actionButtonMargin = "0 5px 5px 0";

enum SwitchFormTypes {
  ADD_STATUS,
  ADD_SIMPLE,
  ADD_CONSEQUENTIAL,
  ADD_SIMPLE_DEPENDENT,
  ADD_CONSEQUENTIAL_DEPENDENT,
  NONE,
}

interface WorkEditorProps extends ErrorHandlerProps {
  readonly workName: string;
}

const WorkEditor: React.FC<WorkEditorProps> = ({ message, workName }) => {
  const [work, setWork] = useState<Story>();
  const [noWorkMessage, setNoWorkMessage] = useState("Loading...");
  const [currentForm, setCurrentForm] = useState<SwitchFormTypes>();

  useEffect(() => {
    const effectGetCurrentWork = (): void => {
      Client.getCurrentWork().then(
        (res: Story) => setWork(res),
        message.errorAlert
      );
    };

    Client.loadWork(workName).then(
      effectGetCurrentWork,
      (err: ErrorResponse) => {
        message.triggerAlert(err.message);
        setNoWorkMessage("Oops! Looks like this work doesn't exist.");
      }
    );
  }, [message, workName]);

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
          if (prev) {
            return {
              name: prev.name,
              statuses: res,
              choices: prev.choices,
              decisions: prev.decisions,
              choice: prev.choice,
            };
          } else {
            return {
              name: "",
              statuses: res,
              choices: [],
              decisions: [],
              choice: -1,
            };
          }
        }),
      message.errorAlert
    );
  };

  return (
    <CurrentContainer>
      {(() => {
        switch (work) {
          case undefined:
            return <StoryTitle>{noWorkMessage}</StoryTitle>;
          default:
            return (
              <>
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
                      />
                    );
                  })}
                </Flex>

                <Header>Decisions</Header>
                <Flex flexWrap={"wrap"}>
                  {work.decisions.map((decision: Decision) => {
                    return (
                      <DecisionCard key={decision.id} decision={decision} />
                    );
                  })}
                </Flex>
              </>
            );
        }
      })()}

      <Header>Edit</Header>
      <Box>
        {(() => {
          switch (currentForm) {
            case SwitchFormTypes.ADD_STATUS:
              return (
                <>
                  <Header>Add Status</Header>
                  <AddStatusForm onSuccess={updateStatuses} message={message} />
                </>
              );
            case SwitchFormTypes.ADD_SIMPLE:
            case SwitchFormTypes.ADD_CONSEQUENTIAL:
            case SwitchFormTypes.ADD_SIMPLE_DEPENDENT:
            case SwitchFormTypes.ADD_CONSEQUENTIAL_DEPENDENT:
            case SwitchFormTypes.NONE:
            default:
          }
        })()}
        {currentForm !== SwitchFormTypes.NONE ? (
          <SoftButton
            text={"Cancel"}
            onClick={() => setCurrentForm(SwitchFormTypes.NONE)}
          />
        ) : (
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
              onClick={() => setCurrentForm(SwitchFormTypes.ADD_CONSEQUENTIAL)}
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
                setCurrentForm(SwitchFormTypes.ADD_CONSEQUENTIAL_DEPENDENT)
              }
            />
          </>
        )}
      </Box>

      <Header>Export</Header>
      <SoftButton text={"Export to Player"} margin={actionButtonMargin} />
    </CurrentContainer>
  );
};

export default WorkEditor;