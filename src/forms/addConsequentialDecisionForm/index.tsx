import React from "react";
import { Choice, ErrorResponse, StoryStatus } from "../../client/types";
import Client from "../../client/client";
import { Flex, Text } from "rebass";
import { WARN } from "../../themes";
import { useState } from "react";
import SimpleDecisionInputs from "../../components/simpleDecisionInputs";
import ConsequenceInput from "../../components/consequenceInput";
import { EndFlexElement, PrimaryButton, StrongText } from "../../themes";
import { Feedback } from "../utils";

interface AddConsequentialDecisionProps {
  readonly onSuccess: () => void;
  readonly choiceId: number;
  readonly choices: Choice[];
  readonly statuses: StoryStatus[];
}

const AddConsequentialDecisionForm: React.FC<AddConsequentialDecisionProps> = ({
  onSuccess,
  choiceId,
  choices,
  statuses,
}) => {
  const [description, setDescription] = useState<string>();
  const [outcomeId, setOutcomeId] = useState<number>(0);
  const [consequences, setConsequences] = useState<string[]>([]);
  const [currentConsequence, setCurrentConsequence] = useState<string>();
  // Feedback
  const [feedback, setFeedback] = useState<string>();
  const [showFeedback, setShowFeedback] = useState<boolean>();

  const feedbackHandler: Feedback = {
    giveFeedback: (msg: string) => {
      setFeedback(msg);
      setShowFeedback(true);
    },
    hideFeedback: () => setShowFeedback(false),
  };

  const onAddConsequence = (): void => {
    if (currentConsequence) {
      setConsequences((prev) => [...prev, currentConsequence]);
      setCurrentConsequence(undefined);
    } else {
      feedbackHandler.giveFeedback("All consequence fields are required!");
    }
  };

  const onSubmit = (): void => {
    if (description) {
      Client.addConsequentialDecision({
        description,
        choiceId,
        outcomeId,
        consequences,
      }).then(onSuccess, (err: ErrorResponse) =>
        feedbackHandler.giveFeedback(err.message)
      );
    } else {
      feedbackHandler.giveFeedback("All fields are required!");
    }
  };

  return (
    <>
      <SimpleDecisionInputs
        onDescriptionChange={setDescription}
        onOutcomeIdChange={setOutcomeId}
        choices={choices}
      />
      <StrongText>Consequences</StrongText>
      {consequences.map((str, i) => {
        return <Text key={i}>{str}</Text>;
      })}
      <Flex alignItems={"flex-end"} flexWrap={"wrap"} mt={"5px"}>
        <ConsequenceInput
          onChange={setCurrentConsequence}
          statuses={statuses}
          feedback={feedbackHandler}
        />
        <EndFlexElement>
          <PrimaryButton onClick={onAddConsequence}>Add</PrimaryButton>
        </EndFlexElement>
      </Flex>
      <br />
      {showFeedback && <Text color={WARN}>{feedback}</Text>}
      <PrimaryButton onClick={onSubmit} mr={"5px"}>
        Submit
      </PrimaryButton>
    </>
  );
};

export default AddConsequentialDecisionForm;
