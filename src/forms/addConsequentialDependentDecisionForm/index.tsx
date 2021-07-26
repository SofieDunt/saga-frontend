import React from "react";
import { Choice, ErrorResponse, StoryStatus } from "../../client/types";
import Client from "../../client/client";
import { Flex, Text } from "rebass";
import { WARN } from "../../themes";
import { useState } from "react";
import DependentDecisionInputs from "../../components/dependentDecisionInputs";
import { Feedback } from "../utils";
import { PrimaryButton, StrongText } from "../../components/themeComponents";
import ConsequenceInput from "../../components/consequenceInput";

interface AddConsequentialDependentDecisionFormProps {
  readonly onSuccess: () => void;
  readonly choiceId: number;
  readonly choices: Choice[];
  readonly statuses: StoryStatus[];
}

const AddConsequentialDependentDecisionForm: React.FC<AddConsequentialDependentDecisionFormProps> =
  ({ onSuccess, choiceId, choices, statuses }) => {
    const [description, setDescription] = useState<string>();
    const [dependency, setDependency] = useState<string>(statuses[0].name);
    const [threshold, setThreshold] = useState<number>(0);
    const [outcomeBelowId, setOutcomeBelowId] = useState<number>(0);
    const [outcomeMeetsId, setOutcomeMeetsId] = useState<number>(0);
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
        Client.addConsequentialDependent({
          description,
          choiceId,
          dependency,
          threshold,
          outcomeBelowId,
          outcomeMeetsId,
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
        <StrongText>Consequences</StrongText>
        {consequences.map((str, i) => {
          return <Text key={i}>{str}</Text>;
        })}
        <Flex alignItems={"flex-end"} mt={"5px"}>
          <ConsequenceInput
            onChange={setCurrentConsequence}
            statuses={statuses}
            feedback={feedbackHandler}
          />
          <PrimaryButton onClick={onAddConsequence} margin={"0 10px 0 10px"}>
            Add
          </PrimaryButton>
        </Flex>
        <br />
        {showFeedback && <Text color={WARN}>{feedback}</Text>}
        <PrimaryButton onClick={onSubmit} mr={"5px"}>
          Submit
        </PrimaryButton>
      </>
    );
  };

export default AddConsequentialDependentDecisionForm;
