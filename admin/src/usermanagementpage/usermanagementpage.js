import React from "react";
import "./assets/css/index.css";

import OrganizationFilter from "./components/organizationfilter";
import OrganizationList from "./components/organizationlist";
import UserFilter from "./components/userfilter";
import UserList from "./components/userlist";

const Usermanagementpage = () => {
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="container-fluid mt-1">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                User Management
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Organization Management
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex="0"
            >
              <UserFilter />
              <UserList />
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex="0"
            >
              <OrganizationFilter />
              <OrganizationList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usermanagementpage;
