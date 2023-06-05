import React from "react";
import { Link } from "raviger";
import { SidebarData } from "./SidebarData";

const SideMenu = (props: { isOpen: boolean }) => {

  return (
    <div
      className={`fixed left-0 inset-y-0 w-64 bg-gray-100 transform transition-transform duration-300 ease-in-out ${
        props.isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col mt-24">
        {SidebarData.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
