import "./AuthPage.scss";

import { Carousel, Tabs } from "antd";
import React, { useEffect, useRef } from "react";

import AuthContainer from "../../components/AuthContainer/AuthContainer";
import ForgotPassForm from "../../components/ForgotPassForm/ForgotPassForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import {
  authAction,
  isEmailConfirmedSelector,
  isLoginSuccesfulSelector,
  tokenSelector,
} from "../../services/authSlice";
import { useNavigate } from "react-router-dom";
import { getMeThunk } from "../../services/authThunk";

const { TabPane } = Tabs;
const AuthPage = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(tokenSelector);
  const isEmailConfirmed = useSelector(isEmailConfirmedSelector);
  const isLoginSuccessful = useSelector(isLoginSuccesfulSelector);

  const carouselRef = useRef();
  const goTo = (slide) => {
    carouselRef.current.goTo(slide, false);
  };
  useEffect(() => {
    if (token) {
      dispatch(getMeThunk(token));
    }
  }, [token]);
  useEffect(() => {
    if (token && isEmailConfirmed && isLoginSuccessful) {
      navigate("/chat");
    }
  }, [token, isEmailConfirmed, isLoginSuccessful]);
  useEffect(() => {
    if (isEmailConfirmed === false) {
      navigate("/otp");
    }
  }, [isEmailConfirmed, navigate]);

  return (
    <AuthContainer>
      <Carousel infinite={false} ref={carouselRef} dots={false}>
        <div className="slide-wrapper">
          <div className="auth-container container">
            <Tabs defaultActiveKey="1" centered type="card" size="large">
              <TabPane tab="Login" key="1">
                <LoginForm goTo={goTo} />
              </TabPane>
              <TabPane tab="Register" key="2">
                <RegisterForm />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="slide-wrapper">
          <div className="forgot-container container">
            <div className="forgot-password">
              <h1 className="title">Reset Password</h1>
              <div className="text">
                Enter the email associated with your account and we'll send an
                email...
              </div>
              <ForgotPassForm goTo={goTo} />
            </div>
          </div>
        </div>
      </Carousel>
    </AuthContainer>
  );
};

export default AuthPage;
