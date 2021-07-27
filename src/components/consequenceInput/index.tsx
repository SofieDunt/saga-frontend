import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, Select } from "@rebass/forms";
import { Box, Flex } from "rebass";
import { MidFlexElement, StrongText } from "../themeComponents";
import { StatusUpdateTypes, StoryStatus } from "../../client/types";
import { Feedback, validateInteger } from "../../forms/utils";

interface ConsequenceInputProps {
  readonly onChange: (consequence: string) => void;
  readonly statuses: StoryStatus[];
  readonly feedback: Feedback;
}

const ConsequenceInput: React.FC<ConsequenceInputProps> = ({
  onChange,
  statuses,
  feedback,
}) => {
  const [type, setType] = useState<string>(StatusUpdateTypes.ADD);
  const [val, setVal] = useState<number>(0);
  const [name, setName] = useState<string>(statuses[0].name);

  useEffect(() => {
    if (name) {
      onChange(`${type} ${val} ${name}`);
    }
  }, [onChange, type, val, name]);

  const showIntegerError = (): void => {
    feedback.giveFeedback("Must be an integer!");
  };

  const changeVal = (val: number): void => {
    feedback.hideFeedback();
    setVal(val);
  };

  const onValInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    validateInteger(e, showIntegerError, changeVal);
  };

  return (
    <Flex flexWrap={"wrap"}>
      <Box minWidth={"150px"}>
        <StrongText>Type</StrongText>
        <Select
          name="choiceId"
          onChange={(e) => setType(e.currentTarget.value)}
        >
          <option>{StatusUpdateTypes.ADD}</option>
          <option>{StatusUpdateTypes.SET}</option>
        </Select>
      </Box>
      <MidFlexElement minWidth={"150px"}>
        <StrongText>
          {type === StatusUpdateTypes.ADD
            ? "Amount to Add"
            : "Number to Set To"}
        </StrongText>
        <Input
          name={"val"}
          placeholder={"0"}
          type={"number"}
          value={val}
          onChange={onValInputChange}
        />
      </MidFlexElement>
      <Box minWidth={"150px"}>
        <StrongText>Status to Impact</StrongText>
        <Select
          name="choiceId"
          onChange={(e) => setName(e.currentTarget.value)}
        >
          {statuses.map((status: StoryStatus) => {
            return <option key={status.name}>{status.name}</option>;
          })}
        </Select>
      </Box>
    </Flex>
  );
};

export default ConsequenceInput;
