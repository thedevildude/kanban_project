import React from "react";

type Props = {
  triggerText: string;
  items: string[];
  handleDropdownCB: (item: string) => void;
};

const DropdownMenu = (props: Props) => {
  const handleItemClick = (item: string) => {
    props.handleDropdownCB(item);
  };

  return (
    <div className="relative inline-block">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onChange={(e) => handleItemClick(e.target.value)}
      >
        <option value="">{props.triggerText}</option>
        {props.items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-4-4h8l-4 4z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default DropdownMenu;
