import React, { useState } from "react";
import Client from "../../client/client";
import { Button, Text } from "rebass";
import { Input, Label } from "@rebass/forms";
import styled from "@emotion/styled";
import { BLACK, BLUE, WARN } from "../../themes";

const FormContainer = styled.div`
  width: 450px;
  height: 200px;
  color: ${BLACK};
  padding: 50px;
  text-align: left;
  line-height: 20px;
`;

interface ImportFormProps {
  readonly onSuccess: () => void;
}

const ImportForm: React.FC<ImportFormProps> = ({ onSuccess }) => {
  // Error message
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Import Form
  const [importPath, setImportPath] = useState<string>();

  const handleImport = (): void => {
    if (!importPath) {
      showError("File path is required.");
    } else {
      Client.importStory(importPath)
        .then(onSuccess)
        .catch((err) =>
          showError("Could not import: " + err.response.data.message)
        );
    }
  };

  const showError = (message: string): void => {
    setErrorMessage(message);
    setErrorVisible(true);
  };

  return (
    <>
      <FormContainer>
        <Text mb={20}>Import a story!</Text>
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
    </>
  );
};

export default ImportForm;
