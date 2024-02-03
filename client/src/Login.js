import { Link } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import Files from "react-files";
// import { makeLogin } from "./actions/index";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Login = forwardRef((props, ref) => {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const initialLoginData = {
    username: username,
    password: password,
    remember_login: false,
  };

  const [login_data, set_login_data] = React.useState(initialLoginData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_login_data({ ...login_data, [name]: value });
  };

  const handleCheckboxClick = (event) => {
    const { name, value } = event.target;
    set_login_data({ ...login_data, [name]: !isChecked });
    setIsChecked(!isChecked);
  };
  const handleSubmitNewLoginCreateFunc = async () => {
    try {
      const config = {
        url: "http://localhost:8081/api/authenticateRoute/makelogin",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: initialLoginData,
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Logged in Successfully!");
        localStorage.setItem(
          "auth_response",
          JSON.stringify(res.data.existingUser)
        );
        window.location.href = "/home";
      }
    } catch (error) {
      console.log(error || "Unknown error occurred");
    }
  };

  // const handleSubmitNewLoginCreateFunc = () => {
  // 	// dispatch(makeLogin(login_data))
  // 	// .then(data => {
  //   //   sessionStorage.setItem("auth_response", JSON.stringify(data));
  // 	// 	setSubmitted(true);
  //   //   window.location.href = "/dashboard";
  // 	// }).catch(e => {
  // 	// 	console.log(e);
  // 	// });
  //   if(login_data.username === 'admin@cndplay' && login_data.password === 'Rohit@CND1') {
  //     sessionStorage.setItem("auth_response", JSON.stringify({status: 1, uid: 1, username: login_data.username, user_type: login_data.user_type}));
  //     setSubmitted(true);
  //     window.location.href = "/dashboard";
  //   } else {
  //     window.location.href = "/login";
  //   }
  // }

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
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 d-flex search-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    size="lg"
                    className="form-control h-auto"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="mt-3 row m-auto">
                  <button
                    type="button"
                    className="btn row  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleSubmitNewLoginCreateFunc}
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
