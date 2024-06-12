import React, { useState, useEffect } from "react";
import ContentsPageService from "./DataApi/Api";

const PayUPayment = () => {
  const [data, setData] = useState([]);

  const authResponseString = localStorage.getItem("cndplay_auth_response");
  const getlocalStorage = authResponseString
    ? JSON.parse(authResponseString)
    : null;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const mostViewed = await ContentsPageService.fetchContentsAllList();
      setData(mostViewed);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [paymentError, setPaymentError] = useState(null);
  const handlePayment = async (item) => {
    console.log(item, "item");
    const txnid = `Txn${Date.now()}`;
    const paymentData = {
      amount: "1",
      productinfo: "Product Description",
      firstname: "John",
      email: "john.doe@example.com",
      phone: "9876543210",
      surl: `https://api.cndplay.com/api/payment/success/${txnid}/${getlocalStorage._id}/${item._id}/${item.validity}`,
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
    <>
      {paymentError && <p>{paymentError}</p>}
      <div>
        {data?.map((item) => (
          <div key={item._id}>
            <h1>{item.title}</h1>
            <button onClick={() => handlePayment(item)}>Purchase movie</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PayUPayment;
