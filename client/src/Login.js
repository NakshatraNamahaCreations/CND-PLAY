import { Link } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
import RegisterPage from "./DataApi/Register";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Login = forwardRef((props, ref) => {
  const [isChecked, setIsChecked] = useState(false);

  const initialLoginData = {
    username: "",
    password: "",
    remember_login: false,
  };

  const [login_data, set_login_data] = React.useState(initialLoginData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_login_data({ ...login_data, [name]: value });
  };

  const handleCheckboxClick = (event) => {
    const { name, value } = event.target;
    set_login_data({ ...login_data, [name]: !isChecked });
    setIsChecked(!isChecked);
  };
  const handleLogin = async () => {
    try {
      const response = await RegisterPage.Login(login_data);
      alert("Logged in Successfully!");

      localStorage.setItem(
        "auth_response",
        JSON.stringify(response.data.existingUser)
      );

      window.location.href = "/home";
    } catch (error) {
      console.error(error || "Unknown error occurred");
    }
  };

  return (
    <div className="w-100 bg-mg " style={{ height: "100vh" }}>
      <div className="container-fluid ">
        <div className="row w-100 mx-0 ">
          <div className="col-lg-4 mx-auto">
            <div
              className="card text-left py-5 px-4 px-sm-5 mt-5"
              style={{ backgroundColor: "#191c24" }}
            >
              <div className="brand-logo">
                {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
              </div>
              <h4 className="text_light">Hello! let's get started</h4>
              <h6 className="font-weight-light text-white">
                Sign in to continue.
              </h6>
              <form className="pt-3">
                <div className="form-group mb-3 d-flex search-field">
                  <input
                    type="email"
                    name="username" //2a3038
                    placeholder="Username"
                    size="lg"
                    className="form-control   h-auto"
                    value={login_data.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3 d-flex search-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    size="lg"
                    className="form-control h-auto"
                    value={login_data.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3 row m-auto">
                  <button
                    type="button"
                    className="btn row  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleLogin}
                  >
                    SIGN IN
                  </button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted ">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="remember_login"
                        checked={isChecked}
                        onClick={handleCheckboxClick}
                      />
                      <i className="input-helper"></i>

                      <span className="text_light">Keep me signed in</span>
                    </label>
                  </div>
                  <a
                    href="!#"
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-muted "
                  >
                    <span className="text_light"> Forgot password?</span>
                  </a>
                </div>
                <div className="text-center mt-4 font-weight-light text_light">
                  Don't have an account?{" "}
                  <Link to="/Register" className="text-primary">
                    Create
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
