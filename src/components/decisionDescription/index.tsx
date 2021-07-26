import React from "react";
import { Decision, DecisionTypes, StatusUpdateTypes } from "../../client/types";
import { Text } from "rebass";
import { StrongText } from "../themeComponents";

interface DecisionDescriptionProps {
  readonly decision: Decision;
}

const DecisionDescription: React.FC<DecisionDescriptionProps> = ({
  decision,
}) => {
  return (
    <>
      <StrongText>Type</StrongText>
      <Text>{decision.type.toString()}</Text>
      <StrongText>Description</StrongText>
      <Text>{decision.description}</Text>
      <StrongText>Outcome</StrongText>
      {(() => {
        switch (decision.type) {
          case DecisionTypes.DEPENDENT:
            return (
              <>
                <Text>
                  if {decision.dependency} is below {decision.threshold}: Choice
                  #{decision.outcome1Id}
                </Text>
                <Text>
                  if {decision.dependency} is above {decision.threshold}: Choice
                  #{decision.outcome2Id}
                </Text>
              </>
            );
          default:
            return <Text>Choice #{decision.outcome1Id}</Text>;
        }
      })()}
      <StrongText>Consequences</StrongText>
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
        return <Text>{text}</Text>;
      })}
      {decision.consequences?.length === 0 && <Text>None</Text>}
    </>
  );
};

export default DecisionDescription;
