import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authAction,
  emailOrUsernameSelector,
  isChangingPasswordSelector,
  isForgetPassSelector,
} from "../../services/authSlice";
import {
  confirmEmailPasswordThunk,
  resetPassword,
} from "../../services/authThunk";
import AuthForm from "../AuthForm/AuthForm";

const ForgotResetPassForm = () => {
  const dispatch = useDispatch();

  const emailOrUsername = useSelector(emailOrUsernameSelector);
  const isChangingPassword = useSelector(isChangingPasswordSelector);

  const handleResetPass = (values) => {
    const data = { ...values, emailOrUsername };
    dispatch(resetPassword(data));
  };

  return (
    <AuthForm onFinish={handleResetPass}>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input.Password
          placeholder="Password"
          prefix={<FontAwesomeIcon icon={faLock} />}
        />
      </Form.Item>
      <Form.Item
        // name="confirmPassword"
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              } else
                return Promise.reject(
                  new Error("Confirm password does not match")
                );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm Password"
          prefix={<FontAwesomeIcon icon={faLock} />}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          size="large"
          disabled={isChangingPassword}
        >
          {isChangingPassword ? <CircularProgress height="100%" /> : "Save"}
        </Button>
      </Form.Item>
    </AuthForm>
  );
};

export default ForgotResetPassForm;
