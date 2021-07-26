import React, { ChangeEvent } from "react";
import { Choice, StoryStatus } from "../../client/types";
import { Input, Select } from "@rebass/forms";
import { Flex, Text } from "rebass";
import { StrongText } from "../themeComponents";
import { Feedback, validateInteger } from "../../forms/utils";

interface DependentDecisionInputProps {
  readonly onDescriptionChange: (description: string) => void;
  readonly onDependencyChange: (dependency: string) => void;
  readonly onThresholdChange: (threshold: number) => void;
  readonly onOutcomeBelowIdChange: (belowId: number) => void;
  readonly onOutcomeMeetsIdChange: (meetsId: number) => void;
  readonly choices: Choice[];
  readonly statuses: StoryStatus[];
  readonly feedback: Feedback;
}

const DependentDecisionInputs: React.FC<DependentDecisionInputProps> = ({
  onDescriptionChange,
  onDependencyChange,
  onThresholdChange,
  onOutcomeBelowIdChange,
  onOutcomeMeetsIdChange,
  choices,
  statuses,
  feedback,
}) => {
  const onOutcomeBelowSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    onOutcomeBelowIdChange(Number(e.currentTarget.value));
  };

  const onOutcomeMeetsSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    onOutcomeMeetsIdChange(Number(e.currentTarget.value));
  };

  const showIntegerError = (): void => {
    feedback.giveFeedback("Must be an integer!");
  };

  const changeThreshold = (val: number): void => {
    feedback.hideFeedback();
    onThresholdChange(val);
  };

  const onThresholdInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    validateInteger(e, showIntegerError, changeThreshold);
  };

  return (
    <>
      <StrongText>Description</StrongText>
      <Input
        name={"description"}
        placeholder={"Description"}
        my={"5px"}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />

      <StrongText>Status the decision is dependent on</StrongText>
      <Select
        name={"dependency"}
        onChange={(e) => onDependencyChange(e.currentTarget.value)}
      >
        {statuses.map((status: StoryStatus) => {
          return <option key={status.name}>{status.name}</option>;
        })}
      </Select>

      <StrongText>Status Value Threshold</StrongText>
      <Input
        name={"threshold"}
        defaultValue={0}
        placeholder={"0"}
        type={"number"}
        onChange={onThresholdInputChange}
      />

      <StrongText>Outcome If Status Is Below Threshold</StrongText>
      <Flex alignItems={"center"}>
        <Text mr={"5px"}>Choice #</Text>
        <Select
          name="outcomeBelowId"
          onChange={onOutcomeBelowSelect}
          my={"5px"}
          minWidth={"50px"}
        >
          {choices.map((choice) => (
            <option key={choice.id}>{choice.id}</option>
          ))}
        </Select>
      </Flex>

      <StrongText>Outcome If Status Meets Threshold</StrongText>
      <Flex alignItems={"center"}>
        <Text mr={"5px"}>Choice #</Text>
        <Select
          name="outcomeMeetsId"
          onChange={onOutcomeMeetsSelect}
          my={"5px"}
          minWidth={"50px"}
        >
          {choices.map((choice) => (
            <option key={choice.id}>{choice.id}</option>
          ))}
        </Select>
      </Flex>
    </>
  );
};

export default DependentDecisionInputs;
