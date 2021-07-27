import React, { useState } from "react";
import Client from "../../client/client";
import styled from "@emotion/styled";
import { ErrorHandlerProps } from "../../App";
import { Input } from "@rebass/forms";
import SoftButton from "../../components/softButton";
import { Header, PrimaryButton } from "../../themes";

const InlineSoftButton = styled(SoftButton)`
  display: inline-block;
`;

interface TitleFormProps extends ErrorHandlerProps {
  readonly title: string;
  readonly onFinish: () => void;
}

const TitleForm: React.FC<TitleFormProps> = ({ message, title, onFinish }) => {
  const [editing, setEditing] = useState(false);
  const [titleRequest, setTitleRequest] = useState<string>(title);

  const editTitle = (): void => {
    Client.setName(titleRequest).then(() => {
      onFinish();
      setEditing(false);
    }, message.errorAlert);
  };

  const toggleEditing = (): void => {
    setEditing((prev) => !prev);
  };

  return (
    <>
      <Header display={"inline-block"} mr={"15px"}>
        Story Title:
      </Header>
      {editing ? (
        <>
          <Input
            name={"name"}
            defaultValue={title}
            placeholder={`Untitled`}
            display={"inline-block"}
            width={"40%"}
            onChange={(e) => setTitleRequest(e.target.value)}
          />
          <PrimaryButton
            onClick={editTitle}
            display={"inline-block"}
            ml={"15px"}
            mr={"8px"}
          >
            Submit
          </PrimaryButton>
        </>
      ) : (
        <Header display={"inline-block"} mr={"15px"}>
          {title}
        </Header>
      )}
      <InlineSoftButton
        onClick={toggleEditing}
        text={editing ? "Cancel" : "Change Title"}
      />
    </>
  );
};

export default TitleForm;
