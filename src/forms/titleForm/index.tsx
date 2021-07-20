import React, { useState } from "react";
import Client from "../../client/client";
import styled from "@emotion/styled";
import { PageProps } from "../../App";
import { Input } from "@rebass/forms";
import SoftButton from "../../components/softButton";
import { StoryTitle } from "../../components/themeComponents";

const InlineSoftButton = styled(SoftButton)`
  display: inline-block;
`;

interface TitleFormProps extends PageProps {
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
      <StoryTitle display={"inline-block"} mr={"15px"}>
        Story Title: {title}
      </StoryTitle>
      {editing && (
        <>
          <Input
            name={"name"}
            defaultValue={title}
            placeholder={`Untitled`}
            display={"inline-block"}
            width={"40%"}
            onChange={(e) => setTitleRequest(e.target.value)}
          />
          <InlineSoftButton
            onClick={editTitle}
            text={"Submit"}
            margin={"0 7px"}
          />
        </>
      )}
      <InlineSoftButton
        onClick={toggleEditing}
        text={editing ? "Cancel" : "Change Title"}
        margin={"0 3px"}
      />
    </>
  );
};

export default TitleForm;
