import { Link, useLocation } from "react-router-dom";
import React, { Component, useState, useEffect, forwardRef } from "react";
// import httpCommonFunction from "../http-common.function";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RegisterPage from "./DataApi/Register";
const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const initialRegisterData = {
    ch_id: "1",
    full_name: fullname,
    username: username,
    password: password,
    confirm_password: confirmpas,
    agree_terms: false,
    country_code: "",
    phone: Phone,
    confirmpas: confirmpas,
    email: Email,
    date_of_birth: "",
    gender: gender,
    notification_token: "",
    profile_picture: "",
    agree_terms: isChecked,
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
    district: district,
    lastLogin: "",
    messageToken: "",
    watchingNow: "",
    wishlist: "",
  };
  const location = useLocation();
  let id = location.state ? location.state.idd : null;
  const [register_data, set_register_data] =
    React.useState(initialRegisterData);
    const handleChange = (event) => {
      const { name, value } = event.target;
      set_register_data({ ...register_data, [name]: value });
    };
  const handleCheckboxClick = (event) => {
    const { name, value } = event.target;
    set_register_data({ ...register_data, [name]: !isChecked });
    setIsChecked(!isChecked);
  };

  const handleRegister = () => {
    if (!fullname || !username || !password || !confirmpas) {
      return alert("Please enter all fileds");
    }
    RegisterPage.Register(initialRegisterData)
      .then((response) => {
        alert("Sign Up Successful!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error updating user ", error);
      });
  };

  const fetchData = async () => {
    let userdata = await RegisterPage.GetUserById(userid?.idd);

    setUpdatedData(userdata);
  };

  useEffect(() => {
    const fetchData = async () => {
      let userdata = await RegisterPage.GetUserById(userid?.idd);
      console.log(userdata);
      setUpdatedData(userdata);
    };
    const Userdata = fetchData;
    setClientsName(Userdata.clientsName);
    setBusinessName(Userdata.clientsBrand);
    setClientsContact1(Userdata.ClientsContactNumber1);
    setClientsContact2(Userdata.ClientsContactNumber2);
    setClientsEmail(Userdata.ClientsEmail);
    setsetClientAddress(Userdata.ClientAddress);
    setPincode(Userdata.Pincode);
    setZone(Userdata.Zone);
  }, [userid?.idd]);

  const AddClientsData = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("clientsName", clientName);
    formData.append("clientsBrand", businessName);
    formData.append("ClientsContactNumber1", clientsContact1);
    formData.append("ClientsContactNumber2", clientsContact2);
    formData.append("ClientsEmail", clientsEmail);
    formData.append("ClientAddress", ClientAddress);
    formData.append("Pincode", pincode);
    formData.append("Zone", zone);
    formData.append("ClientImage", clientImage);

    try {
      const config = {
        url: "/Client/clients/addclient",
        baseURL: ApiURL,
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        data: formData,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Clients added");
        window.location.href = "/ClientsManagement";
      }
    } catch (err) {
      console.log("Failed to add clients");
    }
  };

  const updateclient = async () => {
    const requestData = {
      clientsName: clientName,
      clientsBrand: businessName,
      ClientsContactNumber1: clientsContact1,
      ClientsContactNumber2: clientsContact2,
      ClientsEmail: clientsEmail,
      ClientAddress: ClientAddress,
      Pincode: pincode,
      Zone: zone,
      ClientImage: clientImage,
    };

    try {
      const config = {
        url: `/Client/clients/updateclient/${id}`,
        baseURL: ApiURL,
        headers: { "Content-Type": "application/json" },
        method: "put",
        data: requestData,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Clients updated successfully");
        window.location.href = "/ClientsManagement";
      }
    } catch (err) {
      console.error("Failed to update clients", err);
      console.log(
        "Failed to update clients. Please check the console for details."
      );
    }
  };
  console.log(register_data, "register_data");
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
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <input
                  type="Email"
                  className="form-control form-control-lg"
                  id="Email"
                  name="Email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <input
                  type="gender"
                  className="form-control form-control-lg"
                  id="gender"
                  name="gender"
                  placeholder="gender"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <input
                  type="district"
                  className="form-control form-control-lg"
                  id="district"
                  name="district"
                  placeholder="district"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
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
                  className="btn col-md-5 m-auto  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
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
