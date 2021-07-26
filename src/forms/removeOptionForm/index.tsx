import React, { useState } from "react";
import { Messenger } from "../../App";
import { Option } from "../../client/types";
import { StrongText } from "../../components/themeComponents";
import { Button, Flex, Text } from "rebass";
import { Select } from "@rebass/forms";
import Client from "../../client/client";
import { WARN } from "../../themes";

interface RemoveOptionFormProps {
  readonly choice: number;
  readonly options: Option[];
  readonly onSuccess: () => void;
  readonly message: Messenger;
}

const RemoveOptionForm: React.FC<RemoveOptionFormProps> = ({
  choice,
  options,
  onSuccess,
  message,
}) => {
  const [option, setOption] = useState<number>(0);

  const onRemove = () => {
    Client.removeOption(choice, option).then(onSuccess, message.errorAlert);
  };

  if (options.length > 0) {
    return (
      <>
        <StrongText>Remove Option</StrongText>
        <Flex alignItems={"center"}>
          <Text mr={"5px"}>Option #</Text>
          <Select
            name="option"
            onChange={(e) => setOption(Number(e.target.value))}
            my={"5px"}
            mr={"15px"}
            minWidth={"50px"}
          >
            {options.map((opt) => (
              <option key={opt.id}>{opt.id}</option>
            ))}
          </Select>
        </Flex>
        <Button onClick={onRemove} bg={WARN}>
          Remove Option
        </Button>
      </>
    );
  } else {
    return <StrongText>No options to remove.</StrongText>;
  }
};

export default RemoveOptionForm;
