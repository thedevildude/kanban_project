import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  return (
    <div className="flex items-center w-full bg-gray-100 p-1">
      <AiOutlineSearch className="w-5 h-5 m-2 text-gray-500" />
      <input
        type="text"
        placeholder="Search for anything..."
        className="p-2 w-full text-gray-700 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default SearchInput;
