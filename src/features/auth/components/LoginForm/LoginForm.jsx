import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../services/authThunk";

import AuthForm from "../AuthForm/AuthForm";

const LoginForm = ({ goTo }) => {
  const dispatch = useDispatch();
  const handleLogin = (values) => {
    dispatch(loginThunk(values));
  };

  return (
    <div
      className="login-form"
      style={{ margin: "24px", animation: "fadeIn 0.5s" }}
    >
      <AuthForm onFinish={handleLogin} name="login-form">
        <Form.Item
          name="emailOrUsername"
          rules={[
            { required: true, message: "Please input your username or email" },
          ]}
        >
          <Input
            placeholder="Username"
            prefix={<FontAwesomeIcon icon={faUser} />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<FontAwesomeIcon icon={faLock} />}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
          >
            Login
          </Button>
        </Form.Item>
      </AuthForm>
      <div
        className="forgot-password-btn"
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => goTo(1)}
      >
        Forgot your password?
      </div>
    </div>
  );
};

export default LoginForm;
