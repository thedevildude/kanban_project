import { Board } from "./boardTypes";

export type Task = {
  id: number;
  title: string;
  description: string;
  board_object?: Board;
  status_object?: TaskStatus;
  duedate?: string;
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
  if (board.description.length < 1) {
    errors.description = "Description is required";
  }
  if (board.description.length > 100) {
    errors.description = "Description must be less than 100 characters";
  }
  if (board.duedate) {
    const date = new Date(board.duedate).toISOString().split("T")[0];;
    const today = new Date().toISOString().split("T")[0];;
    if (date < today) {
      errors.duedate = "Due date must be in the future";
    }
  }
  return errors;
};
