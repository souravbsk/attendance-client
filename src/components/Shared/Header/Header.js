"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import userImage from "@/assets/sourav.jpg";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { setLogOut } from "@/Redux/Features/userSlice/userSlice";
import { useRouter } from "next/navigation";
import app from "@/Utils/firebase.init";
import { useGetIsAdminQuery } from "@/Redux/Features/api/AdminApi/IsAdminApi";
import { AiFillDashboard } from "react-icons/ai";
const auth = getAuth(app);
const Header = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isLoading } = useGetIsAdminQuery(user && user?.email);

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

  console.log(data, "is admin");

  return (
    <header className="bg-[#0D64A5]">
      <div className="flex  items-center container justify-between gap-3 py-4 ">
        <div className="flex-1">
          <Link href="/" className="text-white font-semibold md:text-3xl">
            B & V
          </Link>
        </div>
        <ul className="flex items-center gap-3 md:gap-6">
          <li>
            <Link
              className="text-2xl text-white font-semibold "
              href="/my-records"
            >
              <FaHistory></FaHistory>
            </Link>
          </li>
          {data && data?.admin ? (
            <li className="text-white">
              <Link href="https://attendance-tracker-client.vercel.app/admin-dashboard/dashboard">
                <AiFillDashboard size={26}></AiFillDashboard>
              </Link>
            </li>
          ) : (
            ""
          )}
          <li>
            {user?.photoURL ? (
              <Image
                className="w-12 h-12 rounded-full ring-4"
                src={user?.photoURL}
                alt="userImage"
                width={48}
                height={48}
              ></Image>
            ) : (
              user?.email
            )}
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
