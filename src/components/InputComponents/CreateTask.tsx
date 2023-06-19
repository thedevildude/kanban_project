import React, { useState } from "react";
import { Task, Errors, validateTask, TaskStatus } from "../../types/taskTypes";
import { createTask } from "../../utils/apiUtils";
import TextInput from "./TextInput";

const CreateTask = (props: {
  boardId: number;
  addTaskCB: (task: Task) => void;
  statuses: TaskStatus[];
  closeModelCB: () => void;
}) => {
  const [task, setTask] = useState({
    id: 0,
    title: "",
    description: "",
    status: 1,
    board: props.boardId,
    duedate: "",
    duetime: "",
  });
  const [errors, setErrors] = useState<Errors<Task>>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateErrors = validateTask(task);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      try {
        const data: Task = await createTask({
          ...task,
          duedate: new Date(task.duedate + "T" + task.duetime).toISOString(),
        });
        props.addTaskCB(data);
        props.closeModelCB();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Create Task</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            label="Title"
            placeholder="task title"
            value={task.title}
            type="text"
            id="title"
            handleChangeCB={(e) =>
              setTask({
                ...task,
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
              setTask({
                ...task,
                description: e.target.value,
              })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <TextInput
            label="Due Date"
            placeholder="task due date"
            value={task.duedate}
            type="date"
            id="duedate"
            handleChangeCB={(e) =>
              setTask({
                ...task,
                duedate: e.target.value,
              })
            }
          />
          {errors.duedate && (
            <p className="text-red-500 text-sm">{errors.duedate}</p>
          )}
          <div className="mb-4">
            <TextInput
              label="Due Time"
              placeholder="task due time"
              value={task.duetime}
              type="time"
              id="duetime"
              handleChangeCB={(e) =>
                setTask({
                  ...task,
                  duetime: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
          <label htmlFor="status" className="font-semibold">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={task.status}
            onChange={(e) =>
              setTask({
                ...task,
                status: Number(e.target.value)
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

export default CreateTask;
