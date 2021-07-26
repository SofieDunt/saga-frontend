import React, { useState } from "react";
import { Choice, Decision, StoryStatus } from "../../client/types";
import { Box, Button, Flex, Text } from "rebass";
import BoxCard from "../boxCard";
import SoftButton from "../softButton";
import { Messenger } from "../../App";
import Client from "../../client/client";
import { ACTION_BUTTON_MARGIN, WARN } from "../../themes";
import PopupWindow from "../popupWindow";
import {
  BottomCornerFlex,
  FormContainer,
  Header,
  StrongText,
} from "../themeComponents";
import OptionCard from "../optionCard";
import AddSimpleDecisionForm from "../../forms/addSimpleDecisionForm";
import AddConsequentialDecisionForm from "../../forms/addConsequentialDecisionForm";
import AddSimpleDependentDecisionForm from "../../forms/addSimpleDependentDecisionForm";
import AddConsequentialDependentDecisionForm from "../../forms/addConsequentialDependentDecisionForm";

enum SwitchFormTypes {
  ADD_SIMPLE,
  ADD_CONSEQUENTIAL,
  ADD_SIMPLE_DEPENDENT,
  ADD_CONSEQUENTIAL_DEPENDENT,
  NONE,
}

interface ChoiceCardProps {
  readonly choice: Choice;
  readonly choices: Choice[];
  readonly decisions: Decision[];
  readonly statuses: StoryStatus[];
  readonly onSuccess: () => void;
  readonly message: Messenger;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({
  choice,
  choices,
  decisions,
  statuses,
  onSuccess,
  message,
}) => {
  const [editing, setEditing] = useState(false);
  const hasOptions = choice.options.length > 0;
  const [currentForm, setCurrentForm] = useState<SwitchFormTypes>(
    SwitchFormTypes.NONE
  );

  const onFormSuccess = (): void => {
    onSuccess();
    setCurrentForm(SwitchFormTypes.NONE);
  };

  const onRemoveChoice = (): void => {
    Client.removeChoice(choice.id).then(onSuccess, message.errorAlert);
  };

  return (
    <>
      <BoxCard title={`Choice #${choice.id}`} minWidth={"350px"}>
        {choice.options.map((option) => {
          const decision: Decision = decisions[option.decision];
          return (
            <Text key={option.id}>{`Option #${option.id}: ${
              decision.description
            } => Choice #${decision.outcome1Id} ${
              decision.outcome2Id > -1 ? `or #${decision.outcome2Id}` : ""
            }`}</Text>
          );
        })}
        {!hasOptions && <Text>No options</Text>}
        <Box textAlign={"right"} mt={"15px"} mb={"-10px"}>
          <SoftButton text={"Edit"} onClick={() => setEditing(true)} />
        </Box>
      </BoxCard>

      <PopupWindow visible={editing} onClose={() => setEditing(false)}>
        <FormContainer>
          <Header>Edit Choice #{choice.id}</Header>
          <Box width={"80vw"}>
            <Flex mt={"20px"} flexWrap={"wrap"}>
              {choice.options.map((option) => {
                return (
                  <OptionCard
                    choice={choice.id}
                    option={option.id}
                    decision={decisions[option.decision]}
                    onSuccess={onSuccess}
                    message={message}
                  />
                );
              })}
              {!hasOptions && <Text>No options</Text>}
            </Flex>
          </Box>

          <Box>
            {(() => {
              switch (currentForm) {
                case SwitchFormTypes.ADD_SIMPLE:
                  return (
                    <>
                      <Header>Add Simple Option</Header>
                      <AddSimpleDecisionForm
                        onSuccess={onFormSuccess}
                        choiceId={choice.id}
                        choices={choices}
                      />
                      <SoftButton
                        text={"Cancel"}
                        onClick={() => setCurrentForm(SwitchFormTypes.NONE)}
                      />
                    </>
                  );
                case SwitchFormTypes.ADD_CONSEQUENTIAL:
                  return (
                    <>
                      <Header>Add Consequential Option</Header>
                      <AddConsequentialDecisionForm
                        onSuccess={onFormSuccess}
                        choiceId={choice.id}
                        choices={choices}
                        statuses={statuses}
                      />
                      <SoftButton
                        text={"Cancel"}
                        onClick={() => setCurrentForm(SwitchFormTypes.NONE)}
                      />
                    </>
                  );
                case SwitchFormTypes.ADD_SIMPLE_DEPENDENT:
                  return (
                    <>
                      <Header>Add Simple Dependent Decision</Header>
                      <AddSimpleDependentDecisionForm
                        onSuccess={onFormSuccess}
                        choiceId={choice.id}
                        choices={choices}
                        statuses={statuses}
                      />
                      <SoftButton
                        text={"Cancel"}
                        onClick={() => setCurrentForm(SwitchFormTypes.NONE)}
                      />
                    </>
                  );
                case SwitchFormTypes.ADD_CONSEQUENTIAL_DEPENDENT:
                  return (
                    <>
                      <Header>Add Consequential Dependent Decision</Header>
                      <AddConsequentialDependentDecisionForm
                        onSuccess={onFormSuccess}
                        choiceId={choice.id}
                        choices={choices}
                        statuses={statuses}
                      />
                      <SoftButton
                        text={"Cancel"}
                        onClick={() => setCurrentForm(SwitchFormTypes.NONE)}
                      />
                    </>
                  );
                case SwitchFormTypes.NONE:
                default:
                  return (
                    <>
                      <StrongText mb={"5px"}>Add Option</StrongText>
                      <SoftButton
                        text={"Add Simple Option"}
                        margin={ACTION_BUTTON_MARGIN}
                        onClick={() =>
                          setCurrentForm(SwitchFormTypes.ADD_SIMPLE)
                        }
                      />
                      <SoftButton
                        text={"Add Consequential Option"}
                        margin={ACTION_BUTTON_MARGIN}
                        onClick={() =>
                          setCurrentForm(SwitchFormTypes.ADD_CONSEQUENTIAL)
                        }
                      />
                      <SoftButton
                        text={"Add Simple Dependent Option"}
                        margin={ACTION_BUTTON_MARGIN}
                        onClick={() =>
                          setCurrentForm(SwitchFormTypes.ADD_SIMPLE_DEPENDENT)
                        }
                      />
                      <SoftButton
                        text={"Add Consequential Dependent Option"}
                        margin={ACTION_BUTTON_MARGIN}
                        onClick={() =>
                          setCurrentForm(
                            SwitchFormTypes.ADD_CONSEQUENTIAL_DEPENDENT
                          )
                        }
                      />
                    </>
                  );
              }
            })()}
          </Box>

          <BottomCornerFlex>
            <Button onClick={onRemoveChoice} bg={WARN}>
              Remove Choice
            </Button>
          </BottomCornerFlex>
        </FormContainer>
      </PopupWindow>
    </>
  );
};

export default ChoiceCard;
