import React from "react";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className="row footer m-0 bg-mg">
      <hr style={{ color: "white" }}></hr>
      <div className="row m-auto text-center">
        <div className="col-md-4 me-auto">
          <div className="row">
            <h4 className="col-md-6 m-auto leftime">Download App</h4>
            <div className="col-md-6 p-0 me-auto">
              <a
                style={{ cursor: "pointer" }}
                href="https://play.google.com/store/apps/details?id=com.clockndail.clockndail"
              >
                <img
                  className="row"
                  src="./websereis/playstore.png"
                  alt=""
                  height={60}
                  style={{ border: "1px solid #aaaaaa", borderRadius: "10px" }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-2 m-auto">
          <div className=" d-flex">
            <p className="leftime m-auto">Connect With us</p>
            <p className="leftime m-auto">
              {" "}
              <a href="https://www.facebook.com/CNDPlay">
                <img
                  width={40}
                  height={40}
                  src="./assest/icons8-facebook-color-96.png"
                />
              </a>
            </p>
            <p className="leftime m-auto">
              {" "}
              <a href="https://www.instagram.com/clockndail">
                <img
                  width={40}
                  height={40}
                  src="./assest/icons8-instagram-windows-11-color-96.png"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="row d-flex">
        <div className="col-md-5  m-auto">
          <div className="d-flex">
            <a href="/cnd-play/contact-us" className="leftime m-auto">
              Contact us
            </a>
            <a href="#" className="leftime m-auto">
              |
            </a>
            <a href="/cnd-play/privacy-policy" className="leftime m-auto">
              Privacy Policy
            </a>
            <a href="#" className="leftime m-auto">
              |
            </a>
            <a href="/cnd-play/terms-of-use" className="leftime m-auto">
              Terms Of Use
            </a>
            <a href="#" className="leftime m-auto">
              |
            </a>
            <a
              href="/cnd-play/refund-return-cancellation"
              className="leftime m-auto"
            >
              Refund,Return,Cancellation Privacy
            </a>
          </div>
        </div>

        <div className="col-md-7"></div>
      </div>
    </div>
  );
}
