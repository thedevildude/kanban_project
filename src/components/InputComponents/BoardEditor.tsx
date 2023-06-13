import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { Board, Errors } from "../../types/boardTypes";
import { getBoard, updateBoard } from "../../utils/apiUtils";

type Props = {
  boardId: number;
  closeModelCB: () => void;
  updateBoardCB: (data:Partial<Board>) => void;
};

const BoardEditor = (props: Props) => {
  const [board, setBoard] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Errors<Board>>({});
  useEffect(() => {
    getBoard(props.boardId).then((board: Board) => {
      setBoard({
        title: board.title,
        description: board.description,
      });      
    });
  }, [props.boardId]);

  const handleBoardUpdate = async (data: Partial<Board>) => {
    setBoard({ ...board, ...data });
    const errors: Errors<Board> = {};
    if (data.title)
      if (data.title === "") {
        errors.title = "Title cannot be empty";
      }
    if (data.description)
      if (data.description === "") {
        errors.description = "Description cannot be empty";
      }
    if (Object.keys(errors).length === 0) {
      try {
        await updateBoard(props.boardId, {...board, ...data});
        props.updateBoardCB(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Edit Board</h1>
      <div className="py-4">
        <div className="mb-4">
          <TextInput
            label="Title"
            placeholder="task title"
            value={board.title}
            type="text"
            id="title"
            handleChangeCB={(e) =>
              handleBoardUpdate({
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
            placeholder="task description"
            value={board.description}
            type="text"
            id="description"
            handleChangeCB={(e) =>
              handleBoardUpdate({
                description: e.target.value,
              })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardEditor;