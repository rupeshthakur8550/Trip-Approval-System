import React, { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashboardTable from "../components/DashboardTable";
import { useLocation } from "react-router-dom";
import DashRequests from "../components/DashRequests";
import DashApprovals from "../components/DashApprovals";
import common from "../assets/Json/common.json";
import { setUser } from "../modules/userSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  dispatch(setUser(common.userData.manager));
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    // console.log(selectedDashboard);
  }, [location.search]);

  return (
    <div className="flex flex-row h-[90%] w-[100%] mt-3">
      <div>
        <DashSidebar />
      </div>
      {tab === "dashboard" && (
        <div className="w-full mx-5">
          <DashboardTable />
        </div>
      )}
      {tab === "requests" && (
        <div className="w-full mx-5">
          <DashRequests />
        </div>
      )}
      {tab === "approvals" && (
        <div className="w-full mx-5">
          <DashApprovals />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
