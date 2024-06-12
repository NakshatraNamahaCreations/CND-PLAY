import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegisterPage from "./DataApi/Register";
const Register = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const location = useLocation();
  let userid = location?.state || null;

  const initialRegisterData = {
    username: "",
    email: "",
    gender: "",
    district: "",
    phone: "",
  };
  const [register_data, set_register_data] = useState(initialRegisterData);
  const [UserData, setUserData] = useState();
  const [Districtsdata, setDistrictsdata] = useState();
  const [Editable, setEditable] = useState(false);
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
          setEditable(true);
          set_register_data({
            ...register_data,
            email: userDataResponse.email || "",
            phone: userDataResponse.phone || "",

            username: userDataResponse.username || "",

            gender: userDataResponse.gender || "",

            district: userDataResponse.district || "",
          });
          console.log(userDataResponse, "userDataResponse");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData2();
    fetchData();
  }, [userid?.idd, userid?.isEditProfile]);
  useEffect(() => {
    getUSer();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_register_data({ ...register_data, [name]: value });
  };
  const handleRegister = () => {
    if (
      !register_data.email ||
      !register_data.username ||
      !register_data.district ||
      !register_data.gender ||
      !register_data.phone
    ) {
      return alert("Please enter all fileds");
    }
    let data = {
      phone: register_data.phone,
      username: register_data.username,
      email: register_data.email,
      gender: register_data.gender,
      district: register_data.district,
    };
    RegisterPage.Register(data)
      .then((response) => {
        window.location.assign("/login");
        alert("👍Signup Success");
      })
      .catch((error) => {
        console.error("Error updating user ", error);
      });
  };
  const getUSer = async () => {
    try {
      let data = await axios.get(
        "https://api.cndplay.com/api/authenticateRoute/getalluser"
      );
      if (data.status === 200) {
        setUserData(data.data.alluser);
      }
    } catch (error) {
      // console.log(error);
    }
  };

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

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => {
              alert("OTP Expired");
            },
          },
          auth
        );
        window.recaptchaVerifier.render().catch((error) => {
          console.error("reCAPTCHA render failed:", error);
        });
      } else {
        console.error("Error: Missing recaptcha-container element in the DOM.");
      }
    }
  }
  

  function isValidPhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^\+91(?!00)\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  }

  function onSignup() {
    const finduser = UserData?.find(
      (ele) => ele?.phone?.toString() === register_data.phone?.trim()
    );

    if (finduser) {
      alert("This number is already registered");
      return;
    }

    const formatPh = "+91" + register_data.phone;
    if (!isValidPhoneNumber(formatPh)) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        setLoading(false);
        if (error.message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
          alert("Too many attempts. Please try again later.");
        } else {
          console.error("Error updating user ", error);
          alert("An error occurred. Please try again.");
        }
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const recaptchaContainer = document.createElement("div");
    recaptchaContainer.id = "recaptcha-container";
    document.body.appendChild(recaptchaContainer);
    onCaptchVerify();
  });

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        handleRegister();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error verifying OTP", err);
        alert("Invalid OTP. Please try again.");
      });
  }

  return (
    <div className="row m-auto bg-mg" style={{ height: "100vh" }}>
      <section className="row m-auto ">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>

        <div
          className="col-md-6 m-auto p-4"
          style={{ backgroundColor: "#191c24" }}
        >
          <h4 className="text-center text-white font-medium ">
            Welcome to <br /> CND PLAY
          </h4>
          {showOTP ? (
            <div className="row m-auto">
              {/* <div className="bg-white m-auto text-emerald-500 w-fit mx-auto p-4 rounded-full"> */}
              <BsFillShieldLockFill className="text-white" size={30} />
              {/* </div> */}
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

              {/* <div className="form-group col-md-10 mt-2"> */}
              <div className="row mt-2 form-group">
                <div className="col-md-6">
                  <input
                    type="Email"
                    className="form-control form-control-lg"
                    id="Email"
                    style={{ color: "white" }}
                    name="phone"
                    placeholder="Enter your phone number"
                    value={register_data?.phone}
                    onChange={handleChange}
                    readOnly={Editable ? true : false}
                  />
                </div>

                <div className="col-md-6">
                  <button
                    onClick={onSignup}
                    className="row m-auto p-2  bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    <span className="col-md-4">
                      {loading && (
                        <CgSpinner size={20} className=" animate-spin" />
                      )}
                    </span>
                    <span className="col-md-10">Send otp</span>
                  </button>
                </div>
              </div>
              {/* </div> */}
              {/* <div className="mb-4 mt-4">
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
              </div> */}
              <div className="mt-3 row m-auto">
                {userid?.isEditProfile == "edit" && (
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
        </div>
      </section>
    </div>
  );
};

export default Register;
