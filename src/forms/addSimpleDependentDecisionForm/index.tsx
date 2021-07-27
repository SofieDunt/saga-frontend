import React from "react";
import { Choice, ErrorResponse, StoryStatus } from "../../client/types";
import Client from "../../client/client";
import { Text } from "rebass";
import { WARN } from "../../themes";
import { useState } from "react";
import DependentDecisionInputs from "../../components/dependentDecisionInputs";
import { Feedback } from "../utils";
import { PrimaryButton } from "../../themes";

interface AddSimpleDependentDecisionFormProps {
  readonly onSuccess: () => void;
  readonly choiceId: number;
  readonly choices: Choice[];
  readonly statuses: StoryStatus[];
}

const AddSimpleDependentDecisionForm: React.FC<AddSimpleDependentDecisionFormProps> =
  ({ onSuccess, choiceId, choices, statuses }) => {
    const [description, setDescription] = useState<string>();
    const [dependency, setDependency] = useState<string>(statuses[0].name);
    const [threshold, setThreshold] = useState<number>(0);
    const [outcomeBelowId, setOutcomeBelowId] = useState<number>(0);
    const [outcomeMeetsId, setOutcomeMeetsId] = useState<number>(0);
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

    const onSubmit = (): void => {
      if (description) {
        Client.addSimpleDependent({
          description,
          choiceId,
          dependency,
          threshold,
          outcomeBelowId,
          outcomeMeetsId,
        }).then(onSuccess, (err: ErrorResponse) =>
          feedbackHandler.giveFeedback(err.message)
        );
      } else {
        feedbackHandler.giveFeedback("All fields are required!");
      }
    };

    return (
      <>
        <DependentDecisionInputs
          onDescriptionChange={setDescription}
          onDependencyChange={setDependency}
          onThresholdChange={setThreshold}
          onOutcomeBelowIdChange={setOutcomeBelowId}
          onOutcomeMeetsIdChange={setOutcomeMeetsId}
          choices={choices}
          statuses={statuses}
          feedback={feedbackHandler}
        />
        {showFeedback && <Text color={WARN}>{feedback}</Text>}
        <PrimaryButton onClick={onSubmit} mr={"5px"}>
          Submit
        </PrimaryButton>
      </>
    );
  };

export default AddSimpleDependentDecisionForm;
