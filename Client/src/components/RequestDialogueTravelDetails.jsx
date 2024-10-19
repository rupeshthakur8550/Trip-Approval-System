import React, { useState } from "react";
import { Modal, Button, Dropdown, TextInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { MdOutlineFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineCheck } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";

const RequestDialogueTravelDetails = ({ visible, onHide, categories }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [expenses, setExpenses] = useState([]);
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [selectedTravelType, setSelectedTravelType] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    document: "",
    amount: "",
  });
  const fromDate = watch("fromDate");
  const toDate = watch("toDate");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    console.log("Expenses:", expenses);
    onHide();
  };

  const handleDropdownItemClick = (category) => {
    setSelectedTravelType((prev) => {
      const newSelection = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];
      setValue("travelType", newSelection);
      return newSelection;
    });
  };

  const handleOpenAddExpense = () => {
    setOpenAddExpense(true);
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ description: "", document: "", amount: "" }); // Reset input fields
    }
    setOpenAddExpense(false);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewExpense({ ...newExpense, document: file.name });
  };

  return (
    <Modal show={visible} onClose={onHide} size="2xl">
      <Modal.Header>Travel Details</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-2 mb-4">
            <Label value="Travel Type" />
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <TextInput
                  type="text"
                  placeholder="Select Travel Type"
                  value={selectedTravelType.join(", ")}
                  id="travelType"
                  className="mt-2 cursor-pointer md:w-[31.5vw] w-[85vw]"
                  readOnly
                />
              }
            >
              <div className="max-h-60 overflow-y-auto">
                {categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <Dropdown.Item
                      className="text-md justify-center"
                      onClick={() => handleDropdownItemClick(category)}
                    >
                      {category}
                    </Dropdown.Item>
                    {index !== categories.length - 1 && <Dropdown.Divider />}
                  </React.Fragment>
                ))}
              </div>
            </Dropdown>
            {errors.travelType && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <InputField
            label="Destination"
            register={register}
            name="destination"
            error={errors.destination}
          />

          <TextAreaField
            label="Travel Purpose (please explain in detail)"
            register={register}
            name="travelPurpose"
            error={errors.travelPurpose}
          />

          <div className="flex gap-5 w-full">
            <DatePickerField
              label="Departure Date"
              selectedDate={fromDate}
              setValue={setValue}
              name="fromDate"
            />
            <DatePickerField
              label="Return Date"
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Expense Details
            </label>
            {expenses.map((expense, index) => (
              <div key={index} className="flex items-center mt-2">
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {expense.description}
                </p>
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {expense.document}
                </p>
                <p className="flex-1 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">
                  {expense.amount}
                </p>
                <button
                  type="button"
                  onClick={() => removeExpense(index)}
                  className="text-red-500 ml-2"
                >
                  <RxCross2 className="size-7" />
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={handleOpenAddExpense}
              className="text-blue-500 flex items-center mb-2"
            >
              + Add Expense
            </button>
            {openAddExpense && (
              <div className="flex items-center mt-2">
                <InputField
                  label="Description"
                  register={register}
                  name="expenseDescription"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      description: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("fileUpload").click()}
                  className="mx-5 flex items-center"
                >
                  <MdOutlineFileUpload className="mr-2 size-7" />
                  <span className="font-semibold">Doc.</span>
                </button>
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileUpload}
                  className="mt-1 hidden"
                  accept="*"
                />
                <InputField
                  label="Amount"
                  register={register}
                  name="expenseAmount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={handleAddExpense}
                  className="text-green-500 ml-2"
                >
                  <HiOutlineCheck className="size-7" />
                </button>
              </div>
            )}
          </div>
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Reusable Input Field Component
const InputField = ({
  label,
  register,
  name,
  type = "text",
  error,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name, { required: true })}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-red-500">This field is required</span>}
    </div>
  );
};

// Reusable Text Area Component
const TextAreaField = ({ label, register, name, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
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

export default RequestDialogueTravelDetails;
