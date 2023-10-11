"use client";
import { useSignUpUserMutation } from "@/Redux/Features/userSlice/userApi";
import { createUser } from "@/Redux/Features/userSlice/userSlice";
import SignInWithGoogle from "@/components/SignInWithGoogle/SignInWithGoogle";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SignUp = () => {
  const dispatch = useDispatch();

  const [setSignUp, { isLoading, data, isError, error }] =
    useSignUpUserMutation();

  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;
    const fullName = form.fullName.value;
    const image = form.image.value;
    //console.log(image);
    if (password !== confirmpassword) {
      toast.error("password does not match", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    dispatch(createUser({ email, password, image, fullName })).then(
      
      (response) => {
        console.log(response);
        if (response.payload) {
          const newUser = {
            email: response.payload.email,
            image: response.payload.photoURL,
          };
          setSignUp(newUser).then((res) => {
            //console.log(res);
            if (res.data.isUserExist == false) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have no permission to register this app",
                footer: '<Link href="#">Contact Admin</Link>',
              });
            }

            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Success fully register",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      }
    );
  };

  //console.log(data, isLoading);
  return (
    <div className="border-2 shadow-cyan-200 shadow-md rounded-2xl">
      <form onSubmit={handleCreateUser} className="p-5">
        <div className="flex flex-col lg:flex-row items-center mb-2 justify-between gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              placeholder="full_Name"
              name="fullName"
              className="input input-bordered bg-transparent text-white border-white"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              name="email"
              className="input input-bordered bg-transparent text-white border-white"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center mb-2 justify-between gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="text"
              name="password"
              placeholder="password"
              className="input input-bordered bg-transparent text-white border-white"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Confirm Password</span>
            </label>
            <input
              type="text"
              name="confirmpassword"
              placeholder="Confirm password"
              className="input input-bordered bg-transparent text-white border-white"
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Image</span>
          </label>
          <input
            type="text"
            name="image"
            placeholder="image link"
            className="input input-bordered bg-transparent text-white border-white"
          />
        </div>
        {/* <div className="form-control w-full">
        <label className="label">
              <span className="label-text text-white">Image</span>
            </label>
            <input
              name="images"
              id="dropzone-file"
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
        </div> */}
        <div className="form-control mt-6">
          <button className="btn bg-[#00548E] hover:text-[#00548E] text-white shadow-md">
            Register <span></span>
          </button>
        </div>
        <p className="text-center mt-3 text-white">
          Already have an account ?{" "}
          <Link className="text-cyan-200" href="/sign-in">
            Login
          </Link>
        </p>
        <SignInWithGoogle></SignInWithGoogle>
      </form>
    </div>
  );
};

export default SignUp;
