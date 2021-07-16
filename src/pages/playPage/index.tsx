import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../../components/themeComponents";
import Client from "../../client/client";
import Alert from "../../components/alert";
import { Option, Story } from "../../client/types";
import { Box, Button, Flex, Text } from "rebass";
import styled from "@emotion/styled";
import { SOFT, WARN, WHITE } from "../../themes";

const StoryTitle = styled(Text)`
  padding-top: 20px;
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 20px;
`;

const OptionBox = styled(Box)`
  margin-right: 10px;
`;

const OptionButton = styled(Button)`
  background: ${SOFT};
`;

const OptionText = styled(Text)`
  color: ${WHITE};
`;

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

const PlayPage: React.FC = () => {
  const [story, setStory] = useState<Story>();
  const [prevChoices, setPrevChoices] = useState<string[]>([]);
  const [prevDecisions, setPrevDecisions] = useState<string[]>([]);
  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertWarn, setAlertWarn] = useState(false);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const effectShowError = (err: any): void => {
      triggerAlert(err.response.data.message, true);
    };

    const effectGetCurrentStory = (): void => {
      Client.getCurrentStory()
        .then((res) => setStory(res))
        .catch(effectShowError);
    };

    const effectGetCurrentDescription = (): void => {
      Client.getCurrentChoice()
        .then((res) => setPrevChoices((prev) => [...prev, res]))
        .catch(effectShowError);
    };

    Client.loadStory(name).then(effectGetCurrentStory).catch(effectShowError);
    if (prevChoices.length === 0) {
      effectGetCurrentDescription();
    }
  }, [name, prevChoices.length]);

  const showError = (err: any): void => {
    triggerAlert(err.response.data.message, true);
  };

  const getCurrentStory = (): void => {
    Client.getCurrentStory()
      .then((res) => setStory(res))
      .catch(showError);
  };

  const getCurrentDescription = (): void => {
    Client.getCurrentChoice()
      .then((res) => setPrevChoices((prev) => [...prev, res]))
      .catch(showError);
  };

  const choose = (decision: number): void => {
    if (story) {
      setPrevDecisions((prev) => [
        ...prev,
        story.decisions[decision].description,
      ]);
      Client.choose(decision).then(getCurrentStory).catch(showError);
      getCurrentDescription();
    }
  };

  const onRestart = (): void => {
    Client.restart().then(getCurrentStory).catch(showError);
    setPrevDecisions((prev) => [...prev, "Restarted the story"]);
    getCurrentDescription();
  };

  const triggerAlert = (message: string, warn?: boolean): void => {
    setAlertMessage(message);
    setAlertVisible(true);
    if (warn) {
      setAlertWarn(warn);
    }
  };

  return (
    <PageContainer>
      {(() => {
        switch (story) {
          case undefined:
            return (
              <StoryTitle>
                Oops! Looks like this story doesn't exist.
              </StoryTitle>
            );
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
                          <OptionBox key={opt.id}>
                            <OptionButton onClick={() => choose(opt.id)}>
                              <OptionText>
                                {story.decisions[opt.decision].description}
                              </OptionText>
                            </OptionButton>
                          </OptionBox>
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

      <Alert
        visible={alertVisible}
        message={alertMessage}
        warn={alertWarn}
        onClose={() => setAlertVisible(false)}
      />
    </PageContainer>
  );
};

export default PlayPage;
