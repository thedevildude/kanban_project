import React, { useState } from "react";
import SearchInput from "../InputComponents/SearchInput";
import UserMenu from "./UserMenu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMenu, BiChevronLeft } from "react-icons/bi";
import SideMenu from "./SideMenu";

const Header = (props: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-3 justify-between py-5 px-10 gap-5 items-center border border-gray-200">
        <SideMenu isOpen={isMenuOpen} />
        <div className="flex items-center gap-20">
          <p className="text-2xl font-bold">LOGO</p>
          {isMenuOpen ? (
            <BiChevronLeft
              className="h-8 w-8 text-gray-500 cursor-pointer z-10"
              onClick={toggleMenu}
            />
          ) : (
            <BiMenu
              className="h-8 w-8 text-gray-500 cursor-pointer z-10"
              onClick={toggleMenu}
            />
          )}
        </div>
        <div className="flex items-center gap-5">
          <SearchInput />
          <IoMdNotificationsOutline className="w-8 h-8 text-gray-500 cursor-pointer" />
        </div>
        <UserMenu />
      </div>
      <div className="">{props.children}</div>
    </div>
  );
};

export default Header;
