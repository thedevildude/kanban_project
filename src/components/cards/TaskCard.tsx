import React from "react";

type Props = {
  id: number;
  title: string;
  description: string;
};

const TaskCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-lg font-bold">{props.title}</h1>
      <p className="text-sm">{props.description}</p>
    </div>
  );
};

export default TaskCard;
