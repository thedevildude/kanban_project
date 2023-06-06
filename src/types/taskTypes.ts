import { Board } from "./boardTypes";

export type Task = {
  id: number;
  title: string;
  description: string;
  board_object?: Board;
  status_object?: TaskStatus;
  status: number;
  board: string;
};

export type TaskStatus = {
  id: number;
  title: string;
  description: string;
};
