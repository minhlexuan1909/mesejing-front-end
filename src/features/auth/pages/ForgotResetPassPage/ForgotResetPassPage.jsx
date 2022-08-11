import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import ForgotPassForm from "../../components/ForgotPassForm/ForgotPassForm";
import ForgotResetPassForm from "../../components/ForgotResetPassForm/ForgotResetPassForm";
import {
  isForgetOtpConfirmedSelector,
  isForgetPassSelector,
} from "../../services/authSlice";

const ForgotResetPassPage = () => {
  const navigate = useNavigate();

  const isForgetOtpConfirmed = useSelector(isForgetOtpConfirmedSelector);
  const isForgetPass = useSelector(isForgetPassSelector);

  useEffect(() => {
    if (!isForgetPass || !isForgetOtpConfirmed) {
      navigate("/auth");
    }
  }, [isForgetOtpConfirmed, isForgetPass]);

  return (
    <AuthContainer>
      <div className="slide-wrapper">
        <div className="auth-container container">
          <div className="forgot-container container">
            <div className="forgot-password">
              <h1 className="title">Reset your password</h1>
              <div className="text">
                Please enter your new password and confirm it
              </div>
              <ForgotResetPassForm />
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default ForgotResetPassPage;
