import React from "react";
import { Text } from "rebass";
import { StoryStatus } from "../../client/types";
import BoxCard from "../boxCard";

interface StatusCardProps {
  readonly status: StoryStatus;
}

const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  return (
    <BoxCard title={status.name}>
      <Text>Initial Value: {status.value}</Text>
    </BoxCard>
  );
};

export default StatusCard;
