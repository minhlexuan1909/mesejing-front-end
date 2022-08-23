import { Button, Form, Input } from "antd";
import React from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  authAction,
  emailOrUsernameSelector,
  isConfirmOtpSelector,
  isForgetOtpConfirmedSelector,
  isForgetPassSelector,
} from "../../services/authSlice";
import {
  confirmEmailThunk,
  confirmEmailPasswordThunk,
} from "../../services/authThunk";
import AuthForm from "../AuthForm/AuthForm";

const OtpForm = () => {
  const dispatch = useDispatch();

  const emailOrUsername = useSelector(emailOrUsernameSelector);
  const isForgetPass = useSelector(isForgetPassSelector);
  const isConfirmOtp = useSelector(isConfirmOtpSelector);

  const handleOtp = (values) => {
    if (isForgetPass) {
      // Confirm OTP to reset password
      const data = { ...values, emailOrUsername };
      dispatch(confirmEmailPasswordThunk(data));
    } else {
      // Confirm OTP to confirm email
      const data = { ...values, emailOrUsername };
      dispatch(confirmEmailThunk(data));
    }
  };

  return (
    <AuthForm onFinish={handleOtp} name="otp-form">
      <Form.Item
        name="otp"
        rules={[{ required: true, message: "This feild must be filled" }]}
      >
        <Input placeholder="Type your OTP" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          size="large"
          disabled={isConfirmOtp}
        >
          {isConfirmOtp ? <CircularProgress height="100%" /> : "Send"}
        </Button>
      </Form.Item>
    </AuthForm>
  );
};

export default OtpForm;
