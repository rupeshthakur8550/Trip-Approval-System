import React, { useState } from "react";
import { Button, Table, TextInput } from "flowbite-react";
import common from "../assets/Json/common.json";
import RequestDialogue from "./RequestDialogue";

const DashRequests = () => {
  const tableData = common.tableData;

  // State to manage the search input value
  const [searchTerm, setSearchTerm] = useState("");
  const [requestDialogue, setRequestDialogue] = useState(false); // Fixed typo here

  // Filtered table data based on the search term
  const filteredData = tableData.filter((travel) =>
    Object.values(travel).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Function to determine status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-700"; // Light green background and dark green text
      case "pending":
        return "text-blue-700"; // Light blue background and dark blue text
      case "rejected":
        return "text-red-700"; // Light red background and dark red text
      default:
        return ""; // No special styling
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
        onClick={handleClick} // Fixed this line
      >
        Create request
      </Button>
      <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse border border-gray-300">
          <Table.Head>
            <Table.HeadCell className="border border-gray-300 bg-gray-100 font-bold">
              Travel ID
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 bg-gray-100 font-bold">
              Start Date
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 bg-gray-100 font-bold">
              Source
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 bg-gray-100 font-bold">
              Destination
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 bg-gray-100 font-bold">
              Return Date
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 bg-gray-100 font-bold">
              Reason
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 bg-gray-100 font-bold">
              Status
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredData.map((travel) => (
              <Table.Row
                key={travel.travelId}
                className="border-b border-gray-200"
              >
                <Table.Cell className="border border-gray-300">
                  {travel.travelId}
                </Table.Cell>
                <Table.Cell className="border border-gray-300">
                  {travel.startDate}
                </Table.Cell>
                <Table.Cell className="border border-gray-300">
                  {travel.source}
                </Table.Cell>
                <Table.Cell className="border border-gray-300">
                  {travel.destination}
                </Table.Cell>
                <Table.Cell className="border border-gray-300">
                  {travel.returnDate}
                </Table.Cell>
                <Table.Cell className="border border-gray-300">
                  {travel.reason}
                </Table.Cell>
                <Table.Cell
                  className={`border border-gray-300 ${getStatusClass(
                    travel.status
                  )}`}
                >
                  {travel.status}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <RequestDialogue visible={requestDialogue} onHide={onHide} />
    </>
  );
};

export default DashRequests;
