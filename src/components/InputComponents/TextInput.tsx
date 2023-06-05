import React from "react";

type Props = {
  label: string;
  placeholder: string;
  value:string;
  type: string;
  id: string;
  handleChangeCB: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.handleChangeCB(e)}
        className="p-3.5 border-2 text-gray-700 border-gray-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default TextInput;
