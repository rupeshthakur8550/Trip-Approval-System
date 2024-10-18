import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import common from "../assets/Json/common.json";
import RequestDialogue from "./RequestDialogue";

const DashRequests = () => {
  const tableData = common.tableData;

  const [searchTerm, setSearchTerm] = useState("");
  const [requestDialogue, setRequestDialogue] = useState(false);

  const filteredData = tableData.filter((travel) =>
    Object.values(travel).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-500";
      case "pending":
        return "text-blue-700";
      case "rejected":
        return "text-red-700";
      default:
        return "text-gray-600"; // Default color
    }
  };

  const handleClick = () => {
    setRequestDialogue(true);
  };

  const onHide = () => {
    setRequestDialogue(false);
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />
      </div>
      <Button
        gradientDuoTone="pinkToOrange"
        outline={true}
        className="bg-transparent text-white border-white absolute top-[5.2rem] right-10"
        onClick={handleClick}
      >
        Create request
      </Button>
      <div className="mt-5 md:mt-0 overflow-y-auto">
        <div>
          <hr className="w-full border-2 my-3" />
          <div className="flex flex-row justify-evenly text-center mx-1">
            <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">
              Travel ID
            </p>
            <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">
              Start Date
            </p>
            <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">
              Source
            </p>
            <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">
              Destination
            </p>
            <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">
              Return Date
            </p>
            <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">
              Reason
            </p>
            <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">
              Status
            </p>
          </div>
          <hr className="w-full border-2 my-3" />
          {filteredData.map((travel) => (
            <React.Fragment key={travel.travelId}>
              <div className="flex flex-row justify-evenly items-center mx-1 md:mx-20 text-center">
                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.travelId}
                </p>
                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.startDate}
                </p>
                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.source}
                </p>
                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.destination}
                </p>
                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.returnDate}
                </p>
                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.reason}
                </p>
                <p
                  className={`w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium mb-1 ${getStatusColor(
                    travel.status
                  )}`}
                >
                  {travel.status}
                </p>
              </div>
              <hr className="w-full my-3 border-2" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <RequestDialogue visible={requestDialogue} onHide={onHide} />
    </>
  );
};

export default DashRequests;
