import React from "react";
import { Task } from "../../types/taskTypes";
import { CgAddR } from "react-icons/cg";
import TaskCard from "../cards/TaskCard";

type Props = {
  statusId: number;
  title: string;
  description: string;
  tasks: Task[];
  deleteTaskCB: (taskId: number) => void;
};

const StatusContainer = (props: Props) => {
  return (
    <div className="flex flex-col w-full gap-10 bg-teal-200 p-5 rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <button className="hover:text-gray-600">
          <CgAddR className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col gap-5 h-screen overflow-auto">
        {props.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTaskCardCB={(taskId) => {
              props.deleteTaskCB(taskId);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusContainer;
