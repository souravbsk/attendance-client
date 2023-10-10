"use client";
import React, { useState } from "react";
import SignIn from "../sign-in/page";
import SignUp from "../sign-up/page";

const AuthUsers = () => {
  const [isSignIn, setSignIn] = useState(true);
  return (
    <div>
      <div className="flex py-3 rounded-xl items-center gap-5 justify-center">
        <button
          onClick={() => setSignIn(true)}
          className={` font-semibold  border-2 rounded-md py-2 px-8 ${
            isSignIn ? "bg-white text-[#00548E]" : "text-white "
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setSignIn(false)}
          className={` font-semibold  border-2 rounded-md py-2 px-8 ${
            isSignIn ? "text-white" : " bg-white text-[#00548E]"
          }`}
        >
          Register
        </button>
      </div>
      {isSignIn ? <SignIn></SignIn> : <SignUp></SignUp>}
    </div>
  );
};

export default AuthUsers;
