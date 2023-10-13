import { useUpdateEmployeeMutation } from "@/Redux/Features/api/AdminApi/AddEmployeeApi";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateEmployeeDetails = ({
  isUpdateModalOpen,
  setUpdateModalOpen,
  employee,
}) => {
  const [setUpdateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    if (employee) {
      const fullName = employee?.name?.split(" ");
      if (fullName) {
        setFirstName(fullName[0]);
        setLastName(fullName[1]);
      }
    }
  }, [employee]);

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const designation = form.designation.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const name = firstName + " " + lastName;

    const updateEmployeeData = {
      name,
      designation,
      email,
      phone,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You wan't change employee data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUpdateEmployee({
          updateEmployeeData,
          employeeId: employee._id,
        }).then((res) => {
          console.log(res);
          if (res.data.isEmailExist) {
            Swal.fire({
              icon: "error", // Replace 'FaCustomIcon' with your custom icon component
              title: "Oops...",
              text: "This Email Already Exist",
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirect to another page
                setUpdateModalOpen(!isUpdateModalOpen);
              }
            });
          }
          if (res.data.matchedCount > 0 && res.data.modifiedCount > 0) {
            toast.success("Employee Data Update Successfully", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setUpdateModalOpen(!isUpdateModalOpen);
          }
        });
      }
    });
  };

  console.log(employee);
  return (
    <Modal isOpen={isUpdateModalOpen} setIsOpen={setUpdateModalOpen}>
      <h2 className="text-center font-semibold text-[#0D64A5] text-2xl font-mono ">
        Update Employee
      </h2>
      <form
        onSubmit={handleUpdateEmployee}
        className="bg-[#0D64A5] mt-6 shadow-lg px-5 py-8 rounded-lg"
      >
        <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              defaultValue={firstName}
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
              defaultValue={lastName}
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
              readOnly
              name="employeeid"
              defaultValue={employee?.employeeId}
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
      <Loader isOpen={isLoading}></Loader>
    </Modal>
  );
};

export default UpdateEmployeeDetails;
