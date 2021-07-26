import React from "react";
import { Decision } from "../../client/types";
import BoxCard from "../boxCard";
import DecisionDescription from "../decisionDescription";
import { Button } from "rebass";
import Client from "../../client/client";
import { ErrorHandlerProps } from "../../App";
import { WARN } from "../../themes";

interface OptionCardProps extends ErrorHandlerProps {
  readonly choice: number;
  readonly option: number;
  readonly decision: Decision;
  readonly onSuccess: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  choice,
  option,
  decision,
  onSuccess,
  message,
}) => {
  const onRemove = (): void => {
    Client.removeOption(choice, option).then(onSuccess, message.errorAlert);
  };

  return (
    <BoxCard title={`Option #${option}`}>
      <DecisionDescription decision={decision} />
      <Button onClick={onRemove} mt={"10px"} bg={WARN}>
        Remove Option
      </Button>
    </BoxCard>
  );
};

export default OptionCard;
