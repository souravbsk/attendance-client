"use client";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import React from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import profileImg from "@/assets/sourav.jpg";
import Skeleton from "@mui/material/Skeleton";

const ViewEmployee = ({ setViewModalIsOpen, isViewModalOpen, employee }) => {
  return (
    <Modal setIsOpen={setViewModalIsOpen} isOpen={isViewModalOpen}>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="avatar  online">
          <div className="w-24 h-24 border rounded-full">
            {employee?.image ? (
              <Image
                className=""
                src={employee?.image}
                alt="profileImg"
                height={96}
                width={96}
              />
            ) : (
              <Skeleton variant="circular" width={96} height={96} />
            )}
          </div>
        </div>
        <div className="text-center">
          {employee ? (
            <span className="font-medium">{employee?.employeeId}</span>
          ) : (
            <Skeleton />
          )}
          {employee ? (
            <h2 className="text-xl font-semibold">{employee?.name}</h2>
          ) : (
            <Skeleton />
          )}
          {employee ? (
            <p className="font-medium">{employee?.designation}</p>
          ) : (
            <Skeleton />
          )}

          <div className="flex items-center gap-3 flex-col md:flex-row">
            {employee ? (
              <p className="flex gap-2 items-center">
                <span className="text-[#00548E]">
                  <HiMail size={20}></HiMail>
                </span>{" "}
                <a href={`mailto:${employee?.email}`}>{employee?.email}</a>
              </p>
            ) : (
              <Skeleton />
            )}
            |
            {employee ? (
              <p className="flex gap-2 items-center">
                <span className="text-[#00548E]">
                  <FaPhoneVolume size={20}></FaPhoneVolume>
                </span>{" "}
                <a href={`tel:${employee?.phone}`}>{employee?.phone}</a>
              </p>
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewEmployee;
