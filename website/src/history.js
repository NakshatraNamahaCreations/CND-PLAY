import React, { useEffect, useState } from "react";
import RegisterPage from "./DataApi/Register";
import moment from "moment";
import http from "./http-common.function";
import PlanServicePage from "./DataApi/PlanApi";

const MyHistory = () => {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [ProfileDetails, setProfileDetails] = useState();
  const [OrderData, setOrderData] = useState([]);
  const [Club, setClub] = useState([]);
  const [Plan, setPlan] = useState([]);
  const [Content, setContent] = useState([]);
  const [MergeData, setMergeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userDataResponse = await RegisterPage.GetUserById(
        getlocalStorage?._id
      );
      setProfileDetails(userDataResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (ProfileDetails) {
      getOrderData();
      getClub();
      getPlan();
      fetchContentsAllList();
    }
  }, [ProfileDetails]);

  useEffect(() => {
    setMergeData([...Club, ...Content]);
  }, [Club, Content, Plan]);

  const getOrderData = async () => {
    try {
      const res = await http.get("/getorder");
      if (res.status === 200) {
        const filteredData = res.data.filter(
          (ele) => ele?.userid === ProfileDetails?._id
        );

        filteredData.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        );

        setOrderData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const fetchContentsAllList = async () => {
    try {
      const listOfMovie = await http.get(`/contents/getdata`);
      if (listOfMovie.status === 200) {
        setContent(listOfMovie.data.data);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  const getPlan = async () => {
    try {
      const plan = await PlanServicePage.getAllPlan();
      setPlan(plan);
    } catch (error) {
      console.error("Error fetching plan data:", error);
    }
  };

  const getClub = async () => {
    try {
      const res = await http.get(`/offer/getalldata`);
      if (res.status === 200) {
        setClub(res.data);
      }
    } catch (error) {
      console.error("Error fetching club data:", error);
    }
  };

  return (
    <div
      className="row m-auto bg-mg"
      style={{ minHeight: "100vh", maxHeight: "fit-content" }}
    >
      {OrderData.length > 0 ? (
        <>
          <div className="col-md-4">
            <p className="text-bold fs-2 text-white">Plan History</p>
            {ProfileDetails?.plan?.map((ele) => {
              const currentdate = new Date();
              const expiryDate = new Date(ele.expiryddate);
              const isMovieExpired = currentdate > expiryDate;

              return (
                <div key={ele._id} className="row mb-4 shadow history-gry">
                  <div className={` ${isMovieExpired ? "expired-item" : ""}`}>
                    <p className="text-white">Plan Type: {ele.planType}</p>
                    <p className="text-white">Amount: {ele.amount}</p>
                    <p className="text-white">
                      Purchase Date:{" "}
                      {moment(ele.purchaseddate).format("DD-MM-YY")}
                    </p>
                  </div>
                  {isMovieExpired ? (
                    <p className="color-re">Validity Expired</p>
                  ) : (
                    <p className="text-white">
                      Valid Till: {moment(expiryDate).format("DD-MM-YY")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <p className="text-bold fs-2 text-white">Content History</p>

            {OrderData?.filter((ele) =>
              MergeData.find((conte) => conte._id === ele.purchseId)
            ).map((ele) => {
              const matchingItem = MergeData.find(
                (conte) => conte._id === ele.purchseId
              );
              const currentdate = new Date();
              const purchaseDate = new Date(ele.pruchaseDate);

              console.log("Purchase Date:", ele);

              const expiryDate = moment(purchaseDate)
                .add(matchingItem.validity, "days")
                .endOf("day")
                .toDate();

              const isMovieExpired = currentdate > expiryDate;
              console.log(purchaseDate, "expiryDate");
              return (
                <div
                  key={ele._id}
                  className={`row mb-4 shadow history-gry ${
                    isMovieExpired ? "expired-item" : ""
                  }`}
                >
                  <div>
                    <img
                      width={200}
                      src={matchingItem.banner}
                      alt={matchingItem.title}
                    />
                    <p className="text-white">
                      Plan Type: {matchingItem.title}
                    </p>
                    <p className="text-white">Amount: {ele.amount}</p>
                    <p className="text-white">
                      validity: {matchingItem.validity}
                    </p>
                    <p className="text-white">
                      Purchase Date:{" "}
                      {moment(ele.purchaseddate).format("DD-MM-YY")}
                    </p>
                  </div>
                  {isMovieExpired ? (
                    <p className="color-re">Validity Expired</p>
                  ) : (
                    <p className="text-white">
                      Valid Till: {moment(expiryDate).format("DD-MM-YY")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="row  text-center m-auto">
          <h3 className="text-white "> Not Found Purchased</h3>
        </div>
      )}
    </div>
  );
};

export default MyHistory;
