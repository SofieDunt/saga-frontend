export interface ErrorResponse {
  readonly message: string;
}

export enum ApplicationTypes {
  STORY,
  WORK,
}

export interface ApiClient {
  readonly getCurrentStoryName: () => Promise<string>;
  readonly getCurrentChoice: () => Promise<string>;
  readonly getCurrentStory: () => Promise<Story>;
  readonly getAllStoryNames: () => Promise<string[]>;
  readonly exportStory: (path: string, name: string) => Promise<void>;
  readonly exportStoryInProgress: (path: string, name: string) => Promise<void>;
  readonly importStory: (path: string) => Promise<void>;
  readonly next: () => Promise<void>;
  readonly choose: (decision: number) => Promise<void>;
  readonly loadStory: (name: string) => Promise<void>;
  readonly restart: () => Promise<void>;
  readonly quitStory: () => Promise<void>;
  readonly removeStory: (name: string) => Promise<void>;
  readonly getAllWorkNames: () => Promise<string[]>;
  readonly getCurrentWorkName: () => Promise<string>;
  readonly getCurrentWork: () => Promise<Story>;
  readonly getCurrentWorkStoryName: () => Promise<string>;
  readonly getCurrentStatuses: () => Promise<StoryStatus[]>;
  readonly getCurrentChoices: () => Promise<Choice[]>;
  readonly getCurrentDecisions: () => Promise<Decision[]>;
  readonly exportWork: (path: string, name: string) => Promise<void>;
  readonly importWork: (path: string) => Promise<void>;
  readonly exportToPlayer: () => Promise<void>;
  readonly loadWork: (name: string) => Promise<void>;
  readonly quitWork: () => Promise<void>;
  readonly removeWork: (name: string) => Promise<void>;
  readonly renameWork: (name: string, newName: string) => Promise<void>;
  readonly startNewWork: (name: string) => Promise<void>;
  readonly setName: (name: string) => Promise<void>;
  readonly addStatus: (name: string, val: number) => Promise<void>;
  readonly removeStatus: (name: string) => Promise<void>;
  readonly addChoice: () => Promise<void>;
  readonly setInitial: (choice: number) => Promise<void>;
  readonly addSimpleDecision: (
    decision: AddSimpleDecisionRequest
  ) => Promise<void>;
  readonly addConsequentialDecision: (
    decision: AddConsequentialDecisionRequest
  ) => Promise<void>;
  readonly addSimpleDependent: (
    decision: AddSimpleDependentRequest
  ) => Promise<void>;
  readonly addConsequentialDependent: (
    decision: AddConsequentialDependentRequest
  ) => Promise<void>;
  readonly removeOption: (choice: number, option: number) => Promise<void>;
  readonly removeChoice: (choice: number) => Promise<void>;
}

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
  readonly threshold: number;
  readonly outcome1Id: number;
  readonly outcome2Id: number;
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
  readonly outcomeMeetsId: number;
}

export interface AddConsequentialDependentRequest
  extends AddSimpleDependentRequest {
  readonly consequences: string[];
}
