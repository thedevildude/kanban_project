import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { getTask, updateTask } from "../../utils/apiUtils";
import { Errors } from "../../types/boardTypes";
import { Task, TaskStatus } from "../../types/taskTypes";

type Props = {
  boardId: number;
  taskId: number;
  closeModelCB: () => void;
  statuses: TaskStatus[];
  updateTaskCB: (taskId: number, task:Partial<Task>) => void;
};

const TaskEditor = (props: Props) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: 0,
  });
  const [errors, setErrors] = useState<Errors<Task>>({});
  useEffect(() => {
    if (props.taskId === 0) return;
    getTask(props.boardId, props.taskId).then((task: Task) => {
      setTask({
        title: task.title,
        description: task.description,
        status: task.status_object?.id || 0,
      });
      console.log(task);
      
    });
  }, [props.boardId, props.taskId]);

  const handleTaskUpdate = async (data: Partial<Task>) => {
    setTask({ ...task, ...data });
    const errors: Errors<Task> = {};
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
        await updateTask(props.boardId, props.taskId, {...task, ...data});
        props.updateTaskCB(props.taskId, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Edit Task</h1>
      <div className="py-4">
        <div className="mb-4">
          <TextInput
            label="Title"
            placeholder="task title"
            value={task.title}
            type="text"
            id="title"
            handleChangeCB={(e) =>
              handleTaskUpdate({
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
            value={task.description}
            type="text"
            id="description"
            handleChangeCB={(e) =>
              handleTaskUpdate({
                description: e.target.value,
              })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={task.status}
            onChange={(e) =>
              handleTaskUpdate({
                status: parseInt(e.target.value),
              })
            }
          >
            {props.statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskEditor;
