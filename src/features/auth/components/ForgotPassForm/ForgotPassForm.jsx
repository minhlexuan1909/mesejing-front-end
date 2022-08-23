import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authAction,
  isForgetPassSelector,
  isResetPasswordSelector,
} from "../../services/authSlice";
import { forgotPasswordThunk } from "../../services/authThunk";
import AuthForm from "../AuthForm/AuthForm";

const ForgotPassForm = ({ goTo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isForgetPass = useSelector(isForgetPassSelector);
  const isResetPassword = useSelector(isResetPasswordSelector);

  useEffect(() => {
    if (isForgetPass) {
      navigate("/otp");
    }
  }, [isForgetPass]);

  const handleForgot = (values) => {
    dispatch(forgotPasswordThunk(values));
  };
  const handleBackToLogin = () => {
    dispatch(authAction.setIsForgetPass(false));
    dispatch(authAction.setIsForgetOtpConfirmed(false));
    goTo(0);
  };
  return (
    <div className="forgot-password-form">
      <AuthForm onFinish={handleForgot} name="forgot-form">
        <Form.Item
          name="emailOrUsername"
          rules={[
            { required: true, message: "Please input your email" },
            { whitespace: true },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            placeholder="Email"
            type="email"
            prefix={<FontAwesomeIcon icon={faAt} />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
            disabled={isResetPassword}
            // onClick={handleForgot}
          >
            {isResetPassword ? <CircularProgress height="100%" /> : "Send"}
          </Button>
        </Form.Item>
      </AuthForm>
      <div
        className="back-to-login-btn"
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={handleBackToLogin}
      >
        Back to login
      </div>
    </div>
  );
};

export default ForgotPassForm;
