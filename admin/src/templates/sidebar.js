// import React from 'react';

// const SidebarComponent = () => {
// 	return(
// 	);
// }

// export default SidebarComponent;

import React from "react";

import Logo from "./assets/images/logo.png";

const SidebarComponent = () => {
  const user = JSON.parse(sessionStorage.getItem("auth_response"));
  const initial_data = {
    name: user?.username,
    image: Logo,
  };
  // const initial_app_data = {
  //   homepage_url: "/",
  //   logo: Logo,
  // };
  return (
    <>
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          {/* <a class="sidebar-brand brand-logo" href="index.html">
            <img className="app-logo" src={Logo} alt="logo" />
          </a> */}
          <a class="sidebar-brand brand-logo-mini" href="/">
            <img className="app-logo" src={Logo} alt="logo" />
          </a>
        </div>
        <ul class="nav">
          <li class="nav-item profile">
            <div class="profile-desc">
              <div class="profile-pic">
                <div class="count-indicator">
                  {/* <img
                    class="img-xs rounded-circle "
                    src={Logo}
                    alt="profile"
                  /> */}
                  {/* <span class="count bg-success"></span> */}
                </div>
                <div class="profile-name">
                  <h5 class="mb-0 font-weight-normal">
                    {initial_data?.username}
                  </h5>
                  <span>{initial_data?.user_type}</span>
                </div>
              </div>
              {/* <div class="dropdown">
                <a className="cursor-pointer no-caret dropdown-toggle">
                  <i class="mdi mdi-dots-vertical"></i>
                </a>
                <div className="row">
                  hello
                </div>
              </div> */}
            </div>
          </li>
          <li class="nav-item nav-category">
            <span class="nav-link">Navigation</span>
          </li>
          <li class="nav-item menu-items">
            <a class="nav-link" href="/dashboard">
              <span class="menu-icon">
                <i class="mdi mdi-desktop-mac"></i>
              </span>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>

          <li class="nav-item menu-items">
            <a class="nav-link" href="/general">
              <span class="menu-icon">
                <i class="mdi mdi-desktop-mac"></i>
              </span>
              <span class="menu-title">General</span>
            </a>
          </li>

          <li class="nav-item menu-items">
            <a class="nav-link" href="/contents">
              <span class="menu-icon">
                <i class="mdi mdi-desktop-mac"></i>
              </span>
              <span class="menu-title">Projects</span>
            </a>
          </li>
          {/* <li class="nav-item menu-items">
            <a class="nav-link" href="/reports">
              <span class="menu-icon">
                <i class="mdi mdi-desktop-mac"></i>
              </span>
              <span class="menu-title">Reports</span>
            </a>
          </li> */}
          <li class="nav-item menu-items">
            <a class="nav-link" href="/settings">
              <span class="menu-icon">
                <i class="mdi mdi-desktop-mac"></i>
              </span>
              <span class="menu-title">Settings</span>
            </a>
          </li>
          {/* <li class="nav-item menu-items">
            <a class="nav-link" href="/usermanagement">
              <span class="menu-icon">
                <i class="mdi mdi-desktop-mac"></i>
              </span>
              <span class="menu-title">User Management</span>
            </a>
          </li> */}
        </ul>
      </nav>
    </>
  );
};

export default SidebarComponent;
