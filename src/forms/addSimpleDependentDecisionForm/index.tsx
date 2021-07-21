import React from "react";
import { Choice, ErrorResponse, StoryStatus } from "../../client/types";
import Client from "../../client/client";
import SoftButton from "../../components/softButton";
import { Text } from "rebass";
import { WARN } from "../../themes";
import { useState } from "react";
import DependentDecisionInputs from "../../components/dependentDecisionInputs";
import { Feedback } from "../utils";

interface AddSimpleDependentDecisionFormProps {
  readonly onSuccess: () => void;
  readonly choices: Choice[];
  readonly statuses: StoryStatus[];
}

const AddSimpleDependentDecisionForm: React.FC<AddSimpleDependentDecisionFormProps> =
  ({ onSuccess, choices, statuses }) => {
    const [description, setDescription] = useState<string>();
    const [choiceId, setChoiceId] = useState<number>(0);
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
          onChoiceIdChange={setChoiceId}
          onDependencyChange={setDependency}
          onThresholdChange={setThreshold}
          onOutcomeBelowIdChange={setOutcomeBelowId}
          onOutcomeMeetsIdChange={setOutcomeMeetsId}
          choices={choices}
          statuses={statuses}
          feedback={feedbackHandler}
        />
        {showFeedback && <Text color={WARN}>{feedback}</Text>}
        <SoftButton onClick={onSubmit} text={"Submit"} margin={"0 10px 0 0"} />
      </>
    );
  };

export default AddSimpleDependentDecisionForm;
