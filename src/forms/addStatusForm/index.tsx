import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@rebass/forms";
import SoftButton from "../../components/softButton";
import Client from "../../client/client";
import { Text } from "rebass";
import { WARN } from "../../themes";
import { validateInteger } from "../utils";
import { ErrorResponse } from "../../client/types";

interface AddStatusFormProps {
  readonly updateName?: string;
  readonly onSuccess: () => void;
}

const AddStatusForm: React.FC<AddStatusFormProps> = ({
  updateName,
  onSuccess,
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

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setShowFeedback(true);
  };

  const showIntegerError = (): void => {
    triggerFeedback("Must be an integer!");
  };

  const changeVal = (val: number): void => {
    setShowFeedback(false);
    setVal(val);
  };

  const onValInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    validateInteger(e, showIntegerError, changeVal);
  };

  const onAdd = (): void => {
    if (name && val) {
      Client.addStatus(name, val).then(onSuccess, (err: ErrorResponse) =>
        triggerFeedback(err.message)
      );
    } else {
      triggerFeedback("All fields are required!");
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
        onChange={onValInputChange}
        mb={"7px"}
      />
      {showFeedback && <Text color={WARN}>{feedback}</Text>}
      <SoftButton onClick={onAdd} text={"Submit"} margin={"0 10px 0 0"} />
    </>
  );
};

export default AddStatusForm;
