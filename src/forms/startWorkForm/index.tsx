import React, { useState } from "react";
import { ErrorHandlerProps } from "../../App";
import Client from "../../client/client";
import { Input } from "@rebass/forms";
import SoftButton from "../../components/softButton";
import { Header } from "../../components/themeComponents";

const DEFAULT_NAME = "Untitled";

interface StartWorkFormProps extends ErrorHandlerProps {
  readonly onSuccess: () => void;
}

const StartWorkForm: React.FC<StartWorkFormProps> = ({
  onSuccess,
  message,
}) => {
  const [name, setName] = useState<string>(DEFAULT_NAME);

  const onStartWork = (): void => {
    Client.startNewWork(name).then(onSuccess, message.errorAlert);
  };

  return (
    <>
      <Header>Start your next story!</Header>
      <Input
        name={"name"}
        defaultValue={DEFAULT_NAME}
        placeholder={"Name of new work"}
        onChange={(e) => setName(e.target.value)}
        my={"10px"}
      />
      <SoftButton text={"Create New Work"} onClick={onStartWork} />
    </>
  );
};

export default StartWorkForm;
