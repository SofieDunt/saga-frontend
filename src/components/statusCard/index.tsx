import React, { useState } from "react";
import { Text } from "rebass";
import { StoryStatus } from "../../client/types";
import BoxCard from "../boxCard";
import { ErrorHandlerProps } from "../../App";
import SoftButton from "../softButton";
import Client from "../../client/client";
import AddStatusForm from "../../forms/addStatusForm";

interface StatusCardProps extends ErrorHandlerProps {
  readonly status: StoryStatus;
  readonly updateStory: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  status,
  updateStory,
  message,
}) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const toggleShowUpdateForm = (): void => {
    setShowUpdateForm((prev) => !prev);
  };

  const onClickRemove = (): void => {
    Client.removeStatus(status.name).then(null, message.errorAlert);
  };

  return (
    <BoxCard title={status.name}>
      <Text>Initial Value: {status.value}</Text>
      {showUpdateForm && (
        <AddStatusForm updateName={status.name} onSuccess={updateStory} />
      )}
      <SoftButton
        onClick={toggleShowUpdateForm}
        text={showUpdateForm ? "Cancel" : "Update Initial Value"}
        margin={"5px 0"}
      />
      <br />
      <SoftButton onClick={onClickRemove} text={"Remove Status"} />
    </BoxCard>
  );
};

export default StatusCard;
