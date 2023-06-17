import React from "react";
import { FaTrash } from "react-icons/fa";
import { Task } from "../../types/taskTypes";

type Props = {
  task: Task;
  deleteTaskCardCB: (taskId: number) => void;
  openTaskEditorCB: (taskEditor: boolean, taskId: number) => void;
};

const TaskCard = (props: Props) => {
  return (
    <div
      className="flex p-5 bg-white justify-between rounded-md shadow-md items-start"
      onClick={() => props.openTaskEditorCB(true, props.task.id)}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-bold">{props.task.title}</h1>
        <p className="text-sm">{props.task.description}</p>
        {props.task.duedate && (
          <div className="flex items-center text-sm gap-2">
            <p className="font-bold">Due on:</p>
            <p>
              {
                new Date(props.task.duedate ? props.task.duedate : "")
                  .toISOString()
                  .split("T")[0]
              }
            </p>
            <p>
              {
                new Date(props.task.duedate ? props.task.duedate : "")
                  .toTimeString()
                  .split(" ")[0]
              }
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          className="hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
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
