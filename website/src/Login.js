import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState();
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(120);
  const [UserData, setUserData] = useState();
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
  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      alert("OTP expired. Please request a new OTP.");
      setShowOTP(false);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);
  function onSignup() {
    // if (!UserData || UserData?.length === 0) {
    //   // console.error("User data is empty or not loaded correctly.");
    //   return;
    // }
    const user = UserData?.find((ele) => ele?.phone?.toString() == ph?.trim());

    // console.log(user, "user");
    if (!user) {
      alert(
        "This number is not registered. Please enter a registered number or sign up."
      );
      return;
    }

    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + ph.trim();

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        setTimer(120);
        // console.log(user);
        localStorage.setItem("cndplay_auth_response", JSON.stringify(user));

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
  useEffect(() => {
    getUSer();
  }, []);
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

  return (
    <div className="row m-auto bg-mg" style={{ height: "100vh" }}>
      <section className="row m-auto ">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>

        <div
          className="col-md-4 m-auto p-4"
          style={{ backgroundColor: "#191c24", border: "1px solid white" }}
        >
          <h4 className="text-center text-white font-medium ">
            Welcome to <br /> CND PLAY
          </h4>

          {showOTP ? (
            <div className="row text-center  m-auto">
              <BsFillShieldLockFill className="text-white" size={30} />

              <label
                htmlFor="otp"
                className="col-md-12 mt-2 font-bold text-xl text-white text-center"
              >
                Enter your OTP
              </label>
              <div className="row m-auto mt-4">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="col-md-9 opt-container m-auto"
                ></OtpInput>
                <div className="row mt-2 m-auto text-white">
                  <p className="col-md-10 m-auto text-center">
                    OTP will expire in {timer} seconds
                  </p>
                </div>
              </div>
              <div className="row mt-4  m-auto">
                <button
                  onClick={onOTPVerify}
                  className="col-md-7 m-auto bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
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
              <label
                htmlFor=""
                className="font-bold mt-2 text-xl text-white text-center m-auto"
              >
                Verify your phone number
              </label>
              <div className="col-md-8 m-auto mt-3 p-2">
                <input
                  className="row m-auto form-control"
                  type="number"
                  style={{ color: "white" }}
                  placeholder="Enter your phone number"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                />
              </div>
              <button
                onClick={onSignup}
                className="col-md-8 m-auto p-2 mt-4 bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Send otp via SMS</span>
              </button>
              <div className="row m-auto text-ceneter">
                <Link className="col-md-7 m-auto" to="/Register">
                  Are you new? register
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
