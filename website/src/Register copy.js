import { Link, useLocation } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
// import httpCommonFunction from "../http-common.function";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RegisterPage from "./DataApi/Register";
// import ContentsPageService from "./DataApi/Api";

import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
// import { useState } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { useEffect } from "react";
const Register = () => {
  const [isChecked, setIsChecked] = useState(false);

  const location = useLocation();
  let userid = location?.state || null;

  const initialRegisterData = {
    username: "",
    agree_terms: false,
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
    purchasedcontent: "",
    accountCompleted: "",
    avatar: "",
    createdOn: "",
    district: "",
    lastLogin: "",
    messageToken: "",
    watchingNow: "",
  };
  const [register_data, set_register_data] = useState(initialRegisterData);

  const [Districtsdata, setDistrictsdata] = useState();
  const [UserData, setUserData] = useState();

  const handleCheckboxClick = (event) => {
    const { name, value } = event.target;
    set_register_data({ ...register_data, [name]: !isChecked });
    setIsChecked(!isChecked);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_register_data({ ...register_data, [name]: value });
  };

  const handleRegister = () => {
    if (
      !register_data.email ||
      !register_data.username
      // !register_data.password
    ) {
      return alert("Please enter all fileds");
    }
    let data = {
      phone: ph,
      username: register_data.username,
      agree_terms: false,
      email: register_data.email,
      date_of_birth: register_data.date_of_birth,
      gender: register_data.gender,
      notification_token: register_data.notification_token,
      profile_picture: register_data.profile_picture,
      agree_terms: register_data.agree_terms,
      fieldCount: register_data.fieldCount,
      insertId: register_data.insertId,
      message: register_data.message,
      serverStatus: register_data.serverStatus,
      warningCount: register_data.warningCount,
      plan: register_data.plan,
      firebase_id: register_data.firebase_id,
      purchasedcontent: register_data.purchasedcontent,
      accountCompleted: register_data.accountCompleted,
      avatar: register_data.avatar,
      createdOn: register_data.createdOn,
      district: register_data.district,
      lastLogin: register_data.lastLogin,
      messageToken: register_data.messageToken,
      watchingNow: register_data.watchingNow,
    };
    RegisterPage.Register(data)
      .then((response) => {
        alert("Sign Up Successful!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error updating user ", error);
      });
  };
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);

        setLoading(false);
        window.location.assign("/");
        alert("👍Login Success");
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  // console.log(register_data,"reg")

  const handleUpdate = async () => {
    if (userid?.idd) {
      RegisterPage.update(register_data, userid?.idd)
        .then((response) => {
          alert("User updated successfully", response);
          window.location.assign("/Profile");
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };
  useEffect(() => {
    const fetchData2 = async () => {
      let Districtsdata = await RegisterPage.getAllDistricts();
      setDistrictsdata(Districtsdata);
    };

    const fetchData = async () => {
      try {
        const userDataResponse = await RegisterPage.GetUserById(userid?.idd);

        if (
          userid?.idd &&
          userid?.isEditProfile === "edit" &&
          userDataResponse
        ) {
          set_register_data({
            ...register_data,
            email: userDataResponse.email || "",
            phone: userDataResponse.phone || "",
            // full_name: userDataResponse.full_name || "",
            username: userDataResponse.username || "",
            // date_of_birth: userDataResponse.date_of_birth || "",
            gender: userDataResponse.gender || "",
            agree_terms: userDataResponse.agree_terms || false,
            district: userDataResponse.district || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData2();
    fetchData();
  }, [userid?.idd, userid?.isEditProfile]);

  return (
    <div className="w-100 bg-mg " style={{ height: "100vh" }}>
      <div className="row w-100 mx-0">
        <div className="col-lg-8 mx-auto">
          <div
            className="card text-left py-3 px-4 px-sm-5 mt-3"
            style={{ backgroundColor: "#191c24" }}
          >
            <div className="brand-logo"></div>
            <h4 className="text_light">New here?</h4>
            <h6 className="font-weight-light text_light">
              Signing up is easy. It only takes a few steps
            </h6>
            <div className="pt-3 row">
              {showOTP ? (
                <div className="row m-auto">
                  <BsFillShieldLockFill className="text-white" size={30} />
                  <label
                    htmlFor="otp"
                    className="font-bold text-xl text-white text-center"
                  >
                    Enter your OTP
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="col-md-6 m-auto opt-container m-auto"
                  ></OtpInput>
                  <div className="row mt-4  m-auto">
                    <button
                      onClick={onOTPVerify}
                      className="col-md-4 m-auto bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Verify OTP</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row m-auto">
                  {/* <label
                    htmlFor=""
                    className="font-bold mt-2 text-xl text-white text-center m-auto"
                  >
                    Verify your phone number
                  </label> */}
                  {/* <div className="col-md-8 m-auto mt-3 p-2">
                    <input
                      className="row m-auto form-control"
                      type="text"
                      style={{ color: "white" }}
                      placeholder="Enter your phone number"
                      value={ph}
                      onChange={(e) => setPh(e.target.value)}
                    />
                  </div> */}

                  <div className="form-group col-md-6 mt-2">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={register_data?.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6 mt-2">
                    <input
                      type="Email"
                      className="form-control form-control-lg"
                      id="Email"
                      name="email"
                      placeholder="Email"
                      value={register_data?.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6 mt-2">
                    <select
                      className="content_section_data form-select p-2"
                      name="gender"
                      defaultValue={register_data?.gender}
                      onChange={handleChange}
                    >
                      <option value=""> - Select Gender - </option>
                      <option
                        selected={
                          register_data?.gender === "Female" ? true : false
                        }
                        value="Female"
                      >
                        Female
                      </option>

                      <option
                        selected={
                          register_data?.gender === "Male" ? true : false
                        }
                        value="Male"
                      >
                        Male
                      </option>

                      <option
                        selected={
                          register_data?.gender === "Other" ? true : false
                        }
                        value="Other"
                      >
                        Other
                      </option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 mt-2">
                    <select
                      className="content_section_data form-select p-2"
                      name="district"
                      value={register_data?.district}
                      onChange={handleChange}
                    >
                      <option value=""> - Select District - </option>
                      {Districtsdata &&
                        Districtsdata?.map((item, index) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-md-6 mt-2">
                    {/* <input
                      type="phone"
                      className="form-control form-control-lg"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChange}
                      value={register_data?.phone}
                    /> */}

                    <input
                      type="phone"
                      className="form-control form-control-lg"
                      id="phone"
                      // name="phone"
                      style={{ color: "white" }}
                      placeholder="Enter your phone number"
                      value={ph}
                      onChange={(e) => setPh(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 mt-4">
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
                    {userid?.isEditProfile !== "edit" ? (
                      <button
                        onClick={onSignup}
                        className="col-md-8 m-auto p-2 mt-4 bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Send otp via SMS</span>
                      </button>
                    ) : (
                      <button
                        className="btn col-md-5 m-auto  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        onClick={handleUpdate}
                        type="button"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="text-center mt-4 font-weight-light">
                <span className="text_light">Already have an account? </span>
                <Link to="/" className="text-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
