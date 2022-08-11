import React, { useEffect } from "react";
import "./AuthContainer.scss";
import { useNavigate } from "react-router-dom";
import { tokenSelector } from "../../services/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const AuthContainer = ({ children }) => {
  const navigate = useNavigate();

  const token = useSelector(tokenSelector);

  return (
    <div className="auth-page">
      <div className="main-container">
        <FontAwesomeIcon icon={faCommentDots} className="logo-icon" />
        <div className="page-title">Login to chat right now</div>
        <div style={{ width: "100vw" }}>{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
