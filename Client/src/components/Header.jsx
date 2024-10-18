import React from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
// import common from "../assets/Json/common.json";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 shadow-md">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-2xl font-extrabold"
        style={{ fontVariant: "unicase" }}
      >
        <span className="px-2 py-1 bg-gradient-to-r from-orange-500 via-sky-500 to-emerald-500 inline-block text-transparent bg-clip-text">
          Trip Approval System
        </span>
      </Link>
      <div className="relative">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="user" rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm w-36 text-center">
              {user?.name} {/* Replace with {currentUser.username} */}
            </span>
            <span className="block text-sm font-medium truncate text-center">
              {/* Replace with {currentUser.name} */}
              {user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item className="text-md">Sign Out</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
