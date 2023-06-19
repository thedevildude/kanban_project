import React, { useState } from "react";
import { Task } from "../../types/taskTypes";
import { FaTrash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import DropdownMenu from "../InputComponents/DropdownMenu";

type Props = {
  tasks: Task[];
  deleteTaskCB: (taskId: number) => void;
  setTaskEditor: (taskEditor: boolean, taskId: number) => void;
};

const ListView = (props: Props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const handleFilter = (filter: string) => {
    switch (filter) {
      case "All":
        return setTasks(props.tasks);
      case "Due Today":
        return setTasks(
          props.tasks.filter((task) => {
            const dueDate = new Date(task.duedate ? task.duedate : "");
            const currentDate = new Date();
            return (
              dueDate.toISOString().split("T")[0] ===
                currentDate.toISOString().split("T")[0] &&
              task.status_object?.title !== ("Done" || "Completed" || "Archive")
            );
          })
        );
      case "Due Tomorrow":
        return setTasks(
          props.tasks.filter((task) => {
            const dueDate = new Date(task.duedate ? task.duedate : "");
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            return (
              dueDate.toISOString().split("T")[0] ===
                tomorrow.toISOString().split("T")[0] &&
              task.status_object?.title !== ("Done" || "Completed" || "Archive")
            );
          })
        );
      case "Overdue":
        return setTasks(
          props.tasks.filter((task) => {
            const dueDate = new Date(task.duedate ? task.duedate : "");
            const currentDate = new Date();

            return (
              dueDate < currentDate &&
              task.status_object?.title !== ("Done" || "Completed" || "Archive")
            );
          })
        );
      default:
        setTasks(props.tasks);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <DropdownMenu
        triggerText="All"
        items={["Due Today", "Due Tomorrow", "Overdue"]}
        handleDropdownCB={(item: string) => handleFilter(item)}
      />
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center p-5 bg-teal-200 hover:bg-teal-300 rounded-lg justify-between"
          >
            <div className="flex flex-col w-1/4 overflow-hidden">
              <h1 className="text-lg font-bold">{task.title}</h1>
              <p className="text-sm">{task.description}</p>
            </div>
            <p>{task.status_object?.title}</p>
            <div>
              <p>
                {
                  new Date(task.duedate ? task.duedate : "")
                    .toISOString()
                    .split("T")[0]
                }
              </p>
              <p>
                {
                  new Date(task.duedate ? task.duedate : "")
                    .toTimeString()
                    .split(" ")[0]
                }
              </p>
            </div>
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
