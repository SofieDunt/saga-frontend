import React from "react";
import { Decision } from "../../client/types";
import BoxCard from "../boxCard";
import DecisionDescription from "../decisionDescription";

interface DecisionCardProps {
  readonly decision: Decision;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision }) => {
  return (
    <BoxCard title={`Decision #${decision.id}`}>
      <DecisionDescription decision={decision} />
    </BoxCard>
  );
};

export default DecisionCard;
