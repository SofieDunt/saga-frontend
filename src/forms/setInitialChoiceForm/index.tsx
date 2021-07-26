import React, { ChangeEvent, useState } from "react";
import { ErrorHandlerProps } from "../../App";
import Client from "../../client/client";
import { Select } from "@rebass/forms";
import { Choice } from "../../client/types";
import { PrimaryButton, StrongText } from "../../components/themeComponents";
import { Flex, Text } from "rebass";

interface SetInitialChoiceFormProps extends ErrorHandlerProps {
  readonly choices: Choice[];
  readonly onSuccess: () => void;
}

const SetInitialChoiceForm: React.FC<SetInitialChoiceFormProps> = ({
  choices,
  onSuccess,
  message,
}) => {
  const [choice, setChoice] = useState(-1);

  const onChoiceSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setChoice(Number(e.currentTarget.value));
  };

  const onSetInitial = (): void => {
    Client.setInitial(choice).then(onSuccess, message.errorAlert);
  };

  return (
    <>
      <StrongText>Initial Choice</StrongText>
      <Flex alignItems={"center"}>
        <Text mr={"5px"}>Choice #</Text>
        <Select
          name="choice"
          onChange={onChoiceSelect}
          my={"5px"}
          minWidth={"50px"}
        >
          {choices.map((choice) => (
            <option key={choice.id}>{choice.id}</option>
          ))}
        </Select>
      </Flex>
      <PrimaryButton onClick={onSetInitial} mr={"5px"}>
        Set Initial Choice
      </PrimaryButton>
    </>
  );
};

export default SetInitialChoiceForm;
