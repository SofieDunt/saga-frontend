import React, { useState } from "react";
import Client from "../../client/client";
import { Button, Text } from "rebass";
import { Input, Label } from "@rebass/forms";
import { BLUE, WARN } from "../../themes";
import { ApplicationTypes, ErrorResponse } from "../../client/types";
import { FormContainer, Header } from "../../components/themeComponents";

interface ImportFormProps {
  readonly onSuccess: () => void;
  readonly importType: ApplicationTypes;
}

const ImportForm: React.FC<ImportFormProps> = ({ onSuccess, importType }) => {
  // Error message
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Import Form
  const [importPath, setImportPath] = useState<string>();

  const handleImport = (): void => {
    if (!importPath) {
      showError("File path is required.");
    } else {
      let promise;
      switch (importType) {
        case ApplicationTypes.STORY:
          promise = Client.importStory(importPath);
          break;
        case ApplicationTypes.WORK:
          promise = Client.importWork(importPath);
      }
      promise.then(onSuccess, (err: ErrorResponse) =>
        showError("Could not import: " + err.message)
      );
    }
  };

  const showError = (message: string): void => {
    setErrorMessage(message);
    setErrorVisible(true);
  };

  return (
    <FormContainer>
      <Header mb={20}>Import a story!</Header>
      <Label>Path of story file:</Label>
      <Input
        name={"path"}
        placeholder={`./your-story.txt`}
        mb={20}
        onChange={(e) => setImportPath(e.target.value)}
      />
      <Button bg={BLUE} onClick={handleImport}>
        Submit
      </Button>
      {errorVisible && <Text color={WARN}>{errorMessage}</Text>}
    </FormContainer>
  );
};

export default ImportForm;
