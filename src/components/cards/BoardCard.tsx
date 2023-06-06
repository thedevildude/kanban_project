import { Link } from "raviger";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

type Props = {
  id: number;
  title: string;
  description: string;
};

const BoardCard = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex flex-col p-5 w-64 h-32 overflow-hidden bg-teal-400 shadow-md rounded-lg">
      <div className="flex justify-between">
        <Link
          href={`/boards/${props.id}`}
          className="text-lg font-bold overflow-hidden overflow-ellipsis h-12 w-2/3 hover:text-gray-600"
        >
          {props.title}
        </Link>
        <div>
          <button
            className="hover:text-gray-600"
            onClick={() => setShowMenu(!showMenu)}
          >
            <BsThreeDots />
          </button>
          <div
            className={`absolute z-10 ${
              showMenu ? "" : "hidden"
            } bg-white shadow-md rounded-lg`}
          >
            <div className="flex flex-col gap-2 p-2">
              <button className="hover:bg-gray-200">Edit</button>
              <button className="hover:bg-gray-200">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm mt-5 overflow-hidden overflow-ellipsis">
        {props.description}
      </p>
    </div>
  );
};

export default BoardCard;
