import React from "react";
import { Choice, ErrorResponse } from "../../client/types";
import Client from "../../client/client";
import { Text } from "rebass";
import { WARN } from "../../themes";
import { useState } from "react";
import SimpleDecisionInputs from "../../components/simpleDecisionInputs";
import { PrimaryButton } from "../../components/themeComponents";

interface AddSimpleDecisionFormProps {
  readonly onSuccess: () => void;
  readonly choiceId: number;
  readonly choices: Choice[];
}

const AddSimpleDecisionForm: React.FC<AddSimpleDecisionFormProps> = ({
  onSuccess,
  choiceId,
  choices,
}) => {
  const [description, setDescription] = useState<string>();
  const [outcomeId, setOutcomeId] = useState<number>(0);
  // Feedback
  const [feedback, setFeedback] = useState<string>();
  const [showFeedback, setShowFeedback] = useState<boolean>();

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setShowFeedback(true);
  };

  const onSubmit = (): void => {
    if (description) {
      Client.addSimpleDecision({ description, choiceId, outcomeId }).then(
        onSuccess,
        (err: ErrorResponse) => triggerFeedback(err.message)
      );
    } else {
      triggerFeedback("All fields are required!");
    }
  };

  return (
    <>
      <SimpleDecisionInputs
        onDescriptionChange={setDescription}
        onOutcomeIdChange={setOutcomeId}
        choices={choices}
      />
      {showFeedback && <Text color={WARN}>{feedback}</Text>}
      <PrimaryButton onClick={onSubmit} mr={"5px"}>
        Submit
      </PrimaryButton>
    </>
  );
};

export default AddSimpleDecisionForm;
