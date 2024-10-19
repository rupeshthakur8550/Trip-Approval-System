import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import common from "../assets/Json/common.json";
import RequestDialogue from "./RequestDialogue";
import RequestDialogueTravelDetails from "./RequestDialogueTravelDetails";

const DashRequests = () => {
  const tableData = common.tableData;

  const [searchTerm, setSearchTerm] = useState("");
  const [requestDialogue, setRequestDialogue] = useState(false);
  const [traveldetails, setTravelDetails] = useState(false);

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
    setTravelDetails(false);
  };

  const onNext = () => {
    setRequestDialogue(false);
    setTravelDetails(true);
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
      <div className="mt-5 md:mt-0">
        <div className="overflow-y-auto h-[84vh]">
          <hr className="w-full border-2 my-3" />
          <div className="flex flex-row justify-between text-center mx-1">
            {[
              "Travel ID",
              "Start Date",
              "Source",
              "Destination",
              "Return Date",
              "Reason",
              "Status",
            ].map((header) => (
              <p
                key={header}
                className="flex-1 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2"
              >
                {header}
              </p>
            ))}
          </div>
          <hr className="w-full border-2 my-3" />
          {filteredData.map((travel) => (
            <React.Fragment key={travel.travelId}>
              <div className="flex flex-row justify-between items-center mx-1 text-center">
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.travelId}
                </p>
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.startDate}
                </p>
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.source}
                </p>
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.destination}
                </p>
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.returnDate}
                </p>
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {travel.reason}
                </p>
                <p
                  className={`flex-1 tracking-widest md:text-lg text-xs title-font font-medium mb-1 ${getStatusColor(
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
      <RequestDialogue
        visible={requestDialogue}
        onHide={onHide}
        onNext={onNext}
      />
      <RequestDialogueTravelDetails
        visible={traveldetails}
        onHide={onHide}
        categories={common.categories}
      />
    </>
  );
};

export default DashRequests;
