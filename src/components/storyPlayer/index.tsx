import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import { ErrorResponse, Option, Story } from "../../client/types";
import { Box, Button, Flex, Text } from "rebass";
import styled from "@emotion/styled";
import { WARN } from "../../themes";
import { PageProps } from "../../App";
import { CurrentContainer, StoryTitle } from "../themeComponents";
import SoftButton from "../softButton";

const BottomBox = styled(Box)`
  position: absolute;
  bottom: 50px;
  right: 50px;
`;

const ScriptText = styled(Text)`
  font-size: 16px;
  line-height: 22px;
`;

const DecisionText = styled(ScriptText)`
  padding-left: 20px;
  padding-bottom: 5px;
`;

interface StoryPlayerProps extends PageProps {
  readonly storyName: string;
}

const StoryPlayer: React.FC<StoryPlayerProps> = ({ storyName, message }) => {
  const [story, setStory] = useState<Story>();
  const [prevChoices, setPrevChoices] = useState<string[]>([]);
  const [prevDecisions, setPrevDecisions] = useState<string[]>([]);
  const [noStoryMessage, setNoStoryMessage] = useState("Loading...");

  useEffect(() => {
    const effectGetCurrentStory = (): void => {
      Client.getCurrentStory().then((res) => setStory(res), message.errorAlert);
    };

    const effectGetCurrentDescription = (): void => {
      Client.getCurrentChoice().then(
        (res) => setPrevChoices((prev) => [...prev, res]),
        message.errorAlert
      );
    };

    Client.loadStory(storyName).then(
      effectGetCurrentStory,
      (err: ErrorResponse) => {
        message.triggerAlert(err.message);
        setNoStoryMessage("Oops! Looks like this story doesn't exist.");
      }
    );
    if (prevChoices.length === 0) {
      effectGetCurrentDescription();
    }
  }, [message, storyName, prevChoices.length]);

  const getCurrentStory = (): void => {
    Client.getCurrentStory().then((res) => setStory(res), message.errorAlert);
  };

  const getCurrentDescription = (): void => {
    Client.getCurrentChoice().then(
      (res) => setPrevChoices((prev) => [...prev, res]),
      message.errorAlert
    );
  };

  const choose = (decision: number): void => {
    if (story) {
      setPrevDecisions((prev) => [
        ...prev,
        story.decisions[decision].description,
      ]);
      Client.choose(decision).then(getCurrentStory, message.errorAlert);
      getCurrentDescription();
    }
  };

  const onRestart = (): void => {
    const afterRestart = (): void => {
      getCurrentStory();
      setPrevDecisions((prev) => [...prev, "Restarted the story"]);
      getCurrentDescription();
    };
    Client.restart().then(afterRestart, message.errorAlert);
  };

  return (
    <CurrentContainer>
      {(() => {
        switch (story) {
          case undefined:
            return <StoryTitle>{noStoryMessage}</StoryTitle>;
          default:
            const storyOptions: Option[] = story.choices[story.choice].options;
            return (
              <>
                <StoryTitle>{story.name}</StoryTitle>
                {prevChoices.map((str, i) => {
                  return (
                    <div key={str + i}>
                      <ScriptText>{str}</ScriptText>
                      {i < prevDecisions.length && (
                        <DecisionText>Chose: {prevDecisions[i]}</DecisionText>
                      )}
                    </div>
                  );
                })}
                {storyOptions.length > 0 && (
                  <Flex mt={10}>
                    <ScriptText my={"auto"} mr={10}>
                      Choose:{" "}
                    </ScriptText>
                    {story &&
                      story.choices[story.choice].options.map((opt) => {
                        return (
                          <SoftButton
                            key={opt.id}
                            onClick={() => choose(opt.id)}
                            text={story.decisions[opt.decision].description}
                            margin={"0 10px 0 0"}
                          />
                        );
                      })}
                  </Flex>
                )}
              </>
            );
        }
      })()}

      <BottomBox>
        <Button onClick={onRestart} padding={"15px 25px"} bg={WARN}>
          Start Over
        </Button>
      </BottomBox>
    </CurrentContainer>
  );
};

export default StoryPlayer;
