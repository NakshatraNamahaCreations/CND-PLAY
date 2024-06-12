import React from "react";
import "./assets/css/index.css";

import BasicSettingsList from "./components/basicsettingslist";
import PaymentCredentialSetupList from "./components/paymentcredentialsetuplist";
import PlanSetupList from "./components/planslist";
import OfferList from "./components/OfferList";

// import EpisodesList from './components/episodeslist';
// import VideosList from './components/videoslist';

const Settingspage = () => {
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="container-fluid mt-1">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              {/* <button
                className="nav-link active"
                id="basic-settings-tab"
                data-bs-toggle="tab"
                data-bs-target="#basic-settings-tab-pane"
                type="button"
                role="tab"
                aria-controls="basic-settings-tab-pane"
                aria-selected="true"
              >
                Settings
              </button> */}
              <button
                className="nav-link active"
                id="basic-settings-tab"
                data-bs-toggle="tab"
                data-bs-target="#basic-settings-tab-pane"
                type="button"
                role="tab"
                aria-controls="basic-settings-tab-pane"
                aria-selected="true"
              >
                Plans
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="payment-credentials-tab"
                data-bs-toggle="tab"
                data-bs-target="#payment-credentials-tab-pane"
                type="button"
                role="tab"
                aria-controls="payment-credentials-tab-pane"
                aria-selected="false"
              >
                Offer
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="episodes-tab"
                data-bs-toggle="tab"
                data-bs-target="#episodes-tab-pane"
                type="button"
                role="tab"
                aria-controls="episodes-tab-pane"
                aria-selected="false"
              >
                Plans
              </button>
            </li> */}
          </ul>
          <div className="tab-content" id="myTabContent">
            {/* <div
              className="tab-pane fade show active"
              id="basic-settings-tab-pane"
              role="tabpanel"
              aria-labelledby="basic-settings-tab"
              tabIndex="0"
            >
              <BasicSettingsList />
            </div>
            <div
              className="tab-pane fade"
              id="payment-credentials-tab-pane"
              role="tabpanel"
              aria-labelledby="payment-credentials-tab"
              tabIndex="0"
            >
              <PaymentCredentialSetupList />
            </div> */}
            <div
              className="tab-pane fade show active"
              id="basic-settings-tab-pane"
              role="tabpanel"
              aria-labelledby="basic-settings-tab"
              tabIndex="0"
            >
              <PlanSetupList />
            </div>
            <div
              className="tab-pane fade"
              id="payment-credentials-tab-pane"
              role="tabpanel"
              aria-labelledby="payment-credentials-tab"
              tabIndex="0"
            >
              <OfferList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settingspage;
