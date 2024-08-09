import React, { useState } from "react";
import "./PasswordStrength.css";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState("yellow");
  const [charCount, setCharCount] = useState(0);
  const [indicators, setIndicators] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
  });

  const checkPasswordStrength = (password) => {
    const newIndicators = {
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setIndicators(newIndicators);

    const strengthScore = Object.values(newIndicators).filter(Boolean).length;

    const charLength = password.length;
    setCharCount(charLength);

    let progress = 0;
    let strengthText = "Weak";
    let progressColor = "yellow";

    if (charLength > 0) progress = (charLength / 4) * 25;
    if (strengthScore === 1) progress = Math.min(progress + 20, 40);
    if (strengthScore === 2) progress = Math.min(progress + 30, 60);
    if (strengthScore === 3) progress = Math.min(progress + 50, 80);
    if (strengthScore === 4) progress = 100;

    if (progress >= 80) {
      strengthText = "Very Strong";
      progressColor = "red";
    } else if (progress >= 60) {
      strengthText = "Strong";
      progressColor = "green";
    } else if (progress >= 40) {
      strengthText = "Average";
      progressColor = "blue";
    } else if (progress > 0) {
      strengthText = "Weak";
      progressColor = "yellow";
    }

    setProgress(progress);
    setStrength(strengthText);
    setProgressColor(progressColor);
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  return (
    <div className="password-strength">
      <h1>Password Strength Checker</h1>
      <input
        type="password"
        id="passwordInput"
        placeholder="Enter your password"
        value={password}
        onChange={handleChange}
      />
      <div className="strength-indicators">
        <p id="charCount">Password has {charCount} chars</p>
        <p id="strengthMessage">
          Strength: <span id="strength">{strength}</span>
        </p>
        <div className="indicators">
          <p
            className={`indicator ${indicators.lowercase ? "active" : ""}`}
            id="lowercase"
          >
            Lowercase
          </p>
          <p
            className={`indicator ${indicators.uppercase ? "active" : ""}`}
            id="uppercase"
          >
            Uppercase
          </p>
          <p
            className={`indicator ${indicators.number ? "active" : ""}`}
            id="number"
          >
            Number
          </p>
          <p
            className={`indicator ${indicators.symbol ? "active" : ""}`}
            id="symbol"
          >
            Symbol
          </p>
        </div>
        <div className="progress-bar">
          <div
            id="progress"
            style={{ width: `${progress}%`, backgroundColor: progressColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
