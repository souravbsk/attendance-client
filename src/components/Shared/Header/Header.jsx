"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import userImage from "@/assets/sourav.jpg";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { setLogOut } from "@/Redux/Features/userSlice/userSlice";
import auth from "@/Utils/firebase.init";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        //console.log("fsfsdfsdfsA");
        router.push("/auth");

        dispatch(setLogOut());
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header className="bg-[#0D64A5]">
      <div className="flex  items-center container justify-between gap-3 py-4 ">
        <div className="flex-1">
          <Link href="/" className="text-white font-semibold text-3xl">
            B & V
          </Link>
        </div>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              className="text-2xl text-white font-semibold "
              href="/my-records"
            >
              <FaHistory></FaHistory>
            </Link>
          </li>
          <li>
            <Image
              className="w-12 h-12 rounded-full ring-4"
              src={user?.photoURL}
              alt="userImage"
              width={48}
              height={48}
            ></Image>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="px-6 rounded-full  text-white font-semibold shadow-xl py-2 bg-[#055B97]"
            >
              <FiLogOut></FiLogOut>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
