import React from "react";
import { Task } from "../../types/taskTypes";
import { FaTrash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

type Props = {
  tasks: Task[];
  deleteTaskCB: (taskId: number) => void;
  setTaskEditor: (taskEditor: boolean, taskId: number) => void;
};

const ListView = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        {props.tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center p-5 bg-teal-200 hover:bg-teal-300 rounded-lg justify-between"
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{task.title}</h1>
              <p className="text-sm">{task.description}</p>
            </div>
            <p>{task.status_object?.title}</p>
            <div className="flex items-center gap-5">
              <button onClick={() => props.deleteTaskCB(task.id)}>
                <FaTrash />
              </button>
              <button onClick={() => props.setTaskEditor(true, task.id)}>
                <BsThreeDots />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
