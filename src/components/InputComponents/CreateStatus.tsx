import React, { useState } from "react";
import { TaskStatus } from "../../types/taskTypes";
import { createStatus } from "../../utils/apiUtils";
import TextInput from "./TextInput";

type Props = {
  closeModelCB: () => void;
  addStatusCB: (status: TaskStatus) => void;
};

const CreateStatus = (props: Props) => {
  const [state, setState] = useState({
    id: 0,
    title: "",
    description: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: TaskStatus = await createStatus(
        state.title,
        state.description
      );
      props.addStatusCB(data);
      props.closeModelCB();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Add New Stage</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            label="Title"
            placeholder="stage title"
            value={state.title}
            type="text"
            id="title"
            handleChangeCB={(e) =>
              setState({
                ...state,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Description"
            placeholder="stage description"
            value={state.description}
            type="text"
            id="description"
            handleChangeCB={(e) =>
              setState({
                ...state,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStatus;
