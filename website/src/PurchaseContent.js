import React, { useEffect, useState, useRef, createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-bootstrap/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Card } from "react-bootstrap";
import PlanServicePage from "./DataApi/PlanApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
const planColors = {
  silver: { bg: "#bdc3c7", text: "#000", day: "#period" },
  gold: { bg: "#ffd700", text: "#000" },
  platinum: { bg: "#7f8c8d", text: "#fff", day: "#e8e3e3" },
};

export default function PurchaseContent({
  purchaceContent,
  setPurchaceContent,
  purchaceContentData,
  purchaseid,
  handlePayment,
}) {
 

  return (
    <div className="row">
      <Modal show={purchaceContent} onHide={() => setPurchaceContent(false)}>
        <div className="custom-modal">
          <CloseIcon
            onClick={() => setPurchaceContent(false)}
            className="cursor"
          />
          <div className="modal_header">
            <h4 className="modal-title">CND PLAY</h4>
            <p className="modal-subtitle">Purchase Content</p>
          </div>

          <div className="modal-body ">
            <div className="row pricing-plan m-auto">
              <div className="row text-center m-auto">
                {purchaceContentData?.length === 0 ? (
                  <p className="text-white text-center">Loading</p>
                ) : (
                  <div
                    className="col-md-5  plan m-auto"
                    style={{
                      backgroundColor: "#ffff",
                      // width: "200px",
                    }}
                  >
                    {purchaceContentData
                      ?.filter((ele) => ele?._id === purchaseid)
                      ?.map((purc) => (
                        <>
                          <div
                            className="row m-auto"
                            key={purc?._id}
                            // style={{ height: "150px" }}
                          >
                            <p>
                              Purchase {purc?.title} {purc?.section}
                            </p>

                            <div className="price">
                              <p>
                                ₹{purc?.amount} / {purc?.validity} days
                              </p>
                            </div>
                          </div>
                          <button
                            className="subscribe-button "
                            onClick={() => handlePayment(purc)}
                          >
                            BUY NOW
                          </button>
                        </>
                      ))}
                  </div>
                )}
              </div>

           
            </div>
          </div>
        </div>
      </Modal>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "100%", height: "14%" }}
      />
    </div>
  );
}
