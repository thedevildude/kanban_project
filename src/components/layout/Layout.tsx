import React, { useState } from "react";
import SearchInput from "../InputComponents/SearchInput";
import UserMenu from "./UserMenu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMenu, BiChevronLeft } from "react-icons/bi";
import SideMenu from "./SideMenu";

const Layout = (props: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex w-full">
      <SideMenu isOpen={isMenuOpen} />
      {isMenuOpen ? (
        <BiChevronLeft
          className="h-8 w-8 text-gray-500 cursor-pointer absolute top-8 left-28 z-10"
          onClick={toggleMenu}
        />
      ) : (
        <BiMenu
          className="h-8 w-8 text-gray-500 cursor-pointer absolute top-8 left-28 z-10"
          onClick={toggleMenu}
        />
      )}
      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-3 px-10 py-5 gap-5 items-center border-b border-gray-400">
          <div className="flex items-center">
            <p className="text-2xl font-bold">LOGO</p>
          </div>
          <div className="flex items-center gap-5">
            <SearchInput />
            <IoMdNotificationsOutline className="w-8 h-8 text-gray-500 cursor-pointer" />
          </div>
          <UserMenu />
        </div>
        <div className="p-10">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
