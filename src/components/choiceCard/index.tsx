import React from "react";
import { Choice, Decision } from "../../client/types";
import { Text } from "rebass";
import BoxCard from "../boxCard";

interface ChoiceCardProps {
  readonly choice: Choice;
  readonly decisions: Decision[];
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, decisions }) => {
  return (
    <BoxCard title={`Choice #${choice.id}`} minWidth={"350px"}>
      {choice.options.map((option) => {
        const decision: Decision = decisions[option.decision];
        return (
          <Text key={option.id}>{`Option #${option.id} (D${option.decision}): ${
            decision.description
          } => Choice #${decision.outcome1Id} ${
            decision.outcome2Id > -1 ? `or #${decision.outcome2Id}` : ""
          }`}</Text>
        );
      })}
      {choice.options.length === 0 && <Text>No options</Text>}
    </BoxCard>
  );
};

export default ChoiceCard;
