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
import { PageProps } from "../../App";
import ChoiceCard from "../choiceCard";
import TitleForm from "../../forms/titleForm";
import StatusCard from "../statusCard";
import DecisionCard from "../decisionCard";
import SoftButton from "../softButton";
import { CurrentContainer, StoryTitle } from "../themeComponents";

const Header = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  padding: 15px 0 5px;
`;

const actionButtonMargin = "0 5px 5px 0";

interface WorkEditorProps extends PageProps {
  readonly workName: string;
}

const WorkEditor: React.FC<WorkEditorProps> = ({ message, workName }) => {
  const [work, setWork] = useState<Story>();
  const [noWorkMessage, setNoWorkMessage] = useState("Loading...");

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
                    return <StatusCard key={status.name} status={status} />;
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
        <SoftButton text={"Add Status"} margin={actionButtonMargin} />
        <SoftButton text={"Remove Status"} margin={actionButtonMargin} />
        <SoftButton text={"Add Option"} margin={actionButtonMargin} />
        <SoftButton text={"Remove Option"} margin={actionButtonMargin} />
        <br />
        <SoftButton text={"Add Simple Decision"} margin={actionButtonMargin} />
        <SoftButton
          text={"Add Consequential Decision"}
          margin={actionButtonMargin}
        />
        <SoftButton
          text={"Add Simple Dependent Decision"}
          margin={actionButtonMargin}
        />
        <SoftButton
          text={"Add Consequential Dependent Decision"}
          margin={actionButtonMargin}
        />
      </Box>

      <Header>Export</Header>
      <SoftButton text={"Export to Player"} margin={actionButtonMargin} />
    </CurrentContainer>
  );
};

export default WorkEditor;
