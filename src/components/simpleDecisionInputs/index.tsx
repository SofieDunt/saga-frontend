import React, { ChangeEvent } from "react";
import { Choice } from "../../client/types";
import { Input, Select } from "@rebass/forms";
import { Flex, Text } from "rebass";
import { StrongText } from "../../themes";

interface SimpleDecisionInputsProps {
  readonly onDescriptionChange: (description: string) => void;
  readonly onOutcomeIdChange: (outcomeId: number) => void;
  readonly choices: Choice[];
}

const SimpleDecisionInputs: React.FC<SimpleDecisionInputsProps> = ({
  onDescriptionChange,
  onOutcomeIdChange,
  choices,
}) => {
  const onOutcomeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    onOutcomeIdChange(Number(e.currentTarget.value));
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

      <StrongText>Outcome</StrongText>
      <Flex alignItems={"center"}>
        <Text mr={"5px"}>Choice #</Text>
        <Select
          name="outcomeId"
          onChange={onOutcomeSelect}
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

export default SimpleDecisionInputs;
