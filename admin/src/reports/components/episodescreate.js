import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Files from "react-files";
import EpisodesFilter from "./episodesfilter";
import { retrieveProject, fileUpload } from "../actions/project";
import { retrieveSeries } from "../actions/series";
import EpisodesPageService from "../service/episodespage.service";
import "react-toastify/dist/ReactToastify.css";
import SeriesPageService from "../../reports/service/seriespage.service";
const EpisodesCreate = forwardRef((props, ref) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [is_uploading, setUploading] = useState(false);
  const [seriesData, setseries_data] = useState([]);
  useEffect(() => {
    fetchData1();
  }, []);
  const fetchData1 = async () => {
    let data = await SeriesPageService.getDataforEpisodes();
    setseries_data(data);
    
  };

  const initialEpisodesData = {
    seriesName: "",
    episodes_name: "",
    storyline: "",
    title: "",
    series_id: "",
    video: "",
    banner: "",
    episodeNo: "",
    duration: "",
    releaseDate: "",
  };

  const [episodes_data, set_episodes_data] =
    React.useState(initialEpisodesData);

  const [SeriesName, setSeriesName] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);

  React.useImperativeHandle(ref, () => ({
    showEpisodesCreateChildModal(single_episodes_data) {
      setEdit(true);
      showEpisodesCreateModal();

      set_episodes_data({
        id: single_episodes_data?.id,
        seriesName: single_episodes_data?.seriesName,
        episodes_name: single_episodes_data?.episodes_name,
        storyline: single_episodes_data?.storyline,
        thumbnail: single_episodes_data?.thumbnail,
        series_id: single_episodes_data?.series_id,
        video: single_episodes_data?.video,
        title: single_episodes_data?.title,
        banner: single_episodes_data.banner,
        duration: single_episodes_data?.duration,
        episodeNo: single_episodes_data.episodeNo,
        releaseDate: single_episodes_data.releaseDate,
      });
    },
  }));
  const handleChange = async (event) => {
    const { name, value } = event.target;

    // const selectedSeries = seriesData.find((series) => series._id === value);

    set_episodes_data({
      ...episodes_data,
      [name]: value,
    });
  };

  const showEpisodesCreateModal = () => {
    set_episodes_data(initialEpisodesData);
    setShowModal("show");
  };
  const showEpisodesFilter = (status) => {
    set_episodes_data(initialEpisodesData);
    // setShowModal('show');
    setShowFilter(status);
  };
  const hideEpisodesCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };
  const handleSubmitNewEpisodesCreateFunc = () => {
    let formData = new FormData();
    formData.append("seriesName", SeriesName);
    formData.append("episodes_name", episodes_data?.episodes_name);
    formData.append("storyline", episodes_data?.storyline);
    formData.append("thumbnail", thumbnail);
    formData.append("video", episodes_data?.video);
    formData.append("title", episodes_data?.title);
    formData.append("series_id", episodes_data?.series_id);
    formData.append("banner", episodes_data?.banner);
    formData.append("duration", episodes_data?.duration);
    formData.append("episodeNo", episodes_data?.episodeNo);
    formData.append("releaseDate", episodes_data?.releaseDate);

    EpisodesPageService.createEpisodes(formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Episode created");
          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingEpisodesUpdateFunc = () => {
    if (episodes_data.id) {
      EpisodesPageService.updateEpisodes(episodes_data, episodes_data.id)
        .then((response) => {
          alert("Episode updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating Episode ", error);
        });
    } else {
      console.error("Error: Episode.id is undefined");
    }
  };
  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showEpisodesFilter(!showFilter)}
        ></i> */}
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showEpisodesCreateModal}
        ></i>
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <EpisodesFilter /> : ""}</div>
      </div>
      {showModal == "show" ? (
        <div className="modal-backdrop fade show"></div>
      ) : (
        ""
      )}
      <div
        className={`modal fade f-OpenSans fs-14px ${showModal} `}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        id="episodesCreate"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="episodesCreateTitle"
              >
                Create Episodes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideEpisodesCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="episodes_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Series</label>
                      <select
                        className="form-select "
                        id="series_id"
                        name="series_id"
                        value={
                          !is_edit
                            ? seriesData?.series_id
                            : episodes_data?.series_id
                        }
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Series - </option>
                        {seriesData && seriesData && seriesData?.length > 0
                          ? seriesData.map((value, index) => {
                            return (
                              <option value={value?._id}>
                                {" "}
                                {value.title}{" "}
                              </option>
                            );
                          })
                          : ""}
                      </select>
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="title"
                        name="title"
                        value={episodes_data.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Episode Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="episodes_name"
                        name="episodes_name"
                        value={episodes_data.episodes_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Episode No</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="episodeNo"
                        name="episodeNo"
                        value={episodes_data.episodeNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Release Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        id="releaseDate"
                        name="releaseDate"
                        value={episodes_data.releaseDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label"> duration</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="duration"
                        name="duration"
                        value={episodes_data.duration}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label"> Banner</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="banner"
                        name="banner"
                        value={episodes_data.banner}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label"> Video</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="video"
                        name="video"
                        value={episodes_data.video}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">storyline</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows="4"
                        id="storyline"
                        name="storyline"
                        value={episodes_data.storyline}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-2 col-md-4">
                      Thumbnail
                      <label className="form-label">
                        <input
                          type="file"
                          name="thumbnail"
                          onChange={(e) => {
                            setThumbnail(e.target.files[0]);
                            setUploading(true);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default f-OpenSans fs-12px"
                data-bs-dismiss="modal"
                onClick={hideEpisodesCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewEpisodesCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingEpisodesUpdateFunc}
                >
                  Update changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EpisodesCreate;
