import axios from "axios";
import { Story } from "./types";

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
}

export enum ClientRoutes {
  GET_CURRENT_NAME = "/current/name",
  GET_CURRENT_CHOICE = "/current/choice",
  GET_CURRENT_STORY = "/current/story",
  GET_ALL_STORIES = "/stories",
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

const getCurrentStoryName = (): Promise<string> => {
  return playerInstance
    .get(ClientRoutes.GET_CURRENT_NAME)
    .then((res) => res.data);
};

const getCurrentChoice = (): Promise<string> => {
  return playerInstance
    .get(ClientRoutes.GET_CURRENT_CHOICE)
    .then((res) => res.data);
};

const getCurrentStory = (): Promise<Story> => {
  return playerInstance
    .get(ClientRoutes.GET_CURRENT_STORY)
    .then((res) => res.data);
};

const getAllStoryNames = (): Promise<string[]> => {
  return playerInstance
    .get(ClientRoutes.GET_ALL_STORIES)
    .then((res: any) => res.data);
};

const exportStory = (path: string, name: string): Promise<void> => {
  return playerInstance
    .post(ClientRoutes.EXPORT, { params: { path, name } })
    .then((res) => res.data);
};

const exportStoryInProgress = (path: string, name: string): Promise<void> => {
  return playerInstance
    .post(ClientRoutes.EXPORT_IN_PROGRESS, { params: { path, name } })
    .then((res) => res.data);
};

const importStory = (path: string): Promise<void> => {
  return playerInstance
    .post(ClientRoutes.IMPORT, null, { params: { path } })
    .then((res) => res.data);
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
  return playerInstance.post(ClientRoutes.QUIT).then((res) => res.data);
};

const removeStory = (name: string): Promise<void> => {
  return playerInstance
    .delete(ClientRoutes.REMOVE, { params: { name } })
    .then((res) => res.data);
};

// todo writer

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
};

export default Client;
