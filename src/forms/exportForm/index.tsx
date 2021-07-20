import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import { Button, Text } from "rebass";
import { Checkbox, Input, Label } from "@rebass/forms";
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

interface ExportFormProps {
  readonly name: string;
  readonly onSuccess: () => void;
}

const ExportForm: React.FC<ExportFormProps> = ({ name, onSuccess }) => {
  // Error message
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Export Form
  const [path, setPath] = useState<string>();
  const [exportOriginal, setExportOriginal] = useState(true);

  useEffect(() => {
    setPath(`${name}.txt`);
  }, [name]);

  const handleExport = (): void => {
    if (!path) {
      showError("Export path is required.");
    } else if (exportOriginal) {
      Client.exportStory(path, name)
        .then(onSuccess)
        .catch((err) =>
          showError("Could not export: " + err.response.data.message)
        );
    } else {
      Client.exportStoryInProgress(path, name)
        .then(() => showError("Successfully exported"))
        .catch((err) =>
          showError("Could not export: " + err.response.data.message)
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
        <Text mb={20}>Exporting: {name}</Text>
        <Label>Path to export to</Label>
        <Input
          name={"path"}
          defaultValue={path}
          placeholder={`${name}.txt`}
          mb={20}
          onChange={(e) => setPath(e.target.value)}
        />
        <Label mb={20}>
          <Checkbox
            id={"original"}
            name={"original"}
            onChange={() => setExportOriginal((prev) => !prev)}
          />
          Export With Saved Progress
        </Label>
        <Button bg={BLUE} onClick={handleExport}>
          Submit
        </Button>
        {errorVisible && <Text color={WARN}>{errorMessage}</Text>}
      </FormContainer>
    </>
  );
};

export default ExportForm;
