export interface Story {
  readonly name: string;
  readonly statuses: StoryStatus[];
  readonly choices: Choice[];
  readonly decisions: Decision[];
  readonly choice: number;
}

export interface StoryStatus {
  readonly name: string;
  readonly value: number;
}

export interface Choice {
  readonly id: number;
  readonly options: Option[];
}

export interface Option {
  readonly id: number;
  readonly decision: number;
}

export interface Decision {
  readonly id: number;
  readonly type: DecisionTypes;
  readonly description: string;
  readonly dependency?: string;
  readonly threshold?: number;
  readonly outcome1Id: number;
  readonly outcome2Id?: number;
  readonly consequences?: StatusUpdate[];
}

export interface StatusUpdate {
  readonly type: StatusUpdateTypes;
  readonly var: number;
  readonly status: string;
}

export enum DecisionTypes {
  SIMPLE = "SIMPLE",
  CONSEQUENTIAL = "CONSEQUENTIAL",
  DEPENDENT = "DEPENDENT",
}

export enum StatusUpdateTypes {
  ADD = "ADD",
  SET = "SET",
}

export interface AddSimpleDecisionRequest {
  readonly description: string;
  readonly choiceId: number;
  readonly outcomeId: number;
}

export interface AddConsequentialDecisionRequest
  extends AddSimpleDecisionRequest {
  readonly consequences: string[];
}

export interface AddSimpleDependentRequest {
  readonly description: string;
  readonly choiceId: number;
  readonly dependency: string;
  readonly threshold: number;
  readonly outcomeBelowId: number;
  readonly outcomeAboveId: number;
}

export interface AddConsequentialDependentRequest
  extends AddSimpleDependentRequest {
  readonly consequences: string[];
}
