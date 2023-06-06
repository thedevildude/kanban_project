import React from "react";

type Props = {
  id: number;
  title: string;
  description: string;
};

const Board = (props: Props) => {
  return (
    <div className="flex flex-col p-5 bg-gray-300 shadow-md">
      <p>{props.title}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default Board;
