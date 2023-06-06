import { Board } from "../types/boardTypes";
import { PaginationParams } from "../types/common";
const API_BASE_URL = "http://localhost:8000/api/";

type DataParams =
  | {
      username: string;
      password: string;
    }
  | PaginationParams
  | {};

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: DataParams = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof DataParams]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Token authentication
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: method !== "GET" ? payload : null,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    return error;
  }
};

export const login = async (username: string, password: string) => {
  return await request("auth-token/", "POST", { username, password });
};

export const me = async () => {
  return await request("users/me/", "GET");
};

export const createBoard = async (board: Board) => {
  return await request("boards/", "POST", board);
}
