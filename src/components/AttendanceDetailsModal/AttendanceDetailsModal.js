import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Loader from "../Loader/Loader";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { HiMail } from "react-icons/hi";
import { FaPhoneVolume } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { useEffect } from "react";
import Link from "next/link";

const AttendanceDetailsModal = ({ open, setOpen, viewDetails }) => {
  const handleClose = () => setOpen(false);
  console.log(viewDetails);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (viewDetails?.trackingDetails) {
      const map = `https://www.google.com/maps/@${viewDetails?.trackingDetails?.lat},${viewDetails?.trackingDetails?.lon},20z?entry=ttu`;
      setMapUrl(map);
    }
  }, [viewDetails]);

  console.log(viewDetails);

  return (
    <>
      {viewDetails && (
        <Modal setIsOpen={setOpen} isOpen={open}>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="avatar  online">
              <div className="w-24 h-24 border rounded-full">
                {viewDetails?.employeeDetails?.image ? (
                  <Image
                    className=""
                    src={viewDetails?.employeeDetails?.image}
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
              {viewDetails ? (
                <span className="font-medium">
                  {viewDetails?.employeeDetails?.employeeId}
                </span>
              ) : (
                <Skeleton />
              )}
              {viewDetails ? (
                <h2 className="text-xl font-semibold">
                  {viewDetails?.employeeDetails?.name}
                </h2>
              ) : (
                <Skeleton />
              )}
              {viewDetails ? (
                <p className="font-medium">
                  {viewDetails?.employeeDetails?.designation}
                </p>
              ) : (
                <Skeleton />
              )}

              <div className="flex items-center gap-3 flex-col md:flex-row">
                {viewDetails ? (
                  <p className="flex gap-2 items-center">
                    <span className="text-[#00548E]">
                      <HiMail size={20}></HiMail>
                    </span>{" "}
                    <a href={`mailto:${viewDetails?.employeeDetails?.email}`}>
                      {viewDetails?.employeeDetails?.email}
                    </a>
                  </p>
                ) : (
                  <Skeleton />
                )}
                |
                {viewDetails ? (
                  <p className="flex gap-2 items-center">
                    <span className="text-[#00548E]">
                      <FaPhoneVolume size={20}></FaPhoneVolume>
                    </span>{" "}
                    <a href={`tel:${viewDetails?.employeeDetails?.phone}`}>
                      {viewDetails?.employeeDetails?.phone}
                    </a>
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </div>
          <div className="divider"></div>

          <div className="mt-5 space-y-3">
            <p>
              <span className="font-semibold text-lg text-[#00548E] ">
                Address:
              </span>{" "}
              {viewDetails?.trackingDetails?.addressDetails?.city},{" "}
              {viewDetails?.trackingDetails?.addressDetails?.county},{" "}
              {viewDetails?.trackingDetails?.addressDetails?.state_district},{" "}
              {viewDetails?.trackingDetails?.addressDetails?.state},{" "}
              {viewDetails?.trackingDetails?.addressDetails?.postcode},{" "}
              {viewDetails?.trackingDetails?.addressDetails?.country}
            </p>
            <div className="divider"></div>
            <p>
              <span className="font-semibold text-lg text-[#00548E] ">
                Ip Provider:
              </span>{" "}
              {viewDetails?.trackingDetails?.providerDetails?.query},{" "}
              {viewDetails?.trackingDetails?.providerDetails?.as},{" "}
              {viewDetails?.trackingDetails?.providerDetails?.isp},{" "}
              {viewDetails?.trackingDetails?.providerDetails?.state},{" "}
              {viewDetails?.trackingDetails?.providerDetails?.org},{" "}
            </p>
          </div>
          <div className="divider"></div>
          <div>
            <h1>Map:</h1>
            <Link target="_blankF" href={mapUrl}>
              {mapUrl}
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AttendanceDetailsModal;
