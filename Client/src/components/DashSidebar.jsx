import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import { MdChecklist, MdOutlineLogout } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Sidebar
      className={`h-[90vh] mx-5 border-2 shadow-md border-gray-300 rounded-md`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col align-content-end">
          <div>
            <Link to="/dashboard?tab=dashboard">
              <Sidebar.Item icon={HiHome} as="div">
                Dashboard
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=requests">
              <Sidebar.Item
                icon={FaGreaterThan}
                label={user.designation}
                labelColor="dark"
                as="div"
              >
                Requests
              </Sidebar.Item>
            </Link>
            {user.designation === "Manager" && (
              <Link to="/dashboard?tab=approvals">
                <Sidebar.Item icon={MdChecklist} as="div">
                  Approvals
                </Sidebar.Item>
              </Link>
            )}
          </div>

          <div className=" absolute bottom-6 w-[12%]">
            <Sidebar.Item
              icon={MdOutlineLogout}
              className="cursor-pointer text-red-600 align-self-end w-full"
              onClick={() => console.log("Sign Out")}
            >
              Sign Out
            </Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
