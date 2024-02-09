import React, { useEffect, useState } from "react";
import PlanServicePage from "./DataApi/PlanApi";
import ContentsPageService from "./DataApi/Api";
import Footer from "./footer";
import { Form, Button } from "react-bootstrap";
import RegisterPage from "./DataApi/Register";
export default function Plan() {
  let date = Date.now();
  let initialPostData = {
    Active: [
      {
        purchaseddate: date,
        expiryddate: "",
        content_id: "",
        PlanType: "",
        Plan_id: "",
      },
    ],

    Expired: [
      {
        content_id: "",
        IsExpired: true,
        purchaseddate: "",
        expiryddate: "",
      },
    ],
  };
  const [PlanSilver, setPlanSilver] = useState();
  const [PlanPlatinum, setPlanPlatinum] = useState();
  const [Plandata, setPlandata] = useState(initialPostData);
  const [PlanTypeData, setPlanTypeData] = useState();
  const [IsPlanDisplay, setIsPlanDisplay] = useState(false);
  const [PlanType, setPlanType] = useState("");

  const [SelectPlan, setSelectPlan] = useState("");
  const handleChange = (e) => {
    const [name, value] = e.target;
    setPlandata({ ...Plandata, [name]: value });
  };
  let authResponseString = localStorage.getItem("auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  console.log(SelectPlan, "SelectPlan");
  const handlePurchacePlan = () => {
    const updatedLikes = {
      Active: [
        {
          purchaseddate: "",
          expiryddate: "",
          content_id: "",
        },
      ],
      Expired: [
        {
          content_id: "",
          IsExpired: true,
          purchaseddate: "",
          expiryddate: "",
        },
      ],
    };
    let initialPostData = { purchasedcontent: updatedLikes, plan: PlanType };
    if (updatedLikes.userid) {
      RegisterPage.update(initialPostData, getlocalStorage._id)
        .then((response) => {
          alert("Movie liked successfully", response);
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };

  const handleSearchPlan = async (selectedPlanType) => {
    let data = await PlanServicePage.getAllPlans(selectedPlanType);
    setPlanTypeData(data);
    setIsPlanDisplay(true);
  };

  return (
    <div
      className="row m-auto bg-mg"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="row mt-5">
        <p className="text-white"> Select Plan</p>
        <div className="col-md-2">
          <Form.Select
            name="planType"
            value={PlanType}
            className="col-md-4"
            onChange={(e) => setPlanType(e.target.value)}
          >
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </Form.Select>
        </div>{" "}
        <div className="col-md-2">
          <Button onClick={() => handleSearchPlan(PlanType)}>Get Plan</Button>
        </div>
        {IsPlanDisplay && (
          <div className="col-md-8 " style={{ height: "100vh" }}>
            <div
              className="card text-left py-3 px-4 px-sm-5 mt-3"
              style={{ backgroundColor: "#191c24" }}
            >
              <div className="row">
                {PlanTypeData?.map((ele) => {
                  return (
                    <div
                      className="mb-3 row"
                      style={{ backgroundColor: "#1F2544" }}
                    >
                      <div className="col-md-1 m-auto">
                        <input
                          onChange={(e) => setSelectPlan(e.target.value)}
                          value={ele._id}
                          className=" "
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "100px",
                          }}
                          type="radio"
                          id={`${ele._id}`}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <p className="text-white"> Price {ele.amount}</p>
                          <p className="text-white">
                            Validity {ele.validity} days
                          </p>
                          <p className="text-white">
                            Video Quality {ele.videoQuality}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-7"></div>
                    </div>
                  );
                })}
              </div>
              <Button className="col-md-3 m-auto" onChange={handlePurchacePlan}>
                Buy Now
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
