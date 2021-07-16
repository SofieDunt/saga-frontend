import React, { useState } from "react";
import Client from "../../client/client";
import { Button, Text } from "rebass";
import { Input, Label } from "@rebass/forms";
import styled from "@emotion/styled";
import { BLUE, WARN } from "../../themes";

const FormContainer = styled.div`
  width: 450px;
  height: 200px;
  color: black;
  padding: 50px;
  text-align: left;
  line-height: 20px;
`;

interface ImportFormProps {
  readonly onSuccess: () => void;
}

const ImportForm: React.FC<ImportFormProps> = ({ onSuccess }) => {
  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // Import Form
  const [importPath, setImportPath] = useState<string>();

  const handleImport = (): void => {
    if (!importPath) {
      triggerAlert("File path is required.");
    } else {
      Client.importStory(importPath)
        .then(onSuccess)
        .catch((err) => triggerAlert("Could not import: " + err.response.data));
    }
  };

  const triggerAlert = (message: string): void => {
    setAlertMessage(message);
    setAlertVisible(true);
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
        {alertVisible && <Text color={WARN}>{alertMessage}</Text>}
      </FormContainer>
    </>
  );
};

export default ImportForm;
