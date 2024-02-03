import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Files from "react-files";
import EpisodesFilter from "./episodesfilter";
import { retrieveProject, fileUpload } from "../actions/project";
import { retrieveSeries } from "../actions/series";
import EpisodesPageService from "../service/episodespage.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeriesPageService from "../service/seriespage.service";
import ProjectPageService from "../service/projectpage.service";
const EpisodesCreate = forwardRef((props, ref) => {
  //   const episodes_project_data = useSelector(
  //     (state) => state.ProjectReducer,
  //     shallowEqual
  //   );
  //   const episodes_data = useSelector(
  //     (state) => state.SeriesReducer,
  //     shallowEqual
  //   );
  //   const [file, setFile] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [is_uploading, setUploading] = useState(false);
  // const insert_response = useSelector(state => state.EpisodesReducer, shallowEqual);
  //   const file_upload_response = useSelector(
  //     (state) => state.FileUploadReducer,
  //     shallowEqual
  //   );
  //   const dispatch = useDispatch();
  const [seriesData, setseries_data] = useState([]);
  const [Projectdata, setProjectdata] = useState([]);
  useEffect(() => {
    let data = {
      // status: 1,
      is_delete: 0,
    };
    fetchData1();
    fetchData2();
  }, []);
  const fetchData1 = async () => {
    let seriesd = await SeriesPageService.fetchSeriesList();
    setseries_data(seriesd);
  };
  const fetchData2 = async () => {
    let data = await ProjectPageService.fetchProjectdata();
    setProjectdata(data);
  };

  const initialEpisodesData = {
    ch_id: "1",
    episodes_name: "",
    description: "",
    thumbnail: "",
    project_id: "",
    series_id: "",
  };

  const [episodes_data, set_episodes_data] =
    React.useState(initialEpisodesData);

  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);

  React.useImperativeHandle(ref, () => ({
    showEpisodesCreateChildModal(single_episodes_data) {
      setEdit(true);
      showEpisodesCreateModal();
      set_episodes_data({
        id: single_episodes_data?.id,
        ch_id: single_episodes_data?.ch_id,
        episodes_name: single_episodes_data?.episodes_name,
        description: single_episodes_data?.description,
        thumbnail: single_episodes_data?.thumbnail,
        series_id: single_episodes_data?.series_id,
        project_id: single_episodes_data?.project_id,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_episodes_data({ ...episodes_data, [name]: value });
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
    formData.append("ch_id", episodes_data?.project_id);
    formData.append("episodes_name", episodes_data?.episodes_name);
    formData.append("description", episodes_data?.description);
    formData.append("thumbnail", thumbnail);
    formData.append("project_id", episodes_data?.project_id);
    formData.append("series_id", episodes_data?.series_id);
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
        <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showEpisodesFilter(!showFilter)}
        ></i>
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
                      <label className="form-label">Project</label>
                      <select
                        className="form-select "
                        id="project_id"
                        name="project_id"
                        value={
                          !is_edit
                            ? Projectdata?.project_id
                            : episodes_data?.project_id
                        }
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Project - </option>
                        {Projectdata && Projectdata && Projectdata?.length > 0
                          ? Projectdata.map((value, index) => {
                              return (
                                <option value={value.id}>
                                  {" "}
                                  {value.project_name}{" "}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Series</label>
                      <select
                        className="form-select "
                        id="series_id"
                        name="series_id"
                        value={
                          !is_edit
                            ? seriesData.series_id
                            : episodes_data.series_id
                        }
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Series - </option>
                        {seriesData &&
                        seriesData.data &&
                        seriesData.data?.length > 0
                          ? seriesData.data.map((value, index) => {
                              return (
                                <option value={value.id}>
                                  {" "}
                                  {value.series_name}{" "}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Episodes Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="episodes_name"
                        name="episodes_name"
                        value={episodes_data.episodes_name}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows="4"
                        id="description"
                        name="description"
                        value={episodes_data.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">
                        Thumbnail
                        {is_uploading === "episodes_thumbnail" ? (
                          <i className="mdi mdi-30px mdi-spin mdi-loading"></i>
                        ) : is_uploading ===
                          "episodes_thumbnail_upload_success" ? (
                          <i className="mdi mdi-30px mdi-attachment"></i>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        type="file"
                        name="thumbnail"
                        onChange={(e) => {
                          setThumbnail(e.target.files[0]);
                          setUploading(true);
                        }}
                      />
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
