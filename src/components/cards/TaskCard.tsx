import React from "react";
import { FaTrash } from "react-icons/fa";
import { Task } from "../../types/taskTypes";

type Props = {
  task: Task;
  deleteTaskCardCB: (taskId: number) => void;
};

const TaskCard = (props: Props) => {
  return (
    <div className="flex p-5 bg-white justify-between rounded-md shadow-md items-start">
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-bold">{props.task.title}</h1>
        <p className="text-sm">{props.task.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="hover:text-gray-600"
          onClick={() => {
            props.deleteTaskCardCB(props.task.id);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
