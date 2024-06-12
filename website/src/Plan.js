import React, { useEffect, useState } from "react";
import PlanServicePage from "./DataApi/PlanApi";
import "./Plan.css";
import ContentsPageService from "./DataApi/Api";
import RegisterPage from "./DataApi/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";

const planColors = {
  silver: { bg: "#bdc3c7", text: "#000", day: "#period" },
  gold: { bg: "#ffd700", text: "#000" },
  platinum: { bg: "#7f8c8d", text: "#fff", day: "#e8e3e3" },
};

export default function Plan() {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);

  const [activePlan, setActivePlan] = useState("Three Months");
  const [allPlan, setAllPlan] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activePlan]);

  const fetchData = async () => {
    let plan = await PlanServicePage.getAllPlan();

    let filteredData = plan.filter((ele) => {
      if (
        (ele.validity === 90 && activePlan === "Three Months") ||
        (ele.validity === 180 && activePlan === "Six Months") ||
        (ele.validity === 365 && activePlan === "Yearly")
      ) {
        return true;
      }
      return false;
    });
    setAllPlan(filteredData);
  };


  const calculateMonths = (days) => {
    return Math.floor(days / 30);
  };

  const [paymentError, setPaymentError] = useState(null);

  const handlePayment = async (plan) => {
    const txnid = `Txn${Date.now()}`;
    const paymentData = {
      amount: plan.amount,
      productinfo: plan.device,
      firstname: getlocalStorage.username,
      email: getlocalStorage.email,
      phone: getlocalStorage.phone,
      surl: `https://api.cndplay.com/api/successp/${txnid}/${getlocalStorage._id}/${plan._id}/${plan.validity}/${plan.planType}/${plan.amount}`,
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
      <div className="container plan-bg ">
        <p className="text-white fs-1 p-5 text-center textbold mt-5">
          Find The Perfect Plan for you
        </p>
        {paymentError && <p>{paymentError}</p>}
        <div className="row mt-5 bg-dark p-3">
          <div className="row mt-3">
            <span className="col-md-2"></span>
            <button
              className={`col-md-2 plan-btn p-2 m-auto ${activePlan === "Three Months" ? "active" : ""
                }`}
              onClick={() => setActivePlan("Three Months")}
            >
              Three Months
            </button>
            <button
              className={`col-md-2 plan-btn p-2 m-auto ${activePlan === "Six Months" ? "active" : ""
                }`}
              onClick={() => setActivePlan("Six Months")}
            >
              Six Months
            </button>{" "}
            <button
              className={`col-md-2 plan-btn p-2 m-auto ${activePlan === "Yearly" ? "active" : ""
                }`}
              onClick={() => setActivePlan("Yearly")}
            >
              Yearly
            </button>
            <span className="col-md-2"></span>
          </div>
          <div className="container-fluid">
            <div className="container">
              <div className="row ">
                {allPlan.map((ele) => {
                  const { bg, text } = planColors[ele.planType.toLowerCase()];
                  let cardClass = "plan-card ";
                  if (ele.planType === "Gold") {
                    cardClass += " bg-1";
                  } else if (ele.planType === "Silver") {
                    cardClass += " bg-2";
                  } else if (ele.planType === "Platinum") {
                    cardClass += " bg-3";
                  }
                  console.log(ele, "data");
                  return (
                    <div className="col-sm-4 mt-5" key={ele._id}>
                      <div className={cardClass}>
                        <div className="plan-plan-title text-center">
                          <i
                            className="fa fa-paper-plane"
                            aria-hidden="true"
                          ></i>
                          <h2>{ele?.planType}</h2>
                        </div>
                        <div className="price text-center">
                          <h4>
                            <sup>₹</sup>
                            {ele?.amount}
                          </h4>
                        </div>
                        <div className="m-auto">
                          <div className="plan-option col-md-10 m-auto">
                            <ul>
                              <li>
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                                Validity {ele.validity} days /{" "}
                                {calculateMonths(ele.validity)} months
                              </li>
                              <li>Add-Free</li>
                              <li>Watch video upto {ele.videoQuality}</li>
                              <li>Device - Mobile {ele.device}</li>
                            </ul>
                          </div>
                        </div>
                        {console.log(ele, "ele")}

                        <a className="text-black text-center">
                          <span onClick={() => handlePayment(ele)}>
                            {" "}
                            Buy Now
                          </span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-3" />
    </div>
  );
}
