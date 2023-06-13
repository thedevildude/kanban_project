import React from "react";
import { Task, TaskStatus } from "../../types/taskTypes";
import StatusContainer from "./StatusContainer";

type Props = {
  tasks: Task[];
  statuses: TaskStatus[];
  deleteTaskCB: (taskId: number) => void;
  setTaskEditor: (taskEditor: boolean, taskId: number) => void;
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
          deleteTaskCB={props.deleteTaskCB}
          setTaskEditorCB={(taskEditor: boolean, taskId: number) =>
            props.setTaskEditor(taskEditor, taskId)
          }
        />
      ))}
    </div>
  );
};

export default TaskContainer;
