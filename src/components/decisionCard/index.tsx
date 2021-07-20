import React from "react";
import { Decision, DecisionTypes, StatusUpdateTypes } from "../../client/types";
import { Text } from "rebass";
import BoxCard from "../boxCard";

interface DecisionCardProps {
  readonly decision: Decision;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision }) => {
  return (
    <BoxCard title={`Decision #${decision.id}`}>
      <Text>Type: {decision.type.toString()}</Text>
      <Text>Description: {decision.description}</Text>
      {(() => {
        switch (decision.type) {
          case DecisionTypes.DEPENDENT:
            return (
              <>
                <Text>
                  Outcome if {decision.dependency} is below {decision.threshold}
                  : Choice #{decision.outcome1Id}
                </Text>
                <Text>
                  Outcome if {decision.dependency} is above {decision.threshold}
                  : Choice #{decision.outcome2Id}
                </Text>
              </>
            );
          default:
            return <Text>Outcome: Choice #{decision.outcome1Id}</Text>;
        }
      })()}
      <Text>Consequences: </Text>
      {decision.consequences?.map((cons) => {
        let text: string;
        switch (cons.type) {
          case StatusUpdateTypes.ADD:
            text = `Add ${cons.var} to ${cons.status}`;
            break;
          case StatusUpdateTypes.SET:
            text = `Set ${cons.status} to ${cons.var}`;
            break;
        }
        return <Text ml={"5px"}>{text}</Text>;
      })}
      {decision.consequences?.length === 0 && <Text ml={"5px"}>None</Text>}
    </BoxCard>
  );
};

export default DecisionCard;
