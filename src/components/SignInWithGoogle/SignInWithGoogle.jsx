import React from "react";
import {FcGoogle} from "react-icons/fc"
const SignInWithGoogle = () => {
  return (
    <div>
      <div className="divider text-white md:px-8 before:bg-white after:bg-white">OR</div>
      <div className="text-center">
        <button className="border-2 rounded-full px-2 py-2 bg-[#112a3bc2]"><FcGoogle size={36}></FcGoogle></button>
      </div>
    </div>
  );
};

export default SignInWithGoogle;
