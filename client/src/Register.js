import { Link } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
// import httpCommonFunction from "../http-common.function";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  // const REACT_API = process.env.REACT_APP_API_URL;
  const [isChecked, setIsChecked] = useState(false);
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpas, setconfirmpas] = useState("");

  const initialRegisterData = {
    ch_id: "1",
    full_name: fullname,
    username: username,
    password: password,
    confirm_password: confirmpas,
    agree_terms: false,
    country_code: "",
    phone: "",
    email: "",
    date_of_birth: "",
    gender: "",
    notification_token: "",
    profile_picture: "",
    agree_terms: "",
    fieldCount: "",
    insertId: "",
    message: "",
    serverStatus: "",
    warningCount: "",
    plan: "",
    firebase_id: "",
    continueWatching: "",
    purchasedcontent: "",
    Myrating: "",
    accountCompleted: "",
    avatar: "",
    createdOn: "",
    district: "",
    lastLogin: "",
    messageToken: "",
    watchingNow: "",
    wishlist: "",
  };
  const [register_data, set_register_data] =
    React.useState(initialRegisterData);

  const handleCheckboxClick = (event) => {
    const { name, value } = event.target;
    set_register_data({ ...register_data, [name]: !isChecked });
    setIsChecked(!isChecked);
  };

  const handleRegister = async () => {
    try {
      const config = {
        url: "http://localhost:8081/api/authenticateRoute/makeregister",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: initialRegisterData,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("Sign Up Successful!");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-100 bg-mg " style={{ height: "100vh" }}>
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div
            className="card text-left py-3 px-4 px-sm-5 mt-3"
            style={{ backgroundColor: "#191c24" }}
          >
            <div className="brand-logo"></div>
            <h4 className="text_light">New here?</h4>
            <h6 className="font-weight-light text_light">
              Signing up is easy. It only takes a few steps
            </h6>
            <form className="pt-3 ">
              <div className="form-group mt-2">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="full_name"
                  name="full_name"
                  placeholder="Full Name"
                  onChange={(e) => setfullname(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setusername(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={(e) => setconfirmpas(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="agree_terms"
                      checked={isChecked}
                      onClick={handleCheckboxClick}
                    />
                    <i className="input-helper"></i>
                    <span className="text_light">
                      {" "}
                      I agree to all Terms & Conditions
                    </span>
                  </label>
                </div>
              </div>
              <div className="mt-3 row m-auto">
                <button
                  className="btn row  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={handleRegister}
                  type="button"
                >
                  SIGN UP
                </button>
              </div>
              <div className="text-center mt-4 font-weight-light">
                <span className="text_light">Already have an account? </span>
                <Link to="/" className="text-primary">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
