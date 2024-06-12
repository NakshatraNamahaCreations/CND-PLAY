import { Link } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
import httpCommonFunction from "../http-common.function";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = forwardRef((props, ref) => {
  const REACT_API = process.env.REACT_APP_API_URL;
  // console.log("REACT_API", REACT_API);
  const [isChecked, setIsChecked] = useState(false);

  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpas, setconfirmpas] = useState("");

  // const dispatch = useDispatch();
  const initialRegisterData = {
    user_type: "admin",
    username: username,
    email: email,
    password: password,
    confirm_password: confirmpas,
    agree_terms: false,
  };
  const [register_data, set_register_data] =
    React.useState(initialRegisterData);
  // const [submitted, setSubmitted] = useState(false);

  const handleCheckboxClick = (event) => {
    const { name, value } = event.target;
    set_register_data({ ...register_data, [name]: !isChecked });
    setIsChecked(!isChecked);
  };

  const handleRegister = async () => {
    try {
      const config = {
        url: "https://api.cndplay.com/api/user/createUser",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: initialRegisterData,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("Sign Up Successful!");
        window.location.href = "/login";
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo"></div>
              <h4>New here?</h4>
              <h6 className="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
              <form className="pt-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="Email"
                    name="Email"
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
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
                      <i className="input-helper"></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleRegister}
                    type="button"
                  >
                    SIGN UP
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Login
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

export default Register;
