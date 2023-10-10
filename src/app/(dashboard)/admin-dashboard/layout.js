"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsPersonPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { BiHistory } from "react-icons/bi";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
const DashboardLayout = ({ children }) => {
  const [isNavTextShow, setNavTextShow] = useState(true);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full overflow-hidden min-h-screen">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <div className=" bg-base-200 p-5 min-h-screen">{children}</div>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="min-h-full relative bg-[#00548E] flex flex-col justify-between">
          <ul className="flex flex-col gap-6 py-8 px-10  text-white">
            {/* Sidebar content here */}
            <li className="text-lg font-medium font-mono">
              <Link
                className="text-center block font-semibold text-2xl"
                href="/"
              >
                {" "}
                B&V
              </Link>
            </li>
            <li className="text-lg font-medium font-mono">
              <Link className="flex duration-300 items-center gap-3" href="/admin-dashboard/dashboard">
                <AiOutlineDashboard size={26}></AiOutlineDashboard>{" "}
                {isNavTextShow && "Dashboard"}
              </Link>
            </li>
            <li className="text-lg font-medium font-mono">
              <Link className="flex duration-300 items-center gap-3" href="/admin-dashboard/add-employee">
                <BsPersonPlus size={26}></BsPersonPlus>{" "}
                {isNavTextShow && "Add Employee"}
              </Link>
            </li>
            <li className="text-lg font-medium font-mono">
              <Link className="flex duration-300 items-center gap-3" href="/admin-dashboard/all-employee">
                <PiUsersThree size={26}></PiUsersThree>{" "}
                {isNavTextShow && "All Employee"}
              </Link>
            </li>
            <li className="text-lg font-medium font-mono">
              <Link className="flex duration-300 items-center gap-3" href="/admin-dashboard/all-attendance">
                <BiHistory size={26}></BiHistory>{" "}
                {isNavTextShow && "All Attendance"}
              </Link>
            </li>
          </ul>
          <div className="py-4 text-center">
            <button
              onClick={() => setNavTextShow(!isNavTextShow)}
              className="bg-[#0D64A5] px-4 text-white rounded-full py-4"
            >
              {isNavTextShow ? (
                <IoMdArrowDropleftCircle size={23}></IoMdArrowDropleftCircle>
              ) : (
                <IoMdArrowDroprightCircle size={23}></IoMdArrowDroprightCircle>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
