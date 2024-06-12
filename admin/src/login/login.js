import { Link } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Files from "react-files";
import { makeLogin } from "./actions/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Label } from "recharts";
const Login = forwardRef((props, ref) => {
  const initialLoginData = {
    email: "",
    password: "",
    remember_login: false,
  };

  const [login_data, set_login_data] = React.useState(initialLoginData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = typeof value === "string" ? value.trim() : value;
    set_login_data({ ...login_data, [name]: trimmedValue });
  };
  // console.log(login_data);
  const [EditPassword, setEditPassword] = useState(false);

  const handleSubmitNewLoginCreateFunc = async () => {
    try {
      const config = {
        url: "https://api.cndplay.com/api/user/login",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          email: login_data.email,
          password: login_data.password,
          // remember_login: login_data.remember_login,
        },
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Logged in Successfully!");
        window.location.href = "/";
        // console.log(res.data);
        sessionStorage.setItem(
          "auth_response",
          JSON.stringify(initialLoginData)
        );
        window.location.href = "/dashboard";
      }
    } catch (error) {
      alert(error.response.data.error || "Unknown error occurred");
    }
  };
  const [Password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [ErroMessage, setErrorMessage] = useState("");

  const handleUpdate = async () => {
    try {
      if (Password !== CPassword) {
        setErrorMessage("Passwords not matching");
        return;
      }

      setErrorMessage("");

      const config = {
        // url: `https://api.cndplay.com/api/user/update/${useridd}`,
        headers: { "Content-Type": "application/json" },
        method: "put",
        data: { password: CPassword },
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Password updated successfully");
      } else {
        setErrorMessage("Unexpected response status");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Unknown error occurred");
      } else {
        alert("Network error or server is down");
      }
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row w-100 mx-0">
          {!EditPassword ? (
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3">
                  <div className="form-group d-flex search-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      size="lg"
                      className="form-control h-auto"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group d-flex search-field">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      size="lg"
                      className="form-control h-auto"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleSubmitNewLoginCreateFunc}
                    >
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    {/* <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="remember_login"
                        checked={isChecked}
                        onClick={handleCheckboxClick}
                      />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div> */}
                    {/* <a
                      onClick={() => setEditPassword(true)}
                      className="auth-link text-muted"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Create
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <form className="pt-3">
                  <div className="form-group d-flex search-field">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter new password"
                      size="lg"
                      value={Password}
                      className="form-control h-auto"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group d-flex search-field">
                    <input
                      type="password"
                      name="password"
                      placeholder="Confirm Password"
                      size="lg"
                      value={CPassword}
                      className="form-control h-auto"
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                  </div>
                  {ErroMessage && (
                    <div className="form-group">
                      <label className="text-danger">{ErroMessage}</label>
                    </div>
                  )}
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Login;
