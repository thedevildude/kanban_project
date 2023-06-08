import React, { useState, useReducer, useEffect } from "react";
import DropdownMenu from "../InputComponents/DropdownMenu";
import AddNewButton from "../buttons/AddNewButton";
import { CgAddR } from "react-icons/cg";
import Modal from "../modals/modal";
import CreateTask from "../InputComponents/CreateTask";
import { Task, TaskStatus } from "../../types/taskTypes";
import {
  deleteTask,
  getBoard,
  getStatuses,
  getTasks,
} from "../../utils/apiUtils";
import { Pagination } from "../../types/common";
import { navigate } from "raviger";
import { Board } from "../../types/boardTypes";
import TaskContainer from "../container/TaskContainer";

type TaskList = {
  title: string;
  description: string;
  statuses: TaskStatus[];
  tasks: Task[];
};

type InitializeTasks = {
  type: "INITIALIZE_TASKS";
  payload: TaskList;
};

type AddTask = {
  type: "ADD_TASK";
  payload: Task;
};

type DeleteTask = {
  type: "DELETE_TASK";
  payload: number;
};

type TaskAction = InitializeTasks | AddTask | DeleteTask;

const taskReducer = (state: TaskList, action: TaskAction) => {
  switch (action.type) {
    case "INITIALIZE_TASKS":
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        tasks: action.payload.tasks,
        statuses: action.payload.statuses,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

const KanbanBoard = (props: { boardId: number }) => {
  const [newTask, setNewTask] = useState(false);
  const [state, dispatch] = useReducer(taskReducer, {
    title: "",
    description: "",
    tasks: [],
    statuses: [],
  });

  useEffect(() => {
    const initializeTasks = async () => {
      try {
        if (localStorage.getItem("token") === null) {
          throw new Error("Not logged in");
        }
        const boardData: Board = await getBoard(props.boardId);
        const data: Pagination<Task> = await getTasks(props.boardId);
        const statusData: Pagination<TaskStatus> = await getStatuses();
        if (data.results.length !== 0) {
          data.results.sort((a, b) => a.id - b.id);
          dispatch({
            type: "INITIALIZE_TASKS",
            payload: {
              title: boardData.title,
              description: boardData.description,
              tasks: data.results,
              statuses: statusData.results,
            },
          });
        }
      } catch (error) {
        navigate("/login");
      }
    };
    initializeTasks();
  }, [props.boardId]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="text-2xl font-bold">{state.title}</p>
      <div className="flex justify-between">
        <DropdownMenu
          triggerText="Filter"
          items={["Personal Boards", "Team Boards"]}
        />
        <AddNewButton
          buttonClickCB={() => setNewTask(true)}
          label="New Task"
          icon={<CgAddR className="h-5 w-5" />}
        />
        <Modal open={newTask} closeCB={() => setNewTask(false)}>
          <CreateTask
            boardId={props.boardId}
            closeModelCB={() => setNewTask(false)}
            addTaskCB={(task) =>
              dispatch({
                type: "ADD_TASK",
                payload: {
                  ...task,
                },
              })
            }
          />
        </Modal>
      </div>
      <TaskContainer
        statuses={state.statuses}
        tasks={state.tasks}
        deleteTaskCB={(taskId: number) => {
          deleteTask(props.boardId, taskId);
          dispatch({
            type: "DELETE_TASK",
            payload: taskId,
          });
        }}
      />
    </div>
  );
};

export default KanbanBoard;
