import axios, { AxiosResponse } from "axios";

export const PLAYER_INSTANCE = axios.create({
  baseURL: "http://localhost:8080/player",
});

export const WRITER_INSTANCE = axios.create({
  baseURL: "http://localhost:8080/writer",
});

export const handleAxiosResponse = async <T>(
  execute: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await execute();
    return Promise.resolve(res.data);
  } catch (err) {
    if (!!err.response) {
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject({ message: "Network error" });
    }
  }
};
