"use client";
import Button from "@/components/Button/Button";
import Day from "@/components/Day/Day";
import useRealTime from "@/Hooks/useRealTime";
import StartEndTime from "@/components/StartEndTime/StartEndTime";
import React, { memo, useEffect, useState } from "react";
import FormatTimeWorked from "@/components/FormateTimeWorked/FormatTimeWorked";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTime,
  setStartTimeFromLocal,
  setWorkTime,
  setStartTime,
  setFinishTimeFromLocal,
} from "@/Redux/Features/Times/timeSlice";
import { fetchTracker } from "@/Redux/Features/trackerSlice/trackerSlice";
import axios from "axios";
import moment from "moment";
import {
  useAddStartTimeMutation,
  useUpdateFinishedDataMutation,
} from "@/Redux/Features/Times/AttendanceTimeApi";
import Swal from "sweetalert2";
import useWorkTime from "@/Hooks/useWorkTime";

const Home = () => {
  const { currentTime } = useRealTime();

  // time slice data________________________
  const {
    isBtnStartDisable,
    isBtnEndDisable,
    startTime,
    workTime,
    startInsertId,
  } = useSelector((store) => store.timesSlice);

  // user slice data_____________________________________
  const { user } = useSelector((state) => state?.userSlice);
  const {
    isLoading: isTrackerLoading,
    isError: isTrackerError,
    error: TrackerError,
    address,
  } = useSelector((store) => store.trackerSlice);
  const [addStartTime, { data, isError, isLoading: isStartLoading }] =
    useAddStartTimeMutation();

  const [updateFinishedData, { isLoading: isFinishLoading }] =
    useUpdateFinishedDataMutation();

  const dispatch = useDispatch();

  const { seconds, hours, minutes, remainingSeconds } =
    FormatTimeWorked(workTime);

  //work time
  useWorkTime();

  useEffect(() => {
    dispatch(setStartTimeFromLocal());
  }, [dispatch]);

  //start button

  const handleStartButton = () => {
    dispatch(fetchTracker())
      .then(({ payload }) => {
        console.log("payload", payload);
        if (payload) {
          const todayDay = moment(currentTime.getTime()).format("dddd");
          const todayStartTime = moment(currentTime.getTime()).format("LTS");
          const NewstartTime = {
            date: currentTime.getTime(),
            day: todayDay,
            startTime: todayStartTime,
            trackingDetails: payload,
            endTime: "",
            totalWork: "",
            email: user?.email,
          };

          addStartTime(NewstartTime).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work time start",
                showConfirmButton: false,
                timer: 1500,
              });

              // insertId
              const insertId = res.data.insertedId;
              dispatch(
                setStartTime({
                  time: currentTime.getTime(),
                  startBtn: true,
                  endBtn: false,
                  startInsertId: insertId,
                })
              );
            }
          });
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error.message);
      });
  };

  //finish button
  const handleFinishButton = () => {
    const todayEndTime = moment(currentTime.getTime()).format("LTS");

    Swal.fire({
      title: "Are you sure?",
      text: "You wan't exist right now",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Exist",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateFinisTimeData = {
          endTime: todayEndTime,
          totalWork: workTime,
        };

        updateFinishedData({ updateFinisTimeData, startInsertId }).then(
          (res) => {
            console.log(res.data);
            if (res.data.matchedCount > 0 && res.data.modifiedCount > 0) {
              dispatch(setFinishTimeFromLocal());
              Swal.fire("Good Bye", "See you tomorrow", "success");
            }
          }
        );
      }
    });
  };
  return (
    <main className="container">
      <div className="mt-12">
        <h2 className="text-center text-2xl text-white font-semibold">
          Automatic Time Tracking
        </h2>
        <Day></Day>
        <StartEndTime
          startTime={startTime}
          currentTime={currentTime}
        ></StartEndTime>

        <div className="mt-12">
          <h3 className="text-center font-semibold underline text-white text-3xl mb-5">
            Working Hours
          </h3>

          <div className="flex items-center justify-center">
            <div className="text-2xl bg-white rounded-lg text-[#0D64A5] shadow-lg px-4 py-4 font-bold font-mono">
              {String(hours).padStart(2, "0")}
            </div>
            <div className="text-2xl  rounded-lg text-white shadow-lg px-2 py-4 font-bold font-mono">
              :
            </div>
            <div className="text-2xl bg-white rounded-lg text-[#0D64A5] shadow-lg px-4 py-4 font-bold font-mono">
              {String(minutes).padStart(2, "0")}
            </div>
            <div className="text-2xl  rounded-lg text-white shadow-lg px-2 py-4 font-bold font-mono">
              :
            </div>
            <div className="text-2xl bg-white rounded-lg text-[#0D64A5] shadow-lg px-4 py-4 font-bold font-mono">
              {String(remainingSeconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
      <div className=" my-20 mx-auto px-4 py-20 text-black w-11/12 md:w-6/12 bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <Button
            isBtnDisable={isBtnStartDisable}
            handleButton={handleStartButton}
            text="Start"
          ></Button>
          {(isTrackerLoading || isStartLoading) && "loading"}
          <Button
            isBtnDisable={isBtnEndDisable}
            handleButton={handleFinishButton}
            text="Stop"
          ></Button>
        </div>
        {isTrackerError && TrackerError?.message}
      </div>
    </main>
  );
};

export default React.memo(Home);

//
