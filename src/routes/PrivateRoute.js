"use client";
import React, { useEffect } from "react";
import { useFetchJWTMutation } from "@/Redux/Features/userSlice/userApi";
import { setLoading, setUser } from "@/Redux/Features/userSlice/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import app from "@/Utils/firebase.init";
const PrivateRoute = ({ children }) => {
  const auth = getAuth(app); // Initialize Auth
  const { user, isLoading } = useSelector((state) => state?.userSlice);
  const [sendLoggedUser, { data, isLoading: isJwtLoading, isError, error }] =
    useFetchJWTMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const newUser = {
          email: currentUser?.email,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
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
  }, [auth, dispatch, sendLoggedUser]);

  if (isLoading) {
    return <div>Loading..........</div>;
  }

  if (user) {
    return <>{children}</>;
  }

  return router.push("/auth");
};

export default PrivateRoute;
