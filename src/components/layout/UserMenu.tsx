import { Link } from "raviger";
import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const UserMenuData = [
  {
    name: "Profile",
    link: "profile/",
    icon: "",
  },
  {
    name: "Settings",
    link: "settings/",
    icon: "",
  },
  {
    name: "Logout",
    link: "logout/",
    icon: "",
  },
];

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative justify-self-end">
      <button
        className="flex items-center gap-1 text-gray-700"
        onClick={() => setShowMenu(!showMenu)}
      >
        <p className="font-semibold">User</p>
        <span>
          {showMenu ? <AiOutlineUp /> : <AiOutlineDown />}
        </span>
      </button>
      {showMenu && (
        <div className="absolute top-10 right-0 w-52 bg-white rounded-md shadow-md">
          {UserMenuData.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="block p-2 hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
