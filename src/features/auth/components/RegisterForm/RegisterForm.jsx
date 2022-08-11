import { faAt, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Row, Col } from "antd";
import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import "../../../../_animations.scss";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../services/authThunk";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    dispatch(registerThunk(values));
  };
  return (
    <div
      className="register-form"
      style={{ margin: "24px", animation: "fadeIn 1s" }}
    >
      <AuthForm onFinish={handleRegister} name="register-form">
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your username" },
            { whitespace: true },
          ]}
        >
          <Input
            placeholder="Username"
            prefix={<FontAwesomeIcon icon={faUser} />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email" },
            { whitespace: true },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email" prefix={<FontAwesomeIcon icon={faAt} />} />
        </Form.Item>
        <Row>
          <Col span={12} style={{ paddingRight: "5px" }}>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name" },
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: "5px" }}>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name" },
              ]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
        </Row>
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
          name="confirmPassword"
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
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
          >
            Register
          </Button>
        </Form.Item>
      </AuthForm>
    </div>
  );
};

export default RegisterForm;
