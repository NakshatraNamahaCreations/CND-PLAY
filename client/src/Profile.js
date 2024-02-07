import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RegisterPage from "./DataApi/Register";
const Profile = () => {
  let authResponseString = localStorage.getItem("auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [ProfileDetails, setProfileDetails] = useState();
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const userDataResponse = await RegisterPage.GetUserById(
      getlocalStorage._id
    );

    setProfileDetails(userDataResponse);
  };

  return (
    <div className="w-100 bg-mg " style={{ height: "100vh" }}>
      <div className="row w-100 mx-0">
        <div className="col-lg-7 ">
          <div
            className="card text-left py-3 px-4 px-sm-5 mt-3"
            style={{ backgroundColor: "#191c24" }}
          >
            <div className="row">
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
                <span className="row text_White me-2">
                  {ProfileDetails?.email}
                </span>
                <div className="row">
                  <Link
                    to="/Register"
                    state={{ idd: getlocalStorage._id, isEditProfile: "edit" }}
                    className="text_White  "
                  >
                    <span style={{ color: "blue" }}> Edit Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
