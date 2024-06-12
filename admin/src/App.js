import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Homepage from './homepage/homepage.class';
// import Homepage from "./homepage/homepage.function";
// import Pages from './pages/pages.function';
import Contents from "./contents/contents.function";
import General from "./general/general.function";
import Reports from "./reports/reports.function";
import Settings from "./settings/settings.function";
import Usermanagementpage from "./usermanagementpage/usermanagementpage";

import Login from "./login/login";
import Register from "./register/register";

import HeaderComponent from "./templates/header";
import SidebarComponent from "./templates/sidebar";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./templates/Dashboard";
import ChartDemo from "./templates/ChartDemo";

const App = () => {
  const user = JSON.parse(sessionStorage.getItem("auth_response"));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user && user.status && user.status === 1 ? (
                <div id="container-scroller" class="container-scroller">
                  <SidebarComponent />
                  <div className="ccontainer-fluid page-body-wrapper">
                    <HeaderComponent />
                    <Contents />
                  </div>
                </div>
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <div id="container-scroller" class="container-scroller">
                <SidebarComponent />
                <div className="ccontainer-fluid page-body-wrapper">
                  <HeaderComponent />
                  <Dashboard />
                </div>
              </div>
            }
          />
          <Route
            path="/usermanagement"
            element={
              <div id="container-scroller" class="container-scroller">
                <SidebarComponent />
                <div className="ccontainer-fluid page-body-wrapper">
                  <HeaderComponent />
                  <Usermanagementpage />
                </div>
              </div>
            }
          />
          <Route
            path="/contents"
            element={
              <div id="container-scroller" class="container-scroller">
                <SidebarComponent />
                <div className="ccontainer-fluid page-body-wrapper">
                  <HeaderComponent />
                  <Contents />
                </div>
              </div>
            }
          />
          <Route
            path="/general"
            element={
              <div id="container-scroller" class="container-scroller">
                <SidebarComponent />
                <div className="ccontainer-fluid page-body-wrapper">
                  <HeaderComponent />
                  <General />
                </div>
              </div>
            }
          />

          <Route
            path="/reports"
            element={
              <div id="container-scroller" class="container-scroller">
                <SidebarComponent />
                <div className="ccontainer-fluid page-body-wrapper">
                  <HeaderComponent />
                  <Reports />
                </div>
              </div>
            }
          />
          <Route
            path="/settings"
            element={
              <div id="container-scroller" class="container-scroller">
                <SidebarComponent />
                <div className="ccontainer-fluid page-body-wrapper">
                  <HeaderComponent />
                  <Settings />
                </div>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chartdemo" element={<ChartDemo />} />
          
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
