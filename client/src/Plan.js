import React, { useEffect, useState } from "react";
import PlanServicePage from "./DataApi/PlanApi";
import { Card } from "react-bootstrap";
import ContentsPageService from "./DataApi/Api";
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
  const [PlanGold, setPlanGold] = useState();
  const [PlanSilver, setPlanSilver] = useState();
  const [PlanPlatinum, setPlanPlatinum] = useState();
  const [Plandata, setPlandata] = useState(initialPostData);
 

  const handleChange = (e) => {
    const [name, value] = e.target;
    setPlandata({ ...Plandata, [name]: value });
  };
  let authResponseString = localStorage.getItem("auth_response");
  let getlocalStorage = JSON.parse(authResponseString);

  useEffect(() => {
    fetchData();
  }, []);
  const handlePurchacePlan = (idd) => {
    const updatedLikes = {
      Active: [
        {
          purchaseddate: "",
          expiryddate: "",
          content_id: "",
          PlanType: "",
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
    let initialPostData = { purchasedcontent: updatedLikes };
    if (updatedLikes.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage._id)
        .then((response) => {
          alert("Movie liked successfully", response);
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };

  const fetchData = async () => {
    let PlanGold = await PlanServicePage.getGoldAllPlan();
    let PlanSilver = await PlanServicePage.getSilverAllPlan();
    let PlanPlatinum = await PlanServicePage.getPlatinumAllPlan();
    setPlanGold(PlanGold);
    setPlanSilver(PlanSilver);
    setPlanPlatinum(PlanPlatinum);
  };

  return (
    <div className="mt-5 row">
      <div className="row">
        <Card className="col-md-3 m-auto">
          {PlanGold?.map((ele) => {
            return (
              <>
                <p>{ele.amount}</p>
                <p>{ele.planType}</p>
                <p>{ele.validity}</p>
                <p>{ele.videoQuality}</p>
              </>
            );
          })}
        </Card>
        <Card className="col-md-3 m-auto">
          {PlanSilver?.map((ele) => {
            return (
              <>
                <p>{ele.amount}</p>
                <p>{ele.planType}</p>
                <p>{ele.validity}</p>
                <p>{ele.videoQuality}</p>
              </>
            );
          })}
        </Card>
        <Card className="col-md-3 m-auto">
          {PlanPlatinum?.map((ele) => {
            return (
              <>
                <p>{ele.amount}</p>
                <p>{ele.planType}</p>
                <p>{ele.validity}</p>
                <p>{ele.videoQuality}</p>
              </>
            );
          })}
        </Card>
      </div>
      <button className="col-md-2 m-auto" onClick={handlePurchacePlan}>
        Plan
      </button>
    </div>
  );
}
