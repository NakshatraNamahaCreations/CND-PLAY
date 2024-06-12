import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RegisterPage from "./DataApi/Register";
import moment from "moment";
const Profile = () => {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [ProfileDetails, setProfileDetails] = useState();
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const userDataResponse = await RegisterPage.GetUserById(
      getlocalStorage?._id
    );
    console.log(userDataResponse);
    setProfileDetails(userDataResponse);
  };
  const [reversedPlans, setReversedPlans] = useState([]);

  useEffect(() => {
    if (Array.isArray(ProfileDetails?.plan)) {
      ProfileDetails.plan.reverse();
      setReversedPlans(ProfileDetails.plan);
    }
  }, [ProfileDetails]);
  console.log(reversedPlans);

  const expiryMomentMidnight = moment(reversedPlans?.[0]?.expiryddate).endOf(
    "day"
  );
  const expiryDateFormatted = expiryMomentMidnight.format("DD-MM-YY");

  const now = moment();
  const isExpired = now.isAfter(expiryMomentMidnight);

  return (
    <div className="w-100 bg-mg " style={{ height: "100vh" }}>
      <div className="row w-100 mx-0 ">
        <div className="col-lg-10 col-md-10 m-auto">
          {/* <div
            className="card text-left py-3 px-4 px-sm-5 mt-3"
            // style={{ backgroundColor: "#191c24" }}
          > */}
          <div className="row ">
            <div
              style={{
                backgroundColor: "#191c54",
                borderRadius: "100px",
                width: "80px",
                height: "80px",
              }}
              className="text_White text-center "
            >
              <h1 className="mt-3">
                {ProfileDetails?.username?.charAt(0)?.toUpperCase()}
              </h1>
            </div>
            <div className="col-md-6 m-auto">
              <p className="row text_White me-2">
                Your Name: {ProfileDetails?.username}
              </p>
              <p className="row text_White me-2">
                Email Id :  {ProfileDetails?.email}
              </p>

              <p className="row text_White me-2">
                Phone No : {ProfileDetails?.phone}
              </p>
              <p className="row text_White me-2">
                Gender : {ProfileDetails?.gender}
              </p>
              <p className="row text_White me-2">
                District : {ProfileDetails?.district}
              </p>
              {reversedPlans?.[0] && (
                <>
                  <p className="row text_White me-2">
                    Your Plan : {reversedPlans?.[0]?.planType}
                  </p>
                  <p className="row text_White me-2">
                    Purchased Date :{" "}
                    {moment(reversedPlans?.[0]?.purchaseddate).format(
                      "MMMM Do YYYY"
                    )}
                  </p>
                  <p className="row text_White me-2">
                    Validity :{" "}
                    {!isExpired
                      ? moment(reversedPlans?.[0]?.expiryddate).format(
                        "MMMM Do YYYY"
                      )
                      : "Expired"}
                  </p>
                </>
              )}

              <div className="row">
                <Link
                  to="/Register"
                  state={{ idd: getlocalStorage?._id, isEditProfile: "edit" }}
                  className="text_White  "
                >
                  <span className="text-bold " style={{ color: "#FF0000" }}> Edit Profile</span>
                </Link>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
