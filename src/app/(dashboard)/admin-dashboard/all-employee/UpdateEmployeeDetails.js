import Modal from "@/components/Modal/Modal";
import React from "react";

const UpdateEmployeeDetails = ({
  isUpdateModalOpen,
  setUpdateModalOpen,
  employee,
}) => {
  //console.log(employee);

//   employeeID: "E010",
//   first_name: "Sarah Adams",
//   last_name: "Sarah Adams",
//   designation: "Operations Manager",
//   email: "sarah.adams@example.com",
//   phone: "+1 (012) 345-6789",
//   id: 110,

  return (
    <Modal isOpen={isUpdateModalOpen} setIsOpen={setUpdateModalOpen}>
      <h2 className="text-center font-semibold text-[#0D64A5] text-2xl font-mono ">Update Employee</h2>
      <form className="bg-[#0D64A5] mt-6 shadow-lg px-5 py-8 rounded-lg">
        <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              defaultValue={employee?.first_name}
              placeholder="first_name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="last_name"
              defaultValue={employee?.last_name}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Designation</span>
            </label>
            <input
              type="text"
              defaultValue={employee?.designation}
              name="designation"
              placeholder="Designation"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Employee ID</span>
            </label>
            <input
              type="text"
              name="employeeid"
              defaultValue={employee?.employeeID}
              placeholder="Employee_Id"
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={employee?.email}
              placeholder="Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Phone</span>
            </label>
            <input
              type="tel"
              name="phone"
              defaultValue={employee?.phone}
              placeholder="Phone"
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="btn bg-[#0D64A5] hover:text-[#0D64A5] text-white">
            Add Employee
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateEmployeeDetails;
