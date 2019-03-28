import React from "react";
import "./error-indicator.css";
import icon from "./death-star.png";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="erroricon" />
      <span className="boom">Произошла ошибка</span>
      <span>Перезагрузите страницу</span>
    </div>
  );
};

export default ErrorIndicator;
