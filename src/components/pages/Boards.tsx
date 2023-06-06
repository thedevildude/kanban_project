import React, { useEffect, useReducer, useState } from "react";
import DropdownMenu from "../InputComponents/DropdownMenu";
import Modal from "../modals/modal";
import CreateBoard from "../InputComponents/CreateBoard";
import AddNewButton from "../buttons/AddNewButton";
import { CgAddR } from "react-icons/cg";
import { Board } from "../../types/boardTypes";
import { Pagination } from "../../types/common";
import { navigate } from "raviger";
import { getBoards } from "../../utils/apiUtils";
import BoardCard from "../cards/BoardCard";

type BoardList = {
  boards: Board[];
};

type InitializeBoards = {
  type: "INITIALIZE_BOARDS";
  payload: BoardList;
};

type DeleteBoard = {
  type: "DELETE_BOARD";
  payload: number;
};

type BoardAction = InitializeBoards | DeleteBoard;

const boardsReducer = (state: BoardList, action: BoardAction) => {
  switch (action.type) {
    case "INITIALIZE_BOARDS":
      return action.payload;
    case "DELETE_BOARD":
      return {
        boards: state.boards.filter((board) => board.id !== action.payload),
      };
    default:
      return state;
  }
};

const Boards = () => {
  const [boards, dispatch] = useReducer(boardsReducer, {
    boards: [],
  });
  const [newBoard, setNewBoard] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (localStorage.getItem("token") === null) {
          throw new Error("Not logged in");
        }
        const data: Pagination<Board> = await getBoards();
        if (data.results.length !== 0) {
          data.results.sort((a, b) => a.id - b.id);
          dispatch({
            type: "INITIALIZE_BOARDS",
            payload: {
              boards: data.results,
            },
          });
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="text-2xl font-bold">My Boards</p>
      <div className="flex justify-between">
        <DropdownMenu
          triggerText="Filter"
          items={["Personal Boards", "Team Boards"]}
        />
        <AddNewButton
          buttonClickCB={() => setNewBoard(true)}
          label="New Board"
          icon={<CgAddR className="h-5 w-5" />}
        />
      </div>
      <div className="flex gap-5 w-full flex-wrap justify-between gap-y-10">
        {boards.boards &&
          boards.boards.map((board) => (
            <BoardCard
              key={board.id}
              id={board.id}
              title={board.title}
              description={board.description}
              deleteBoardCB={(id: number) => {
                dispatch({
                  type: "DELETE_BOARD",
                  payload: id,
                });
              }}
            />
          ))}
      </div>
      <Modal open={newBoard} closeCB={() => setNewBoard(false)}>
        <CreateBoard />
      </Modal>
    </div>
  );
};

export default Boards;
