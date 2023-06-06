import { navigate } from "raviger";
import React, { useState } from "react";
import { Board, Errors, validateBoard } from "../../types/boardTypes";
import { createBoard } from "../../utils/apiUtils";
import TextInput from "./TextInput";

const CreateBoard = () => {
  const [board, setBoard] = useState<Omit<Board, "id">>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Errors<Board>>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateErrors = validateBoard(board);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      try {
        const data = await createBoard(board);
        navigate(`/boards/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Create board</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            label="Title"
            placeholder="board title"
            value={board.title}
            type="text"
            id="title"
            handleChangeCB={(e) =>
              setBoard({
                ...board,
                title: e.target.value,
              })
            }
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <TextInput
            label="Description"
            placeholder="board description"
            value={board.description}
            type="text"
            id="description"
            handleChangeCB={(e) =>
              setBoard({
                ...board,
                description: e.target.value,
              })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoard;
