import { Link } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
import RegisterPage from "./DataApi/Register";
import "react-toastify/dist/ReactToastify.css";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
import { getToken } from "firebase/messaging";


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2Qw92SKVDnlZUq5wUdHA0zIEcAqDM0tI",
  authDomain: "cnd-play.firebaseapp.com",
  projectId: "cnd-play",
  storageBucket: "cnd-play.appspot.com",
  messagingSenderId: "955834134654",
  appId: "1:955834134654:web:59fb6d2a0880cc0c76682f",
  measurementId: "G-YFHNWG2ZBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const Login = forwardRef((props, ref) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOtpSent, setisOtpSent] = useState(false);
  const initialLoginData = {
    remember_login: false,
    phone: "",
    otp: Array(4).fill(""),
  };
  const handleSendOTP = async () => {
    try {
      const phoneNumber = `+${login_data.phone}`;
  
      const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      });
  
      recaptchaVerifier.appVerificationDisabledForTesting = true;
  
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
  
      setisOtpSent(true);
  
      // Remove the following lines if you're not using messaging
      // const token = await getToken(messaging);
      // console.log("FCM Token:", token);
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };
  
  const [login_data, set_login_data] = React.useState(initialLoginData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_login_data({ ...login_data, [name]: value });
  };

  const handleChangeOtp = (event, index) => {
    const { value } = event.target;

    if (/^[0-9]$/.test(value) || value === "") {
      set_login_data((prevData) => ({
        ...prevData,
        otp: [
          ...prevData.otp.slice(0, index),
          value,
          ...prevData.otp.slice(index + 1),
        ],
      }));

      if (index > 0 && value === "") {
        document.getElementById(`otpInput${index - 1}`).focus();
      } else if (index < 3 && value !== "") {
        document.getElementById(`otpInput${index + 1}`).focus();
      }
    }
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

  const handleVerifyOTP = async () => {
  //   try {
  //     const credential = PhoneAuthProvider.credential(
  //       login_data.verificationId,
  //       login_data.otp.join("")
  //     );

  //     await getAuth().signInWithCredential(credential);

  //     const token = await getToken(messaging);
  //     console.log("FCM Token:", token);
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error.message);
  //   }
  };

  return (
    <div className="w-100 bg-mg " style={{ height: "100vh" }}>
      <div className="container-fluid ">
        <div className="row w-100 mx-0 ">
          {!isOtpSent ? (
            <div className="col-lg-4 mx-auto">
              <div
                className="card text-left py-5 px-4 px-sm-5 mt-5"
                style={{ backgroundColor: "#191c24" }}
              >
                <div className="brand-logo"></div>
                <h4 className="text_light">Hello! let's get started</h4>
                <h6 className="font-weight-light text-white">
                  Sign in to continue.
                </h6>
                <form className="pt-3">
                  <div className="form-group mb-3 d-flex search-field">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Mobile Number"
                      size="lg"
                      className="form-control   h-auto"
                      value={login_data.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-3 row m-auto">
                    <button
                      type="button"
                      className="btn row p-1 m-auto  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleLogin}
                      disabled={login_data.phone.length === 9}
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
          ) : (
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5 mt-5 custom-card">
                <h2 className="text-bold text-center">Verify With OTP</h2>
                <h6 className="text-center">Enter the 4-digit code sent to</h6>
                <p className="text-center">{login_data.phone}</p>
                <form className="pt-3">
                  <div className="otp-input-container">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        name={`otpInput${index}`}
                        maxLength="1"
                        className="otp-input"
                        value={login_data.otp[index]}
                        onChange={(event) => handleChangeOtp(event, index)}
                        id={`otpInput${index}`}
                      />
                    ))}
                  </div>

                  <div className="mt-3 row m-auto">
                    <button
                      type="button"
                      className="btn row p-1 m-auto btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleVerifyOTP}
                      disabled={
                        login_data?.otp.length === 3 ||
                        login_data.otp.includes("")
                      }
                    >
                      Verify OTP
                    </button>
                    <p className="text-center">Resend otp</p>
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
