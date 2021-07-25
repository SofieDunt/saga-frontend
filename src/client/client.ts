import { AxiosInstance } from "axios";
import {
  AddConsequentialDecisionRequest,
  AddConsequentialDependentRequest,
  AddSimpleDecisionRequest,
  AddSimpleDependentRequest,
  ApiClient,
  Choice,
  Decision,
  Story,
  StoryStatus,
} from "./types";
import { handleAxiosResponse, PLAYER_INSTANCE, WRITER_INSTANCE } from "./axios";

export enum ClientRoutes {
  GET_CURRENT_NAME = "/current/name",
  GET_CURRENT_CHOICE = "/current/choice",
  GET_CURRENT_STORY = "/current/story",
  GET_ALL_NAMES = "/stories",
  EXPORT = "/export",
  EXPORT_IN_PROGRESS = "/export-in-progress",
  IMPORT = "/import",
  NEXT = "/next",
  CHOOSE = "/choose",
  LOAD = "/load",
  RESTART = "/restart",
  QUIT = "/quit",
  REMOVE = "/remove",
  EXPORT_TO_PLAYER = "/export-to-player",
  GET_CURRENT_WORK_STORY_NAME = "/current/story-name",
  GET_CURRENT_STATUSES = "/current/statuses",
  GET_INITIAL_CHOICE = "/current/initial-choice",
  GET_CURRENT_CHOICES = "/current/choices",
  GET_CURRENT_DECISIONS = "/current/decisions",
  RENAME = "/rename",
  START_NEW_WORK = "/start",
  SET_NAME = "/set/name",
  ADD_STATUS = "/add/status",
  REMOVE_STATUS = "/remove/status",
  ADD_CHOICE = "/add/choice",
  SET_INITIAL_CHOICE = "/set/initial",
  ADD_SIMPLE_DECISION = "/add/simple-decision",
  ADD_CONSEQUENTIAL_DECISION = "/add/consequential-decision",
  ADD_SIMPLE_DEPENDENT_DECISION = "/add/simple-dependent-decision",
  ADD_CONSEQUENTIAL_DEPENDENT_DECISION = "/add/consequential-dependent-decision",
  REMOVE_OPTION = "/remove/option",
  REMOVE_CHOICE = "/remove/choice",
}

const getAllNames = (instance: AxiosInstance): Promise<string[]> => {
  return handleAxiosResponse(() => instance.get(ClientRoutes.GET_ALL_NAMES));
};

const getCurrentName = (instance: AxiosInstance): Promise<string> => {
  return handleAxiosResponse(() => instance.get(ClientRoutes.GET_CURRENT_NAME));
};

const getCurrentAsStory = (instance: AxiosInstance): Promise<Story> => {
  return handleAxiosResponse(() =>
    instance.get(ClientRoutes.GET_CURRENT_STORY)
  );
};

const importFromPath = async (
  instance: AxiosInstance,
  path: string
): Promise<void> => {
  return handleAxiosResponse(() =>
    instance.post(ClientRoutes.IMPORT, null, { params: { path } })
  );
};

const quit = (instance: AxiosInstance): Promise<void> => {
  return handleAxiosResponse(() => instance.post(ClientRoutes.QUIT));
};

const load = (instance: AxiosInstance, name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    instance.post(ClientRoutes.LOAD, null, { params: { name } })
  );
};

const remove = (instance: AxiosInstance, name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    instance.delete(ClientRoutes.REMOVE, { params: { name } })
  );
};

// PLAYER

const getCurrentStoryName = (): Promise<string> => {
  return getCurrentName(PLAYER_INSTANCE);
};

const getCurrentChoice = (): Promise<string> => {
  return handleAxiosResponse(() =>
    PLAYER_INSTANCE.get(ClientRoutes.GET_CURRENT_CHOICE)
  );
};

const getCurrentStory = (): Promise<Story> => {
  return getCurrentAsStory(PLAYER_INSTANCE);
};

const getAllStoryNames = (): Promise<string[]> => {
  return getAllNames(PLAYER_INSTANCE);
};

const exportStory = (path: string, name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    PLAYER_INSTANCE.post(ClientRoutes.EXPORT, null, { params: { path, name } })
  );
};

const exportStoryInProgress = (path: string, name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    PLAYER_INSTANCE.post(ClientRoutes.EXPORT_IN_PROGRESS, null, {
      params: { path, name },
    })
  );
};

const importStory = (path: string): Promise<void> => {
  return importFromPath(PLAYER_INSTANCE, path);
};

const next = (): Promise<void> => {
  return handleAxiosResponse(() => PLAYER_INSTANCE.post(ClientRoutes.NEXT));
};

const choose = (decision: number): Promise<void> => {
  return handleAxiosResponse(() =>
    PLAYER_INSTANCE.post(ClientRoutes.CHOOSE, null, { params: { decision } })
  );
};

const loadStory = (name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    PLAYER_INSTANCE.post(ClientRoutes.LOAD, null, { params: { name } })
  );
};

const restart = (): Promise<void> => {
  return handleAxiosResponse(() => PLAYER_INSTANCE.post(ClientRoutes.RESTART));
};

const quitStory = (): Promise<void> => {
  return quit(PLAYER_INSTANCE);
};

const removeStory = (name: string): Promise<void> => {
  return remove(PLAYER_INSTANCE, name);
};

// WRITER

const getAllWorkNames = (): Promise<string[]> => {
  return getAllNames(WRITER_INSTANCE);
};

const getCurrentWorkName = (): Promise<string> => {
  return getCurrentName(WRITER_INSTANCE);
};

const getCurrentWork = (): Promise<Story> => {
  return getCurrentAsStory(WRITER_INSTANCE);
};

const getCurrentWorkStoryName = (): Promise<string> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.get(ClientRoutes.GET_CURRENT_WORK_STORY_NAME)
  );
};

const getCurrentStatuses = (): Promise<StoryStatus[]> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.get(ClientRoutes.GET_CURRENT_STATUSES)
  );
};

const getInitialChoice = (): Promise<number> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.get(ClientRoutes.GET_INITIAL_CHOICE)
  );
};

const getCurrentChoices = (): Promise<Choice[]> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.get(ClientRoutes.GET_CURRENT_CHOICES)
  );
};

const getCurrentDecisions = (): Promise<Decision[]> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.get(ClientRoutes.GET_CURRENT_DECISIONS)
  );
};

const exportWork = (path: string): Promise<void> => {
  return WRITER_INSTANCE.post(ClientRoutes.EXPORT, null, { params: { path } });
};

const importWork = (path: string): Promise<void> => {
  return importFromPath(WRITER_INSTANCE, path);
};

const exportToPlayer = (): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.EXPORT_TO_PLAYER)
  );
};

const loadWork = (name: string): Promise<void> => {
  return load(WRITER_INSTANCE, name);
};

const quitWork = (): Promise<void> => {
  return quit(WRITER_INSTANCE);
};

const removeWork = (name: string): Promise<void> => {
  return remove(WRITER_INSTANCE, name);
};

const renameWork = (name: string, newName: string): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.RENAME, null, {
      params: {
        name,
        newName,
      },
    })
  );
};

const startNewWork = (name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.START_NEW_WORK, null, {
      params: { name },
    })
  );
};

const setName = (name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.SET_NAME, null, { params: { name } })
  );
};

const addStatus = (name: string, val: number): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.ADD_STATUS, null, {
      params: {
        name,
        val,
      },
    })
  );
};

const removeStatus = (name: string): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.delete(ClientRoutes.REMOVE_STATUS, { params: { name } })
  );
};

const addChoice = (): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.ADD_CHOICE)
  );
};

const setInitial = (choice: number): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.SET_INITIAL_CHOICE, null, {
      params: { choice },
    })
  );
};

const addSimpleDecision = (
  decision: AddSimpleDecisionRequest
): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.ADD_SIMPLE_DECISION, decision)
  );
};

const addConsequentialDecision = (
  decision: AddConsequentialDecisionRequest
): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.ADD_CONSEQUENTIAL_DECISION, decision)
  );
};

const addSimpleDependent = (
  decision: AddSimpleDependentRequest
): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(ClientRoutes.ADD_SIMPLE_DEPENDENT_DECISION, decision)
  );
};

const addConsequentialDependent = (
  decision: AddConsequentialDependentRequest
): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.post(
      ClientRoutes.ADD_CONSEQUENTIAL_DEPENDENT_DECISION,
      decision
    )
  );
};

const removeOption = (choice: number, option: number): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.delete(ClientRoutes.REMOVE_OPTION, {
      params: {
        choice,
        option,
      },
    })
  );
};

const removeChoice = (choice: number): Promise<void> => {
  return handleAxiosResponse(() =>
    WRITER_INSTANCE.delete(ClientRoutes.REMOVE_CHOICE, { params: { choice } })
  );
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
