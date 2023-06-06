export type Board = {
  id?: number;
  title: string;
  description: string;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateBoard = (board: Board) => {
  const errors: Errors<Board> = {};
  if (board.title.length < 1) {
    errors.title = "Title is required";
  }
  if (board.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
};