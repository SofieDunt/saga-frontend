import React, { useState } from "react";
import { ErrorHandlerProps } from "../../App";
import Client from "../../client/client";
import { Input } from "@rebass/forms";
import { Header, PrimaryButton } from "../../components/themeComponents";

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
      <PrimaryButton onClick={onStartWork}>Create New Work</PrimaryButton>
    </>
  );
};

export default StartWorkForm;
