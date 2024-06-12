// import React from 'react';

// const HeaderComponent = () => {
// 	return(
// 	);
// }

// export default HeaderComponent;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Logo from "./assets/images/logo.png";

const HeaderComponent = () => {
  const user = JSON.parse(sessionStorage.getItem("auth_response"));

  const initial_data = {
    name: user?.username,
    image: Logo,
  };
  const initial_app_data = {
    homepage_url: "/",
    logo: Logo,
  };
  const [user_info, setUserInfo] = useState(initial_data);
  const [app_info, setAppInfo] = useState(initial_app_data);
  return (
    <>
      <nav class="navbar p-0 fixed-top d-flex flex-row">
        <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <a class="navbar-brand brand-logo-mini" href={app_info.homepage_url}>
            <img src={app_info.logo} alt="logo1" />
          </a>
        </div>
        <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          {/* <button class="navbar-toggler align-self-center" type="button"><span class="mdi mdi-menu"></span></button>
						<ul class="navbar-nav w-100">
							<li class="nav-item w-100">
								<form class="nav-link mt-2 mt-md-0 d-none d-lg-flex search"><input type="text" class="form-control" placeholder="Search products" /></form>
							</li>
						</ul> */}
          <ul class="navbar-nav navbar-nav-right">
            {/* <li class="nav-item d-none d-lg-block dropdown"><button aria-haspopup="true" aria-expanded="false" type="button" class="nav-link btn btn-success create-new-button no-caret dropdown-toggle btn btn-primary">+ Create New Project</button></li>
							<li class="nav-item d-none d-lg-block"><a class="nav-link" href="!#"><i class="mdi mdi-view-grid"></i></a></li>
							<li class="nav-item border-left dropdown"><a class="nav-link count-indicator cursor-pointer dropdown-toggle" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-email"></i><span class="count bg-success"></span></a></li>
							<li class="nav-item border-left dropdown"><a class="nav-link count-indicator cursor-pointer dropdown-toggle" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-bell"></i><span class="count bg-danger"></span></a></li> */}
            <li class="nav-item dropdown">
              <a
                class="nav-link cursor-pointer no-caret dropdown-toggle"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="navbar-profile">
                  <img
                    class="img-xs rounded-circle"
                    src={user_info?.image}
                    alt="profile"
                  />
                  <p class="mb-0 d-none d-sm-block navbar-profile-name">
                    {user_info?.name}
                  </p>
                  {/* <i class="mdi mdi-menu-down d-none d-sm-block"></i> */}
                </div>
              </a>
            </li>
          </ul>
          <button
            class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
          >
            <span class="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default HeaderComponent;
