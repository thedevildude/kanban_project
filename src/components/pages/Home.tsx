import React, { useEffect, useState } from "react";
import { navigate } from "raviger";
import { Board } from "../../types/boardTypes";
import { getBoards, getStatuses, getTasks } from "../../utils/apiUtils";
import { Pagination } from "../../types/common";
import { Task, TaskStatus } from "../../types/taskTypes";

const Home = () => {
  const [homeCounts, setHomeCounts] = useState({
    boardCount: 0,
    taskCount: 0,
    statusCount: 0,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const initializeHome = async () => {
      try {
        const boardData: Pagination<Board> = await getBoards();
        let taskCount = 0;
        for (let i = 0; i < boardData.results.length; i++) {
          const data: Pagination<Task> = await getTasks(
            boardData.results[i].id
          );
          taskCount += data.results.length;
        }
        const statusData: Pagination<TaskStatus> = await getStatuses();
        setHomeCounts({
          boardCount: boardData.results.length,
          taskCount: taskCount,
          statusCount: statusData.results.length,
        });
      } catch (error) {
        console.log(error);
      }
    };
    initializeHome();
  }, []);

  return (
    <div className="w-full">
      <p className="text-2xl font-bold">Home</p>
      <div className="flex gap-5 justify-between mt-5">
        <div className="flex flex-col gap-5 bg-teal-300 p-5">
          <p className="text-xl font-bold">Boards</p>
          <p className="text-lg">
            You have {homeCounts.boardCount} boards in total.
          </p>
        </div>
        <div className="flex flex-col gap-5 bg-teal-300 p-5">
          <p className="text-xl font-bold">Tasks</p>
          <p className="text-lg">
            You have {homeCounts.taskCount} tasks in total.
          </p>
        </div>
        <div className="flex flex-col gap-5 bg-teal-300 p-5">
          <p className="text-xl font-bold">Statuses</p>
          <p className="text-lg">
            You have {homeCounts.statusCount} statuses in total.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
