import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signUp, login } from "../../config/firebase";
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currentState === "Sign Up") {
      signUp(userName, email, password);
    } else {
      login(email, password);
    }
  };
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
        className="login-form"
      >
        <h2>{currentState}</h2>
        {currentState === "Sign Up" ? (
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          placeholder="Email Adrdress"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="form-input"
          required
        />
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>I Agree to the terms of use and privacy policy</p>
        </div>
        <div className="login-forgot">
          {currentState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                }}
              >
                Login here
              </span>{" "}
            </p>
          ) : (
            <p className="login-toggle">
              Create an account{" "}
              <span
                onClick={() => {
                  setCurrentState("Sign Up");
                }}
              >
                Click here
              </span>{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
