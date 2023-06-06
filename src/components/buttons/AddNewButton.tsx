import React from "react";

type Props = {
  buttonClickCB: () => void;
  label: string;
  icon: React.ReactNode;
};


const AddNewButton = (props: Props) => {
  return (
    <button
      className="border-2 border-gray-500 text-gray-500 bg-white hover:bg-gray-100 py-2 px-4 rounded-md"
      onClick={() => props.buttonClickCB()}
    >
      <div className="flex items-center">
        {props.icon}
        <p className="ml-2">{props.label}</p>
      </div>
    </button>
  );
};

export default AddNewButton;
