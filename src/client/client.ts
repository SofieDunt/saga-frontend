import {
  AddConsequentialDecisionRequest,
  AddConsequentialDependentRequest,
  AddSimpleDecisionRequest,
  AddSimpleDependentRequest,
  ApiClient,
  Choice,
  Decision,
  DecisionTypes,
  Story,
  StoryStatus,
} from "./types";

let loadedPlayerName: string = "";
let loadedEditorName: string = "";
const allPlayerNames: string[] = [
  "A Magical Adventure",
  "A Sci-Fi Adventure",
  "A Nonfiction Adventure",
];
const allEditorNames: string[] = [
  "A Magical Adventure",
  "A Sci-Fi Adventure",
  "A Nonfiction Adventure",
];

const defaultStory: Story = {
  name: "",
  statuses: [
    {
      name: "points",
      value: 0,
    },
  ],
  choices: [
    {
      id: 0,
      options: [
        {
          id: 0,
          decision: 0,
        },
      ],
    },
    {
      id: 1,
      options: [
        {
          id: 0,
          decision: 1,
        },
        {
          id: 1,
          decision: 2,
        },
        {
          id: 2,
          decision: 3,
        },
      ],
    },
    {
      id: 2,
      options: [
        {
          id: 0,
          decision: 4,
        },
      ],
    },
    {
      id: 3,
      options: [],
    },
  ],
  decisions: [
    {
      id: 0,
      type: DecisionTypes.SIMPLE,
      description: "Next",
      threshold: 0,
      outcome1Id: 1,
      outcome2Id: 0,
    },
    {
      id: 1,
      type: DecisionTypes.SIMPLE,
      description: "Iceland",
      threshold: 0,
      outcome1Id: 2,
      outcome2Id: 0,
    },
    {
      id: 2,
      type: DecisionTypes.SIMPLE,
      description: "Venice",
      threshold: 0,
      outcome1Id: 2,
      outcome2Id: 0,
    },
    {
      id: 3,
      type: DecisionTypes.SIMPLE,
      description: "Disneyland",
      threshold: 0,
      outcome1Id: 2,
      outcome2Id: 0,
    },
    {
      id: 4,
      type: DecisionTypes.SIMPLE,
      description: "Next",
      threshold: 0,
      outcome1Id: 3,
      outcome2Id: 0,
    },
  ],
  choice: 0,
};

let loadedPlayerStory: Story = defaultStory;
let loadedEditorStory: Story = defaultStory;

const importFromPath = async (): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const quit = (): Promise<void> => {
  loadedEditorName = "";
  return Promise.resolve();
};

// PLAYER

const getCurrentStoryName = (): Promise<string> => {
  return Promise.resolve(loadedPlayerName);
};

const getCurrentChoice = (): Promise<string> => {
  let description = "";

  switch (loadedPlayerStory.choice) {
    case 0:
      description =
        "This is a sample interactive story demo! Here you can see how players read their options and make decisions.";
      break;
    case 1:
      description = "Try making a decision! Where will you go for vacation?";
      break;
    case 2:
      description = "Nice decision! That's all for this demo!";
      break;
    case 3:
      description = "Game over, no choices left.";
      break;
  }

  return Promise.resolve(description);
};

const getCurrentStory = (): Promise<Story> => {
  const loaded: Story = {
    name: loadedPlayerName,
    statuses: loadedPlayerStory.statuses,
    choices: loadedPlayerStory.choices,
    decisions: loadedPlayerStory.decisions,
    choice: loadedPlayerStory.choice,
  };
  return Promise.resolve(loaded);
};

const getAllStoryNames = (): Promise<string[]> => {
  return Promise.resolve(allPlayerNames);
};

const exportStory = (path: string, name: string): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const exportStoryInProgress = (path: string, name: string): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const importStory = (path: string): Promise<void> => {
  return importFromPath();
};

const next = (): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const choose = (decision: number): Promise<void> => {
  loadedPlayerStory = {
    name: loadedPlayerStory.name,
    statuses: loadedPlayerStory.statuses,
    choices: loadedPlayerStory.choices,
    decisions: loadedPlayerStory.decisions,
    choice: loadedPlayerStory.decisions[decision].outcome1Id,
  };
  return Promise.resolve();
};

const loadStory = (name: string): Promise<void> => {
  loadedPlayerName = name;
  return Promise.resolve();
};

const restart = (): Promise<void> => {
  loadedPlayerStory = defaultStory;
  return Promise.resolve();
};

const quitStory = (): Promise<void> => {
  return quit();
};

const removeStory = (name: string): Promise<void> => {
  allPlayerNames.splice(allPlayerNames.indexOf(name), 1);
  return Promise.resolve();
};

// WRITER

const getAllWorkNames = (): Promise<string[]> => {
  return Promise.resolve(allEditorNames);
};

const getCurrentWorkName = (): Promise<string> => {
  return Promise.resolve(loadedEditorName);
};

const getCurrentWork = (): Promise<Story> => {
  const loaded: Story = {
    name: loadedEditorName,
    statuses: loadedEditorStory.statuses,
    choices: loadedEditorStory.choices,
    decisions: loadedEditorStory.decisions,
    choice: loadedEditorStory.choice,
  };

  return Promise.resolve(loaded);
};

const getCurrentWorkStoryName = (): Promise<string> => {
  if (loadedEditorName !== "") {
    return Promise.resolve(loadedEditorStory.name);
  } else {
    return Promise.reject({ message: "No loaded story." });
  }
};

const getCurrentStatuses = (): Promise<StoryStatus[]> => {
  if (loadedEditorName !== "") {
    return Promise.resolve(loadedEditorStory.statuses);
  } else {
    return Promise.reject({ message: "No loaded story." });
  }
};

const getInitialChoice = (): Promise<number> => {
  if (loadedEditorName !== "") {
    return Promise.resolve(loadedEditorStory.choice);
  } else {
    return Promise.reject({ message: "No loaded story." });
  }
};

const getCurrentChoices = (): Promise<Choice[]> => {
  if (loadedEditorName !== "") {
    return Promise.resolve(loadedEditorStory.choices);
  } else {
    return Promise.reject({ message: "No loaded story." });
  }
};

const getCurrentDecisions = (): Promise<Decision[]> => {
  if (loadedEditorName !== "") {
    return Promise.resolve(loadedEditorStory.decisions);
  } else {
    return Promise.reject({ message: "No loaded story." });
  }
};

const exportWork = (path: string): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const importWork = (path: string): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const exportToPlayer = (): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const loadWork = (name: string): Promise<void> => {
  loadedEditorName = name;
  return Promise.resolve();
};

const quitWork = (): Promise<void> => {
  return quit();
};

const removeWork = (name: string): Promise<void> => {
  allEditorNames.splice(allEditorNames.indexOf(name), 1);
  return Promise.resolve();
};

const renameWork = (name: string, newName: string): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const startNewWork = (name: string): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const setName = (name: string): Promise<void> => {
  if (name.length < 1) {
    return Promise.resolve();
  }

  loadedEditorName = name;
  loadedEditorStory = {
    name: name,
    statuses: loadedEditorStory.statuses,
    choices: loadedEditorStory.choices,
    decisions: loadedEditorStory.decisions,
    choice: loadedEditorStory.choice,
  };
  return Promise.resolve();
};

const addStatus = (name: string, val: number): Promise<void> => {
  let res = [];
  let existed = false;
  for (let status of loadedEditorStory.statuses) {
    if (status.name === name) {
      res.push({ name, value: val });
      existed = true;
    } else {
      res.push(status);
    }
  }
  if (existed) {
    loadedEditorStory = {
      name: loadedEditorStory.name,
      statuses: res,
      choices: loadedEditorStory.choices,
      decisions: loadedEditorStory.decisions,
      choice: loadedEditorStory.choice,
    };
    return Promise.resolve();
  } else {
    loadedEditorStory = {
      name: loadedEditorStory.name,
      statuses: [...loadedEditorStory.statuses, { name, value: val }],
      choices: loadedEditorStory.choices,
      decisions: loadedEditorStory.decisions,
      choice: loadedEditorStory.choice,
    };
    return Promise.resolve();
  }
};

const removeStatus = (name: string): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const addChoice = (): Promise<void> => {
  loadedEditorStory = {
    name: loadedEditorStory.name,
    statuses: loadedEditorStory.statuses,
    choices: [
      ...loadedEditorStory.choices,
      { id: loadedEditorStory.choices.length, options: [] },
    ],
    decisions: loadedEditorStory.decisions,
    choice: loadedEditorStory.choice,
  };
  return Promise.resolve();
};

const setInitial = (choice: number): Promise<void> => {
  loadedEditorStory = {
    name: loadedEditorStory.name,
    statuses: loadedEditorStory.statuses,
    choices: [
      ...loadedEditorStory.choices,
      { id: loadedEditorStory.choices.length, options: [] },
    ],
    decisions: loadedEditorStory.decisions,
    choice: choice,
  };
  return Promise.resolve();
};

const addSimpleDecision = (
  decision: AddSimpleDecisionRequest
): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const addConsequentialDecision = (
  decision: AddConsequentialDecisionRequest
): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const addSimpleDependent = (
  decision: AddSimpleDependentRequest
): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const addConsequentialDependent = (
  decision: AddConsequentialDependentRequest
): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const removeOption = (choice: number, option: number): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const removeChoice = (choice: number): Promise<void> => {
  return Promise.reject({ message: "This is not supported in the demo." });
};

const Client: ApiClient = {
  getCurrentStoryName,
  getCurrentChoice,
  getCurrentStory,
  getAllStoryNames,
  exportStory,
  exportStoryInProgress,
  importStory,
  next,
  choose,
  loadStory,
  restart,
  quitStory,
  removeStory,
  getAllWorkNames,
  getCurrentWorkName,
  getCurrentWork,
  getCurrentWorkStoryName,
  getCurrentStatuses,
  getInitialChoice,
  getCurrentChoices,
  getCurrentDecisions,
  exportWork,
  importWork,
  exportToPlayer,
  loadWork,
  quitWork,
  removeWork,
  renameWork,
  startNewWork,
  setName,
  addStatus,
  removeStatus,
  addChoice,
  setInitial,
  addSimpleDecision,
  addConsequentialDecision,
  addSimpleDependent,
  addConsequentialDependent,
  removeOption,
  removeChoice,
};

export default Client;
