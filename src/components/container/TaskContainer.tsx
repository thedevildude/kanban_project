import React from "react";
import { Task, TaskStatus } from "../../types/taskTypes";
import StatusContainer from "./StatusContainer";

type Props = {
  tasks: Task[];
  statuses: TaskStatus[];
};

const TaskContainer = (props: Props) => {
  return (
    <div className="flex gap-5 h-screen w-full">
      {props.statuses.map((status) => (
        <StatusContainer
          key={status.id}
          statusId={status.id}
          title={status.title}
          description={status.description}
          tasks={props.tasks.filter(
            (task) => task.status_object?.id === status.id
          )}
        />
      ))}
    </div>
  );
};

export default TaskContainer;
