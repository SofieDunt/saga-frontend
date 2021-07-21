import React, { useState } from "react";
import { Choice, Decision } from "../../client/types";
import { Box, Button, Flex, Text } from "rebass";
import BoxCard from "../boxCard";
import SoftButton from "../softButton";
import { Messenger } from "../../App";
import Client from "../../client/client";
import RemoveOptionForm from "../../forms/removeOptionForm";
import { WARN } from "../../themes";

interface ChoiceCardProps {
  readonly choice: Choice;
  readonly decisions: Decision[];
  readonly onSuccess: () => void;
  readonly message: Messenger;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({
  choice,
  decisions,
  onSuccess,
  message,
}) => {
  const [editing, setEditing] = useState(false);

  const onRemoveChoice = (): void => {
    Client.removeChoice(choice.id).then(onSuccess, message.errorAlert);
  };

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
      <Box my={"10px"}>
        {editing ? (
          <>
            <RemoveOptionForm
              choice={choice.id}
              options={choice.options}
              onSuccess={onSuccess}
              message={message}
            />
            <Flex mt={"5px"}>
              <SoftButton text={"Cancel"} onClick={() => setEditing(false)} />
              <Button onClick={onRemoveChoice} bg={WARN} ml={"5px"}>
                Remove Choice
              </Button>
            </Flex>
          </>
        ) : (
          <SoftButton text={"Edit"} onClick={() => setEditing(true)} />
        )}
      </Box>
    </BoxCard>
  );
};

export default ChoiceCard;
