import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthContainer from "../../components/AuthContainer/AuthContainer";
import OtpForm from "../../components/OtpForm/OtpForm";
import {
  isEmailConfirmedSelector,
  emailOrUsernameSelector,
  authAction,
  isForgetPassSelector,
  isForgetOtpConfirmedSelector,
} from "../../services/authSlice";
import {
  resendOtpEmailThunk,
  resendOtpPasswordThunk,
} from "../../services/authThunk";

const OtpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const isEmailConfirmed = useSelector(isEmailConfirmedSelector);
  const emailOrUsername = useSelector(emailOrUsernameSelector);
  const isForgetPass = useSelector(isForgetPassSelector);
  const isForgetOtpConfirmed = useSelector(isForgetOtpConfirmedSelector);
  const isEmailConfirmed = useSelector(isEmailConfirmedSelector);

  const handleOnClick = () => {
    dispatch(authAction.removeEmailOrUsername());
    dispatch(authAction.setIsEmailConfirmed(null));
    dispatch(authAction.setIsForgetPass(false));
    dispatch(authAction.setIsForgetOtpConfirmed(false));
  };

  const handleResendOtp = () => {
    if (isForgetPass) {
      dispatch(resendOtpPasswordThunk({ emailOrUsername }));
    } else {
      dispatch(resendOtpEmailThunk({ emailOrUsername }));
    }
  };
  useEffect(() => {
    if (emailOrUsername === null && isForgetPass === false) {
      navigate("/auth");
    }
  }, [emailOrUsername, isForgetPass, navigate]);

  useEffect(() => {
    if (isForgetOtpConfirmed && isForgetPass) {
      navigate("/reset-password");
    }
  }, [isForgetOtpConfirmed, isForgetPass]);

  useEffect(() => {
    if (isForgetPass) {
      dispatch(resendOtpPasswordThunk({ emailOrUsername }));
    } else {
      dispatch(resendOtpEmailThunk({ emailOrUsername }));
    }
  }, [isForgetPass]);

  useEffect(() => {
    if (isEmailConfirmed) {
      navigate("/auth");
    }
  }, [isEmailConfirmed]);

  return (
    <AuthContainer>
      <div className="slide-wrapper">
        <div className="forgot-container container">
          <div className="forgot-password">
            <h1 className="title">
              {isForgetPass ? "Reset your password" : "Confirm your email"}
            </h1>
            <div className="text">
              Enter the OTP that we sent you through your email and submit
            </div>
            <OtpForm />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              <div
                className=""
                style={{
                  justifyContent: "center",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginRight: "15px",
                }}
                onClick={handleOnClick}
              >
                Back to login
              </div>
              <div onClick={handleResendOtp}>Resend OTP</div>
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default OtpPage;
