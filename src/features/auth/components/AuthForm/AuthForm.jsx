import React from "react";
import { Form } from "antd";

const AuthForm = ({ children, onFinish, name }) => {
  return (
    <Form
      onFinish={onFinish}
      name={name}
      // labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
    >
      {children}
    </Form>
  );
};

export default AuthForm;
