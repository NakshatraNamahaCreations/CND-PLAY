import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function logindemo() {
  const [phone, setphone] = useState();
  const handleLogin = () => {};



const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});
  return (
    <div>
      <form className="pt-3">
        <div className="form-group mb-3 d-flex search-field">
          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            size="lg"
            className="form-control   h-auto"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
        </div>

        <div className="mt-3 row m-auto">
          <button
            type="button"
            className="btn row p-1 m-auto  btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
            onClick={handleLogin}
            disabled={phone.length === 9}
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
  );
}
