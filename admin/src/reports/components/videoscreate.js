import React, { useState, useEffect, forwardRef } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
import VideosFilter from "./videosfilter";

import EpisodesPageService from "../service/episodespage.service";
import SeriesPageService from "../service/seriespage.service";
import ProjectPageService from "../service/projectpage.service";
import VideosPageService from "../service/videospage.service";
import "react-toastify/dist/ReactToastify.css";

const VideosCreate = forwardRef((props, ref) => {
  const [project_data, set_project_data] = useState([]);
  const [Seriesdata, set_Seriesdata] = useState([]);
  const [episodesdata, set_episodesdata] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let projects = await ProjectPageService.fetchProjectdata();
    let episodes = await EpisodesPageService.fetchEpisodesList();
    let series = await SeriesPageService.fetchSeriesList();
    set_project_data(projects);
    set_episodesdata(episodes.data);
    set_Seriesdata(series.data);
  };

  const initialVideosData = {
    ch_id: "",
    project_id: "",
    series_id: "",
    episodes_id: "",
    videos_name: "",
    description: "",
    thumbnail: "",
    vidfile: "",
    duration: "",
    origin: "",
  };

  const [videos_data, set_videos_data] = React.useState(initialVideosData);
  const [thumbnail, setThumbnail] = useState(null);
  const [vidfile, setvidfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [is_uploading, setUploading] = useState(false);
  const [is_video_uploading, setVideoLoading] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showVideosCreateChildModal(single_videos_data) {
      setEdit(true);
      showVideosCreateModal();
      set_videos_data({
        id: single_videos_data?.id,
        ch_id: single_videos_data?.ch_id,
        videos_name: single_videos_data?.videos_name,
        description: single_videos_data?.description,
        episodes_id: single_videos_data?.episodes_id,
        series_id: single_videos_data?.series_id,
        project_id: single_videos_data?.project_id,
        thumbnail: single_videos_data?.thumbnail,
        vidfile: single_videos_data?.videofile,
        duration: single_videos_data?.duration,
        origin: single_videos_data?.origin,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_videos_data({ ...videos_data, [name]: value });
  };
  const showVideosCreateModal = () => {
    set_videos_data(initialVideosData);
    setShowModal("show");
  };
  const showVideosFilter = (status) => {
    set_videos_data(initialVideosData);
    setShowFilter(status);
  };
  const hideVideosCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };
  const handleSubmitNewVideosCreateFunc = () => {
    let formData = new FormData();
    formData.append("ch_id", videos_data?.ch_id);
    formData.append("project_id", videos_data?.project_id);
    formData.append("series_id", videos_data?.series_id);
    formData.append("episodes_id", videos_data?.episodes_id);
    formData.append("description", videos_data?.description);
    formData.append("videos_name", videos_data?.videos_name);
    formData.append("duration", videos_data?.duration);
    formData.append("origin", videos_data?.origin);
    formData.append("thumbnail", thumbnail);
    formData.append("videofile", vidfile);

    VideosPageService.createVideos(formData)
      .then((response) => {
        if (response.status === 200) {
          alert("video created");
          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingVideosUpdateFunc = () => {
    if (videos_data.id) {
      VideosPageService.updateVideos(videos_data, videos_data.id)
        .then((response) => {
          alert("Video updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating Episode ", error);
        });
    } else {
      console.error("Error: Episode.id is undefined");
    }
  };
  // const handleSubmitNewVideosCreateFunc = () => {
  //   // set_videos_data({ ...videos_data, thumbnail });
  //   // dispatch(createVideos(videos_data))
  //   //   .then((data) => {
  //   //     setEdit(false);
  //   //     setShowModal(false);
  //   //     setSubmitted(true);
  //   //     if (data.data.insertId > 0 || data.payload.data.changedRows > 0) {
  //   //       hideVideosCreateModal();
  //   //       toast.success("Successfully Saved.");
  //   //       dispatch(retrieveVideos({ is_delete: 0 }));
  //   //     } else {
  //   //       toast.error("Something Wrong. Please Try Again.");
  //   //     }
  //   //   })
  //   //   .catch((e) => {
  //   //    //  console.log(e);
  //   //   });
  // };

  const handleChangeVideoUpload = (event) => {
    // setVideoLoading("video_file");
    // const { name, files } = event.target;
    // // console.log(files[0]['name'])
    // const formData = new FormData();
    // formData.append("file", files[0]);
    // formData.append("name", files[0]["name"]);
    // dispatch(fileUpload(formData))
    //   .then((data) => {
    //     setVideoLoading("video_file_upload_success");
    //     // console.log("fileUpload", data)
    //     if (data.data[0]["path"])
    //       set_videos_data({
    //         ...videos_data,
    //         ["video_path"]: data.data[0]["path"],
    //       });
    //     dispatch(retrieveVideos({ is_delete: 0 }));
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
    // set_videos_data({ ...videos_data, [name]: formData });
  };

  // const handleSubmitExistingVideosUpdateFunc = () => {
  //   // if (
  //   //   file_upload_response &&
  //   //   file_upload_response.length > 0 &&
  //   //   file_upload_response.data[0]["path"]
  //   // )
  //   //   set_videos_data({
  //   //     ...videos_data,
  //   //     ["thumbnail"]: file_upload_response.data[0]["path"],
  //   //   });
  //   // dispatch(
  //   //   updateVideos({
  //   //     data: {
  //   //       ch_id: videos_data.ch_id,
  //   //       videos_name: videos_data.videos_name,
  //   //       description: videos_data.description,
  //   //       thumbnail: videos_data.thumbnail,
  //   //     },
  //   //     filter: { id: videos_data.id },
  //   //   })
  //   // )
  //   //   .then((data) => {
  //   //     // console.log(data);
  //   //     setEdit(false);
  //   //     setSubmitted(true);
  //   //     setShowModal(false);
  //   //     if (data.data.insertId > 0 || data.data.affectedRows > 0) {
  //   //       hideVideosCreateModal();
  //   //       toast.success("Successfully Updated.");
  //   //       dispatch(retrieveVideos({ is_delete: 0 }));
  //   //     } else {
  //   //       toast.error("Something Wrong. Please Try Again.");
  //   //     }
  //   //   })
  //   //   .catch((e) => {
  //   //    //  console.log(e);
  //   //   });
  // };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <button type="button" className="btn btn-primary btn-sm pull-right mt-1 mb-1" onClick={showVideosCreateModal}> */}
        {/* Create */}
        {/* <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showVideosFilter(!showFilter)}
        ></i> */}
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showVideosCreateModal}
        ></i>
        {/* </button> */}
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <VideosFilter /> : ""}</div>
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
        id="videosCreate"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="videosCreateTitle"
              >
                Create Videos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideVideosCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="videos_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Project</label>
                      <select
                        className="form-select "
                        id="project_id"
                        name="project_id"
                        value={
                          !is_edit
                            ? project_data?.project_id
                            : videos_data?.project_id
                        }
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Project - </option>
                        {project_data && project_data && project_data.length > 0
                          ? project_data?.map((value, index) => {
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
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Series</label>
                      <select
                        className="form-select "
                        id="series_id"
                        name="series_id"
                        value={
                          !is_edit
                            ? Seriesdata?.series_id
                            : videos_data?.series_id
                        }
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Series - </option>
                        {Seriesdata && Seriesdata && Seriesdata.length > 0
                          ? Seriesdata?.map((value, index) => {
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
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Episodes</label>
                      <select
                        className="form-select "
                        id="episodes_id"
                        name="episodes_id"
                        value={
                          !is_edit
                            ? episodesdata.episodes_id
                            : videos_data.episodes_id
                        }
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Episodes - </option>
                        {episodesdata && episodesdata && episodesdata.length > 0
                          ? episodesdata?.map((value, index) => {
                              return (
                                <option value={value.id}>
                                  {" "}
                                  {value.episodes_name}{" "}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Videos Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="videos_name"
                        name="videos_name"
                        value={videos_data.videos_name}
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
                        value={videos_data.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">
                        Thumbnail{" "}
                        {is_uploading === "video_thumbnail" ? (
                          <i className="mdi mdi-30px mdi-spin mdi-loading"></i>
                        ) : is_uploading ===
                          "video_thumbnail_upload_success" ? (
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
                    <div className="mb-2 col-md-6">
                      <label className="form-label">
                        Video File{" "}
                        {is_video_uploading === "video_file" ? (
                          <i className="mdi mdi-30px mdi-spin mdi-loading"></i>
                        ) : is_video_uploading ===
                          "video_file_upload_success" ? (
                          <i className="mdi mdi-30px mdi-attachment"></i>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        type="file"
                        name="video_path"
                        onChange={(e) => {
                          setvidfile(e.target.files[0]);
                          setVideoLoading(true);
                        }}
                      />
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="duration"
                        name="duration"
                        value={videos_data.duration}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label className="form-label">Origin</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="origin"
                        name="origin"
                        value={videos_data.origin}
                        onChange={handleChange}
                      ></input>
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
                onClick={hideVideosCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewVideosCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingVideosUpdateFunc}
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

export default VideosCreate;
