import React from "react";
import Footer from "./footer";

export default function ContactUs() {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>
        We value your feedback and are here to assist you. If you have any
        questions, concerns, or suggestions, please feel free to contact us
        using the information below:
      </p>
      <div className="contact-info">
        <div className="info-label">Company Name:</div>
        <div className="info-value">Clockndail Film Production</div>
      </div>
      <div className="contact-info">
        <div className="info-label">Address:</div>
        <div className="info-value">Lokhra Road, Guwahati (Assam), 781034</div>
      </div>
      <div className="contact-info">
        <div className="info-label">Email:</div>
        <div className="info-value">
          <a href="mailto:cndplay.help@gmail.com">cndplay.help@gmail.com</a>
        </div>
      </div>
      <p>
        We strive to respond to all inquiries promptly. Please allow us up to 48
        hours to get back to you. Thank you for your understanding.
      </p>
    </div>
  );
}
