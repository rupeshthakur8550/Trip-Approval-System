import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartWithTable = ({ title, chartData, total }) => {
  return (
    <div className="flex flex-col items-center">
      <h2>{title}</h2>
      <div
        style={{ width: "400px", height: "400px" }}
        className="flex justify-center items-center mb-5"
      >
        <Pie data={chartData} />
      </div>
      <h1 className="font-bold">Total: {total}</h1>
      <table className="border-collapse border border-gray-200 mt-10">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {chartData.labels.map((label, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{label}</td>
              <td className="border border-gray-300 p-2">
                {chartData.datasets[0].data[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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

  let approvalChartData = {
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
    <div className="flex flex-col gap-10 justify-center items-center h-[87vh]">
      <div className="flex gap-16">
        <ChartWithTable
          title="Request Status Overview"
          chartData={requestChartData}
          total={requestData["Total Request Raised"] || 0}
        />

        {designation === "Manager" && (
          <ChartWithTable
            title="Approval Status Overview"
            chartData={approvalChartData}
            total={approvalData["Total Request Received"] || 0}
          />
        )}

        <ChartWithTable
          title="Budget Overview"
          chartData={budgetChartData}
          total={budgetData["Department Quaterly Budget"] || 0}
        />
      </div>
      {/* Other content can go here */}
    </div>
  );
};

export default DashboardTable;
