import { Modal, Button } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Reusable Input Field Component
const InputField = ({ label, register, name, type = "text", error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name, { required: true })}
        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-red-500">This field is required</span>}
    </div>
  );
};

// Reusable Date Picker Component
const DatePickerField = ({ label, selectedDate, setValue, name }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setValue(name, date)}
        className="mt-1 block w-[15vw] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
};

const RequestDialogue = ({ visible, onHide, onNext }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const fromDate = watch("fromDate");
  const toDate = watch("toDate");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    onNext(data); // Call onNext with form data
  };

  return (
    <Modal show={visible} onClose={onHide}>
      <Modal.Header>Employee Details</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Name"
            register={register}
            name="name"
            error={errors.name}
          />
          <InputField
            label="Email"
            register={register}
            name="email"
            type="email"
            error={errors.email}
          />
          <InputField
            label="Destination"
            register={register}
            name="destination"
            error={errors.destination}
          />
          <InputField
            label="Reporting Manager"
            register={register}
            name="manager"
            error={errors.manager}
          />
          <div className="flex gap-5">
            <DatePickerField
              label="From Date"
              selectedDate={fromDate}
              setValue={setValue}
              name="fromDate"
            />
            <DatePickerField
              label="To Date"
              selectedDate={toDate}
              setValue={setValue}
              name="toDate"
            />
          </div>
          <InputField
            label="Budget"
            register={register}
            name="budget"
            type="number"
            error={errors.budget}
          />
        </form>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button
          gradientDuoTone="pinkToOrange"
          outline={true}
          className="bg-transparent text-white border-white"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          gradientDuoTone="greenToBlue"
          outline={true}
          className="bg-transparent text-white border-white"
          onClick={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestDialogue;
