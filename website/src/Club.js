import React, { useEffect, useState } from "react";
import PlanServicePage from "./DataApi/PlanApi";
import "./Plan.css";
import ContentsPageService from "./DataApi/Api";
import RegisterPage from "./DataApi/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";
import http from "./http-common.function";
import axios from "axios";
const planColors = {
  silver: { bg: "#bdc3c7", text: "#000", day: "#period" },
  gold: { bg: "#ffd700", text: "#000" },
  platinum: { bg: "#7f8c8d", text: "#fff", day: "#e8e3e3" },
};

export default function Club() {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [AllClub, setAllClub] = useState([]);
  useEffect(() => {
    getClub();
  }, []);

  const getClub = async () => {
    try {
      let res = await http.get(`/offer/getalldata`);
      if (res.status === 200) {
        // return res.data.likedMovies;
        setAllClub(res.data);
      }
    } catch (error) {
      // console.log("Error fetching trending list:");
    }
  };

  const calculateMonths = (days) => {
    return Math.floor(days / 30); // Calculate whole months
  };

  const [paymentError, setPaymentError] = useState(null);
  const handlePayment = async (item) => {
    const txnid = `Txn${Date.now()}`;
    const paymentData = {
      amount: item.price,
      productinfo: item.title,
      firstname: getlocalStorage.username,
      email: getlocalStorage.email,
      phone: getlocalStorage.phone,
      surl: `https://api.cndplay.com/api/club/success/${txnid}/${getlocalStorage._id}/${item._id}/${item.validity}/${item.price}`,
      furl: "https://www.cndplay.com/failure",
      pg: "UPI",
      bankcode: "UPI",
      vpa: "8951592630@ybl",
      txnid: txnid,
    };

    try {
      const response = await fetch("https://api.cndplay.com/api/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      const result = await response.json();
      redirectToPayU(result.paymentUrl, result.params);
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      setPaymentError("Payment Initialization Error");
    }
  };

  const redirectToPayU = (paymentUrl, params) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentUrl;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };
  return (
    <div className="row  m-auto bg-mg " style={{ height: "180vh" }}>
      <div className="container">
        <h3 className="text-white text-center mt-5">Offers</h3>

        <div className="row m-auto">
          {AllClub?.map((ele) => {
            return (
              <div className="col-md-4 mt-5 club p-4">
                <p className="col-md-10 textbold m-auto text-white ">
                  {ele.title}
                </p>
                <p className="col-md-10 m-auto  text-white">{ele.subtitle}</p>
                <div className="row">
                  <img
                    className="row m-auto rounded mt-3"
                    src={ele.poster}
                    alt=""
                  />
                </div>

                <div className="row mt-3 m-auto">
                  <button
                    className="subscribe-button m-auto col-md-10"
                    onClick={() => handlePayment(ele)}
                  >
                    Purchase for ₹{ele.price}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer className="mt-3" />
    </div>
  );
}
