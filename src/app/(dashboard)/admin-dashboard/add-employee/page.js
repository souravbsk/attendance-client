"use client";
import { useAddNewEmployeeMutation } from "@/Redux/Features/api/AdminApi/AddEmployeeApi";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const router = useRouter();

  const [addAnEmployee, { data, isLoading, isError, error }] =
    useAddNewEmployeeMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isError, error]);

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const designation = form.designation.value;
    const email = form.email.value;
    const phone = form.phone.value;
    //console.log(employeeidValue);
    const name = firstName + " " + lastName;

    const newEmployee = {
      name,
      designation,
      email,
      phone,
    };

    addAnEmployee(newEmployee).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Employee Successfully Added", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        form.reset();
      }

      if (res.data.isEmailExist) {
        Swal.fire({
          icon: "error", // Replace 'FaCustomIcon' with your custom icon component
          title: "Oops...",
          text: "This Email Already Exist",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to another page
            return router.push("/admin-dashboard/all-employee");
          }
        });
      }
    });

    //console.log();
  };

  return (
    <div className="mx-auto relative w-full md:w-8/12">
      <h2 className="text-center text-2xl font-mono font-semibold text-[#0D64A5] mt-12">
        Add Employee
      </h2>
      <form
        onSubmit={handleEmployeeSubmit}
        className="bg-[#0D64A5] mt-8 shadow-lg px-5 py-8 rounded-lg"
      >
        <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
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
              name="designation"
              placeholder="Designation"
              className="input input-bordered"
            />
          </div>
          {/* <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Employee ID</span>
            </label>
            <input
              type="text"
              name="employeeid"
              placeholder="Employee_Id"
              className="input input-bordered"
            />
          </div> */}
        </div>
        <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
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
    </div>
  );
};

export default AddEmployee;
