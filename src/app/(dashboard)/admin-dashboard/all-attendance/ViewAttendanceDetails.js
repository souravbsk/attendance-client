import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import React from "react";
import profileImg from "@/assets/sourav.jpg";
import { HiMail } from "react-icons/hi";
import { SlPhone } from "react-icons/sl";
import { FaPhoneVolume } from "react-icons/fa";
import Link from "next/link";
import Map from "@/components/Map/Map";
import MyMap from "@/components/Map/Map";
const ViewAttendanceDetails = ({
  isAttendanceModal,
  setAttendanceModal,
  employeeDetails,
}) => {
  console.log(employeeDetails);
  const { user, trackingDetails } = employeeDetails;
  return (
    <Modal isOpen={isAttendanceModal} setIsOpen={setAttendanceModal}>
      <div className="flex gap-2">
        <div className="avatar  online">
          <div className="w-24 h-24 border rounded-full">
            <Image
              className=""
              src={user?.image}
              alt="profileImg"
              height={96}
              width={96}
            />
          </div>
        </div>
        <div>
          <span className="font-medium">{user?.employeeId}</span>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="font-medium">{user?.designation}</p>
          <div className="flex items-center gap-3 flex-col md:flex-row">
            <p className="flex gap-2 items-center">
              <span className="text-[#00548E]">
                <HiMail size={20}></HiMail>
              </span>{" "}
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </p>
            |
            <p className="flex gap-2 items-center">
              <span className="text-[#00548E]">
                <FaPhoneVolume size={20}></FaPhoneVolume>
              </span>{" "}
              <a href={`tel:${user?.phone}`}>{user?.phone}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <div className="divider"></div>
        <p>
          <span className="font-semibold">Provider Details: </span>
          {trackingDetails?.providerDetails?.as} -{" "}
          {trackingDetails?.providerDetails?.isp} -{" "}
          {trackingDetails?.providerDetails?.query}
        </p>
        <div className="divider"></div>
        <p>
          <span className="font-semibold">Location Details: </span>{" "}
          {trackingDetails?.addressDetails?.city} -{" "}
          {trackingDetails?.addressDetails?.county} -{" "}
          {trackingDetails?.addressDetails?.state_district} -{" "}
          {trackingDetails?.addressDetails?.postcode} -{" "}
          {trackingDetails?.addressDetails?.state} -{" "}
          {trackingDetails?.addressDetails?.country}
        </p>
        <div className="divider"></div>
      </div>
      <div>
        <MyMap
          center={[trackingDetails?.lat, trackingDetails?.lon]}
          zoom={15}
        ></MyMap>
        {/* <Map
          latitude={trackingDetails?.lat}
          longitude={trackingDetails?.lon}
          zoom={130}
        ></Map> */}
      </div>
    </Modal>
  );
};

export default ViewAttendanceDetails;
