import React, { ChangeEvent, useEffect, useState } from "react";
import { ErrorHandlerProps } from "../../App";
import { Input } from "@rebass/forms";
import SoftButton from "../../components/softButton";
import Client from "../../client/client";
import { Text } from "rebass";
import { WARN } from "../../themes";

interface AddStatusFormProps extends ErrorHandlerProps {
  readonly updateName?: string;
  readonly onSuccess: () => void;
}

const AddStatusForm: React.FC<AddStatusFormProps> = ({
  updateName,
  onSuccess,
  message,
}) => {
  const [name, setName] = useState<string>();
  const [val, setVal] = useState<number>(0);
  // Feedback
  const [feedback, setFeedback] = useState<string>();
  const [showFeedback, setShowFeedback] = useState<boolean>();

  useEffect(() => {
    if (updateName) {
      setName(updateName);
    }
  }, [updateName]);

  const validateInteger = (e: ChangeEvent<HTMLInputElement>): void => {
    const targetValue: string = e.target.value;
    if (targetValue.includes(".")) {
      setFeedback("Must be an integer!");
      setShowFeedback(true);
    } else {
      setShowFeedback(false);
      setVal(Number(targetValue));
    }
  };

  const onAdd = (): void => {
    if (name && val) {
      Client.addStatus(name, val).then(onSuccess, message.errorAlert);
    } else {
      message.triggerAlert("Must fill out all fields!");
    }
  };

  return (
    <>
      {!updateName && (
        <Input
          name={"name"}
          placeholder={"Status Name"}
          onChange={(e) => setName(e.target.value)}
          mb={"7px"}
        />
      )}
      <Input
        name={"val"}
        defaultValue={0}
        placeholder={"0"}
        type={"number"}
        onChange={validateInteger}
        mb={"7px"}
      />
      {showFeedback && <Text color={WARN}>{feedback}</Text>}
      <SoftButton onClick={onAdd} text={"Submit"} margin={"0 10px 0 0"} />
    </>
  );
};

export default AddStatusForm;
