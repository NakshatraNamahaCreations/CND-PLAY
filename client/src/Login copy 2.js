import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import "./index.css";
const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "Brainy Bunch's Authentication System";
  }, []);
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
    onCaptchVerify(); // Move this line up
  
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;
  
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="main-container">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <pre className="login-success">
            Login Success
            <br />
            <br />
            Welcome to CND Play
          </pre>
        ) : (
          <div id="login-container">
            <h1 className="welcome-heading">CND Play</h1>
            {showOTP ? (
              <>
                <div className="phone-logo-container">
                  <BsFillShieldLockFill color="white" size={50} />
                </div>
                <label
                  htmlFor="otp"
                  className="welcome-heading"
                  id="otp-heading"
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
                  inputStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%",
                    height: "0px",
                    borderRadius: "10px",
                    border: "1px solid #000",
                    margin: "0 auto",
                  }}
                  className="opt-container "
                ></OtpInput>
                <button onClick={onOTPVerify} id="verifyOTP">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div id="telephone-container">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" id="login-heading">
                  Log In With Phone
                </label>
                <PhoneInput
                  inputStyle={{
                    width: "300px",
                    padding: "10px",
                    height: "2rem",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "1.1rem",
                  }}
                  id="phoneInput"
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                />
                <button onClick={onSignup} id="sendOTP">
                  {loading && <CgSpinner size={20} className="spinner" />}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
