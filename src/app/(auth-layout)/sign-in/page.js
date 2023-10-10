"use client";
import React from "react";
import { loginUser } from "@/Redux/Features/userSlice/userSlice";
import SignInWithGoogle from "@/components/SignInWithGoogle/SignInWithGoogle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const { users, isLoading } = useSelector((state) => state?.userSlice);
  const router = useRouter();

  const dispatch = useDispatch();
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    dispatch(loginUser({ email, password })).then((response) => {
      if (response.payload) {
        router.push("/");
      }
    });
  };

  return (
    <div className="border-2 shadow-cyan-200 shadow-md rounded-2xl">
      <form onSubmit={handleSignIn} className="p-5">
        <div className="form-control">
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
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input
            type="text"
            placeholder="password"
            name="password"
            className="input input-bordered bg-transparent text-white border-white"
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn bg-[#00548E] hover:text-[#00548E] text-white shadow-md">
            Login
          </button>
        </div>
        <p className="text-center mt-3 text-white">
          are new here ?{" "}
          <Link className="text-cyan-200" href="/sign-up">
            Create an account
          </Link>
        </p>

        <SignInWithGoogle></SignInWithGoogle>
      </form>
    </div>
  );
};

export default SignIn;
