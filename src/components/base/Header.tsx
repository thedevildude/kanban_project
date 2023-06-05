import React from "react";
import SearchInput from "../InputComponents/SearchInput";
import UserMenu from "./UserMenu";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  return (
    <div className="grid grid-cols-3 py-5 px-10 gap-5 items-center w-full border border-gray-200 fixed">
      <p className="text-2xl font-bold">LOGO</p>
      <div className="flex items-center gap-5">
        <SearchInput />
        <IoMdNotificationsOutline className="w-8 h-8 text-gray-500" />
      </div>
      <UserMenu />
    </div>
  );
};

export default Header;
