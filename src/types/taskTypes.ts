import { Board } from "./boardTypes";

export type Task = {
  id: number;
  title: string;
  description: string;
  board_object?: Board;
  status_object?: TaskStatus;
  status: number;
  board?: number;
};

export type TaskStatus = {
  id: number;
  title: string;
  description: string;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateTask = (board: Omit<Task, "id">) => {
  const errors: Errors<Task> = {};
  if (board.title.length < 1) {
    errors.title = "Title is required";
  }
  if (board.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
};
