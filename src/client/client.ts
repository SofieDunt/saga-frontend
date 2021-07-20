import axios, { AxiosInstance } from "axios";
import {
  AddConsequentialDecisionRequest,
  AddConsequentialDependentRequest,
  AddSimpleDecisionRequest,
  AddSimpleDependentRequest,
  Story,
} from "./types";

const playerInstance = axios.create({
  baseURL: "http://localhost:8080/player",
});

const writerInstance = axios.create({
  baseURL: "http://localhost:8080/writer",
});

export interface ApiClient {
  // methods go here
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
  return instance.get(ClientRoutes.GET_ALL_NAMES).then((res) => res.data);
};

const getCurrentName = (instance: AxiosInstance): Promise<string> => {
  return instance.get(ClientRoutes.GET_CURRENT_NAME).then((res) => res.data);
};

const getCurrentAsStory = (instance: AxiosInstance): Promise<Story> => {
  return instance.get(ClientRoutes.GET_CURRENT_STORY).then((res) => res.data);
};

const exportOriginal = (
  instance: AxiosInstance,
  path: string,
  name: string
): Promise<void> => {
  return instance
    .post(ClientRoutes.EXPORT, { params: { path, name } })
    .then((res) => res.data);
};

const importFromPath = (
  instance: AxiosInstance,
  path: string
): Promise<void> => {
  return instance
    .post(ClientRoutes.IMPORT, null, { params: { path } })
    .then((res) => res.data);
};

const quit = (instance: AxiosInstance): Promise<void> => {
  return instance.post(ClientRoutes.QUIT).then((res) => res.data);
};

const load = (instance: AxiosInstance, name: string): Promise<void> => {
  return instance
    .post(ClientRoutes.LOAD, null, { params: { name } })
    .then((res) => res.data);
};

const remove = (instance: AxiosInstance, name: string): Promise<void> => {
  return instance
    .delete(ClientRoutes.REMOVE, { params: { name } })
    .then((res) => res.data);
};

// PLAYER

const getCurrentStoryName = (): Promise<string> => {
  return getCurrentName(playerInstance);
};

const getCurrentChoice = (): Promise<string> => {
  return playerInstance
    .get(ClientRoutes.GET_CURRENT_CHOICE)
    .then((res) => res.data);
};

const getCurrentStory = (): Promise<Story> => {
  return getCurrentAsStory(playerInstance);
};

const getAllStoryNames = (): Promise<string[]> => {
  return getAllNames(playerInstance);
};

const exportStory = (path: string, name: string): Promise<void> => {
  return exportOriginal(playerInstance, path, name);
};

const exportStoryInProgress = (path: string, name: string): Promise<void> => {
  return playerInstance
    .post(ClientRoutes.EXPORT_IN_PROGRESS, { params: { path, name } })
    .then((res) => res.data);
};

const importStory = (path: string): Promise<void> => {
  return importFromPath(playerInstance, path);
};

const next = (): Promise<void> => {
  return playerInstance.post(ClientRoutes.NEXT).then((res) => res.data);
};

const choose = (decision: number): Promise<void> => {
  return playerInstance
    .post(ClientRoutes.CHOOSE, null, { params: { decision } })
    .then((res) => res.data);
};

const loadStory = (name: string): Promise<void> => {
  return playerInstance
    .post(ClientRoutes.LOAD, null, { params: { name } })
    .then((res) => res.data);
};

const restart = (): Promise<void> => {
  return playerInstance.post(ClientRoutes.RESTART).then((res) => res.data);
};

const quitStory = (): Promise<void> => {
  return quit(playerInstance);
};

const removeStory = (name: string): Promise<void> => {
  return remove(playerInstance, name);
};

// WRITER

const getAllWorkNames = (): Promise<string[]> => {
  return getAllNames(writerInstance);
};

const getCurrentWorkName = (): Promise<string> => {
  return getCurrentName(writerInstance);
};

const getCurrentWork = (): Promise<Story> => {
  return getCurrentAsStory(writerInstance);
};

const exportWork = (path: string, name: string): Promise<void> => {
  return exportOriginal(writerInstance, path, name);
};

const importWork = (path: string): Promise<void> => {
  return importFromPath(writerInstance, path);
};

const exportToPlayer = (): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.EXPORT_TO_PLAYER)
    .then((res) => res.data);
};

const loadWork = (name: string): Promise<void> => {
  return load(writerInstance, name);
};

const quitWork = (): Promise<void> => {
  return quit(writerInstance);
};

const removeWork = (name: string): Promise<void> => {
  return remove(writerInstance, name);
};

const renameWork = (name: string, newName: string): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.RENAME, null, {
      params: {
        name,
        newName,
      },
    })
    .then((res) => res.data);
};

const startNewWork = (name: string): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.START_NEW_WORK, null, { params: { name } })
    .then((res) => res.data);
};

const setName = (name: string): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.SET_NAME, null, { params: { name } })
    .then((res) => res.data);
};

const addStatus = (name: string, val: number): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.ADD_STATUS, null, {
      params: {
        name,
        val,
      },
    })
    .then((res) => res.data);
};

const removeStatus = (name: string): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.REMOVE_STATUS, null, { params: { name } })
    .then((res) => res.data);
};

const addChoice = (): Promise<void> => {
  return writerInstance.post(ClientRoutes.ADD_CHOICE).then((res) => res.data);
};

const setInitial = (choice: number): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.SET_INITIAL_CHOICE, null, { params: { choice } })
    .then((res) => res.data);
};

const addSimpleDecision = (
  decision: AddSimpleDecisionRequest
): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.ADD_SIMPLE_DECISION, decision)
    .then((res) => res.data);
};

const addConsequentialDecision = (
  decision: AddConsequentialDecisionRequest
): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.ADD_CONSEQUENTIAL_DECISION, decision)
    .then((res) => res.data);
};

const addSimpleDependent = (
  decision: AddSimpleDependentRequest
): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.ADD_SIMPLE_DEPENDENT_DECISION, decision)
    .then((res) => res.data);
};

const addConsequentialDependent = (
  decision: AddConsequentialDependentRequest
): Promise<void> => {
  return writerInstance
    .post(ClientRoutes.ADD_CONSEQUENTIAL_DEPENDENT_DECISION, decision)
    .then((res) => res.data);
};

const removeOption = (choice: number, option: number): Promise<void> => {
  return writerInstance
    .delete(ClientRoutes.REMOVE_OPTION, {
      params: {
        choice,
        option,
      },
    })
    .then((res) => res.data);
};

const removeChoice = (choice: number) => {
  return writerInstance
    .delete(ClientRoutes.REMOVE_CHOICE, { params: { choice } })
    .then((res) => res.data);
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
