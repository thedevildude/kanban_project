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
import TaskEditor from "../InputComponents/TaskEditor";
import { AiOutlineEdit } from "react-icons/ai";
import BoardEditor from "../InputComponents/BoardEditor";

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

type UpdateBoard = {
  type: "UPDATE_BOARD";
  payload: Partial<Board>;
};

type AddTask = {
  type: "ADD_TASK";
  payload: Task;
};

type DeleteTask = {
  type: "DELETE_TASK";
  payload: number;
};

type UpdateTask = {
  type: "UPDATE_TASK";
  taskId: number;
  payload: Partial<Task>;
};

type TaskAction =
  | InitializeTasks
  | AddTask
  | DeleteTask
  | UpdateTask
  | UpdateBoard;

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
    case "UPDATE_BOARD":
      return {
        ...state,
        title: action.payload.title || state.title,
        description: action.payload.description || state.description,
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
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? { ...task, ...action.payload } : task
        ),
      };
    default:
      return state;
  }
};

const KanbanBoard = (props: { boardId: number }) => {
  const [newTask, setNewTask] = useState(false);
  const [taskEditor, setTaskEditor] = useState({
    taskEditor: false,
    taskId: 0,
  });
  const [boardEditor, setBoardEditor] = useState(false);
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
      <div className="flex items-center gap-5">
        <p className="text-2xl font-bold">{state.title}</p>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setBoardEditor(true)}
        >
          <AiOutlineEdit className="w-5 h-5" />
        </button>
        <Modal open={boardEditor} closeCB={() => setBoardEditor(false)}>
          <BoardEditor
            boardId={props.boardId}
            updateBoardCB={(board: Partial<Board>) =>
              dispatch({
                type: "UPDATE_BOARD",
                payload: board,
              })
            }
            closeModelCB={() => setBoardEditor(false)}
          />
        </Modal>
      </div>
      <p className="text-gray-500">{state.description}</p>
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
        <Modal
          open={taskEditor.taskEditor}
          closeCB={() =>
            setTaskEditor({
              taskEditor: false,
              taskId: 0,
            })
          }
        >
          <TaskEditor
            boardId={props.boardId}
            taskId={taskEditor.taskId}
            updateTaskCB={(taskId: number, task: Partial<Task>) =>
              dispatch({
                type: "UPDATE_TASK",
                taskId,
                payload: task,
              })
            }
            closeModelCB={() =>
              setTaskEditor({
                taskEditor: false,
                taskId: 0,
              })
            }
            statuses={state.statuses}
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
        setTaskEditor={(taskEditor: boolean, taskId: number) =>
          setTaskEditor({ taskEditor, taskId })
        }
      />
    </div>
  );
};

export default KanbanBoard;
