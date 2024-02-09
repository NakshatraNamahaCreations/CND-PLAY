import { Link, useLocation } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
// import httpCommonFunction from "../http-common.function";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RegisterPage from "./DataApi/Register";
import ContentsPageService from "./DataApi/Api";
const Register = () => {
  const [isChecked, setIsChecked] = useState(false);

  const location = useLocation();
  let userid = location?.state || null;

  const initialRegisterData = {
    ch_id: "1",
    full_name: "",
    username: "",
    password: "",
    confirm_password: "",
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
      !register_data.username ||
      !register_data.password
    ) {
      return alert("Please enter all fileds");
    }
    RegisterPage.Register(register_data)
      .then((response) => {
        alert("Sign Up Successful!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error updating user ", error);
      });
  };

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
            full_name: userDataResponse.full_name || "",
            username: userDataResponse.username || "",
            date_of_birth: userDataResponse.date_of_birth || "",
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
            <form className="pt-3 row">
              <div className="form-group col-md-6 mt-2">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="full_name"
                  name="full_name"
                  placeholder="Full Name"
                  value={register_data?.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <input
                  type="email"
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
                    selected={register_data?.gender === "Female" ? true : false}
                    value="Female"
                  >
                    Female
                  </option>

                  <option
                    selected={register_data?.gender === "Male" ? true : false}
                    value="Male"
                  >
                    Male
                  </option>

                  <option
                    selected={register_data?.gender === "Other" ? true : false}
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
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={register_data?.password}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={register_data?.confirm_password}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <input
                  type="phone"
                  className="form-control form-control-lg"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  value={register_data?.phone}
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
                    className="btn col-md-5 m-auto  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleRegister}
                    type="button"
                  >
                    SIGN UP
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
