import React, { useState } from "react";
import { ErrorHandlerProps } from "../../App";
import { Header, PrimaryButton } from "../../themes";
import Client from "../../client/client";
import { Input } from "@rebass/forms";

interface RenameWorkFormProps extends ErrorHandlerProps {
  readonly currentName: string;
  readonly onSuccess: () => void;
}

const RenameWorkForm: React.FC<RenameWorkFormProps> = ({
  currentName,
  onSuccess,
  message,
}) => {
  const [newName, setNewName] = useState<string>(currentName);

  const onRename = (): void => {
    Client.renameWork(currentName, newName).then(onSuccess, message.errorAlert);
  };

  return (
    <>
      <Header>Rename {currentName}</Header>
      <Input
        name={"newName"}
        defaultValue={currentName}
        placeholder={"New Name"}
        onChange={(e) => setNewName(e.target.value)}
        my={"10px"}
      />
      <PrimaryButton onClick={onRename}>Rename</PrimaryButton>
    </>
  );
};

export default RenameWorkForm;
