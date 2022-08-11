import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  isEmailConfirmedSelector,
  isLoginSuccesfulSelector,
  tokenSelector,
} from "../../features/auth/services/authSlice";

const PrivateRoutes = ({ component }) => {
  const token = useSelector(tokenSelector);
  const isEmailConfirmed = useSelector(isEmailConfirmedSelector);
  const isLoginSuccessful = useSelector(isLoginSuccesfulSelector);
  if (token && isEmailConfirmed && isLoginSuccessful) {
    // console.log("abcs");
    return component;
  } else return <Navigate to="/auth" />;
};

export default PrivateRoutes;
