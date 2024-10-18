import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardTable = () => {
  const user = useSelector((state) => state.user.user);

  const designation = user ? user.designation : null;

  let requestData = {};
  let approvalData = {};
  let budgetData = {};

  if (designation === "Employee") {
    requestData = user.dashboard?.request || {};
    budgetData = user.dashboard?.department_budget || {};
  } else if (designation === "Manager") {
    requestData = user.dashboard?.request || {};
    approvalData = user.dashboard?.approvals || {};
    budgetData = user.dashboard?.department_budget || {};
  }

  // Ensure requestData exists before proceeding
  if (!requestData) {
    return <div>No request data available.</div>;
  }

  const requestChartData = {
    labels: [
      "Request Accepted",
      "Request Rejected",
      "Request Pending on Manager Side",
      "Request Pending on Finance Side",
    ],
    datasets: [
      {
        label: "Request Status",
        data: [
          requestData["Request accepted"] || 0,
          requestData["Request rejected"] || 0,
          requestData["Request pending on manager side"] || 0,
          requestData["Request pending on finance side"] || 0,
        ],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3", "#FF9800"],
        borderWidth: 1,
      },
    ],
  };

  // Define approvalChartData only if the user is a manager
  let approvalChartData = {
    labels: [],
    datasets: [],
  };

  if (designation === "Manager") {
    approvalChartData = {
      labels: [
        "Request Accepted",
        "Request Rejected",
        "Request Pending",
        "Request Pending on Finance Side",
      ],
      datasets: [
        {
          label: "Approval Status",
          data: [
            approvalData["Request accepted"] || 0,
            approvalData["Request rejected"] || 0,
            approvalData["Request pending"] || 0,
            approvalData["Request pending on finance side"] || 0,
          ],
          backgroundColor: ["#4CAF50", "#F44336", "#2196F3", "#FF9800"],
          borderWidth: 1,
        },
      ],
    };
  }

  const budgetChartData = {
    labels: ["Department Quarterly Budget", "Remaining Amount", "Spent Amount"],
    datasets: [
      {
        label: "Budget Overview",
        data: [
          budgetData["Department Quaterly Budget"] || 0,
          budgetData["Remaining Amt"] || 0,
          budgetData["Spent Amt"] || 0,
        ],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center h-[87vh]">
      <div className="flex">
        <div className="flex flex-col items-center">
          <h2>Request Status Overview</h2>
          <div
            style={{ width: "300px", height: "300px" }}
            className="flex justify-center items-center mb-5"
          >
            <Pie data={requestChartData} />
          </div>
          <h1 className="font-bold">
            Total Requests: {requestData["Total Request Raised"] || 0}
          </h1>
        </div>

        {designation === "Manager" && (
          <div className="flex flex-col items-center">
            <h2>Approval Status Overview</h2>
            <div
              style={{ width: "300px", height: "300px" }}
              className="flex justify-center items-center"
            >
              <Pie data={approvalChartData} />
            </div>
            <h1 className="font-bold">
              Total Approvals: {approvalData["Total Request Received"] || 0}
            </h1>
          </div>
        )}
        <div className="flex flex-col items-center">
          <h2>Budget Overview</h2>
          <div
            style={{ width: "300px", height: "300px" }}
            className="flex justify-center items-center"
          >
            <Pie data={budgetChartData} />
          </div>
          <h1 className="font-bold">
            Total Budget: {budgetData["Department Quaterly Budget"] || 0}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
