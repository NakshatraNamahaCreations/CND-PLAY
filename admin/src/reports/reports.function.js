import React from "react";
import "./assets/css/index.css";

import SettingsList from './components/projectlist';
import SeriesList from './components/serieslist';

import EpisodesList from './components/episodeslist';
import VideosList from './components/videoslist';

const Settingspage = () => {
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="container-fluid mt-1">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="project-tab"
                data-bs-toggle="tab"
                data-bs-target="#project-tab-pane"
                type="button"
                role="tab"
                aria-controls="project-tab-pane"
                aria-selected="true"
              >
                Projects
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="series-tab"
                data-bs-toggle="tab"
                data-bs-target="#series-tab-pane"
                type="button"
                role="tab"
                aria-controls="series-tab-pane"
                aria-selected="false"
              >
                Series
              </button>
            </li>
            <li className="nav-item" role="presentation">
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
                Episodes
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="videos-tab"
                data-bs-toggle="tab"
                data-bs-target="#videos-tab-pane"
                type="button"
                role="tab"
                aria-controls="videos-tab-pane"
                aria-selected="false"
              >
                Videos
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="project-tab-pane"
              role="tabpanel"
              aria-labelledby="project-tab"
              tabIndex="0"
            >
              {/* <SettingsFilter />  */}
             <SettingsList />
            </div>
            <div
              className="tab-pane fade"
              id="series-tab-pane"
              role="tabpanel"
              aria-labelledby="series-tab"
              tabIndex="0"
            >
              {/* <SeriesFilter /> */}
              <SeriesList />
            </div>
            <div
              className="tab-pane fade"
              id="episodes-tab-pane"
              role="tabpanel"
              aria-labelledby="episodes-tab"
              tabIndex="0"
            >
              {/* <EpisodesFilter /> */}
              <EpisodesList />
            </div>
            <div
              className="tab-pane fade"
              id="videos-tab-pane"
              role="tabpanel"
              aria-labelledby="videos-tab"
              tabIndex="0"
            >
              {/* <VideosFilter /> */}
              <VideosList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settingspage;
