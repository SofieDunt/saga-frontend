import React, { useState } from "react";
import { Box, Button, Text } from "rebass";
import { StoryStatus } from "../../client/types";
import BoxCard from "../boxCard";
import { ErrorHandlerProps } from "../../App";
import SoftButton from "../softButton";
import Client from "../../client/client";
import AddStatusForm from "../../forms/addStatusForm";
import { WARN } from "../../themes";
import PopupWindow from "../popupWindow";
import {
  BottomCornerFlex,
  FormContainer,
  Header,
  StrongText,
} from "../../themes";

interface StatusCardProps extends ErrorHandlerProps {
  readonly status: StoryStatus;
  readonly updateStory: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  status,
  updateStory,
  message,
}) => {
  const [editing, setEditing] = useState(false);

  const onClickRemove = (): void => {
    Client.removeStatus(status.name).then(null, message.errorAlert);
  };

  return (
    <>
      <BoxCard title={status.name}>
        <Text>Initial Value: {status.value}</Text>
        <Box textAlign={"right"} mt={"15px"} mb={"-10px"}>
          <SoftButton text={"Edit"} onClick={() => setEditing(true)} />
        </Box>
      </BoxCard>

      <PopupWindow visible={editing} onClose={() => setEditing(false)}>
        <FormContainer>
          <Header>Update Status: {status.name}</Header>
          <StrongText my={"10px"}>Update Initial Value</StrongText>
          <AddStatusForm updateName={status.name} onSuccess={updateStory} />
          <br />
          <BottomCornerFlex>
            <Button onClick={onClickRemove} bg={WARN}>
              Remove Status
            </Button>
          </BottomCornerFlex>
        </FormContainer>
      </PopupWindow>
    </>
  );
};

export default StatusCard;
