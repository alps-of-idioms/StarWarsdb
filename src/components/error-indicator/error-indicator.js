import React from "react";
import "./error-indicator.css";
import icon from "./mark_engineer.jpg";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="erroricon" />
      <span className="boom">БУМ-ЕБАНА!</span>
      <span>Преступник найден</span>
      <span>Предьявите вашу сишку!</span>
    </div>
  );
};

export default ErrorIndicator;
