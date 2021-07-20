import React from "react";
import { Choice, ErrorResponse } from "../../client/types";
import Client from "../../client/client";
import SoftButton from "../../components/softButton";
import { Text } from "rebass";
import { WARN } from "../../themes";
import { useState } from "react";
import SimpleDecisionInputs from "../../components/simpleDecisionInputs";

interface AddSimpleDecisionFormProps {
  readonly onSuccess: () => void;
  readonly choices: Choice[];
}

const AddSimpleDecisionForm: React.FC<AddSimpleDecisionFormProps> = ({
  onSuccess,
  choices,
}) => {
  const [description, setDescription] = useState<string>();
  const [choiceId, setChoiceId] = useState<number>(0);
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
        onChoiceIdChange={setChoiceId}
        onOutcomeIdChange={setOutcomeId}
        choices={choices}
      />
      {showFeedback && <Text color={WARN}>{feedback}</Text>}
      <SoftButton onClick={onSubmit} text={"Submit"} margin={"0 10px 0 0"} />
    </>
  );
};

export default AddSimpleDecisionForm;
