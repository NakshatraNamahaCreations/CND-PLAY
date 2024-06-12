import React from "react";
import "./assets/css/index.css";

import DistrictsList from "./components/districtslist";
import GenresList from "./components/genreslist";
import LanguageList from "./components/languagelist";

const Generalpage = () => {
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="container-fluid mt-1">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="districts-tab"
                data-bs-toggle="tab"
                data-bs-target="#districts-tab-pane"
                type="button"
                role="tab"
                aria-controls="districts-tab-pane"
                aria-selected="true"
              >
                Districts
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="genres-tab"
                data-bs-toggle="tab"
                data-bs-target="#genres-tab-pane"
                type="button"
                role="tab"
                aria-controls="genres-tab-pane"
                aria-selected="false"
              >
                Genres
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="language-tab"
                data-bs-toggle="tab"
                data-bs-target="#language-tab-pane"
                type="button"
                role="tab"
                aria-controls="language-tab-pane"
                aria-selected="false"
              >
                Language
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="districts-tab-pane"
              role="tabpanel"
              aria-labelledby="districts-tab"
              tabIndex="0"
            >
              <DistrictsList />
            </div>
            <div
              className="tab-pane fade"
              id="genres-tab-pane"
              role="tabpanel"
              aria-labelledby="genres-tab"
              tabIndex="0"
            >
              <GenresList />
            </div>
            <div
              className="tab-pane fade"
              id="language-tab-pane"
              role="tabpanel"
              aria-labelledby="language-tab"
              tabIndex="0"
            >
              <LanguageList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generalpage;
