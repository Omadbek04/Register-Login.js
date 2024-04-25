import React, { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "../api/axios";

const useLogut = () => {
  const { setAuth } = useAuth();

  const logOut = async () => {
    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
      setAuth({});
    } catch (error) {
      console.log(error);
    }
  };

  return logOut;
};

export default useLogut;
