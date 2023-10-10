"use client";
import { useFetchJWTMutation } from "@/Redux/Features/userSlice/userApi";
import { setLoading, setUser } from "@/Redux/Features/userSlice/userSlice";
import auth from "@/Utils/firebase.init";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state?.userSlice);
  const [sendLoggedUser, { data, isLoading: isJwtLoading, isError, error }] =
    useFetchJWTMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const newUser = {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };

        dispatch(setUser(newUser));
        dispatch(setLoading(false));
        const loggedUser = {
          email: currentUser.email,
        };

        sendLoggedUser(loggedUser).then((res) => {
          const token = res?.data?.token;
          Cookies.set("employee-access-token", token, { expires: 7 });
        });
      } else {
        Cookies.remove("employee-access-token");
        dispatch(setLoading(false));
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    //console.log("object");
    return <div>Loading..........</div>;
  }
  console.log(user);
  if (user) {
    return <>{children}</>;
  }

  return router.push("/auth");
};

export default PrivateRoute;
