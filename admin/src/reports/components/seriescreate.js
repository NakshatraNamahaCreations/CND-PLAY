import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Files from "react-files";
import SeriesFilter from "./seriesfilter";
import { retrieveProject, fileUpload } from "../actions/project";
import { retrieveSeries, createSeries, updateSeries } from "../actions/series";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeriesPageService from "../service/seriespage.service";
import ProjectPageService from "../service/projectpage.service";
const SeriesCreate = forwardRef((props, ref) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [is_uploading, setUploading] = useState(false);
  const [project_data, set_project_data] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let data = await ProjectPageService.fetchProjectdata();
   
    set_project_data(data);
  };

  const initialSeriesData = {
    ch_id: "1",
    series_name: "",
    description: "",
    thumbnail: "",
  };

  const [series_data, set_series_data] = React.useState(initialSeriesData);

  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);

  React.useImperativeHandle(ref, () => ({
    showSeriesCreateChildModal(single_series_data) {
      setEdit(true);
      showSeriesCreateModal();
      set_series_data({
        id: single_series_data?.id,
        ch_id: single_series_data?.ch_id,
        series_name: single_series_data?.series_name,
        description: single_series_data?.description,
        thumbnail: single_series_data?.thumbnail,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_series_data({ ...series_data, [name]: value });
  };
  const showSeriesCreateModal = () => {
    set_series_data(initialSeriesData);
    setShowModal("show");
  };
  const showSeriesFilter = (status) => {
    set_series_data(initialSeriesData);
    setShowFilter(status);
  };
  const hideSeriesCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };
  //   const handleSubmitNewSeriesCreateFunc = () => {
  //     // console.log(file_upload_response.data[0]['path'])
  //     if (
  //       file_upload_response &&
  //       file_upload_response.length > 0 &&
  //       file_upload_response.data[0]["path"]
  //     )
  //       set_series_data({
  //         ...series_data,
  //         ["thumbnail"]: file_upload_response.data[0]["path"],
  //       });
  //     dispatch(createSeries(series_data))
  //       .then((data) => {
  //         // console.log(data);
  //         setEdit(false);
  //         setShowModal(false);
  //         setSubmitted(true);
  //         if (data.data.insertId > 0 || data.payload.data.changedRows > 0) {
  //           hideSeriesCreateModal();
  //           toast.success("Successfully Saved.");
  //           // set_series_data(initialSeriesData);
  //           dispatch(retrieveSeries({ is_delete: 0 }));
  //         } else {
  //           toast.error("Something Wrong. Please Try Again.");
  //         }
  //       })
  //       .catch((e) => {
  //        //  console.log(e);
  //       });
  //   };

  const handleSubmitNewSeriesCreateFunc = () => {
    let formData = new FormData();
    formData.append("ch_id", series_data?.ch_id);
    formData.append("series_name", series_data?.series_name);
    formData.append("description", series_data?.description);
    formData.append("thumbnail", thumbnail);

    SeriesPageService.createSeries(formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Series created");
          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingSeriesUpdateFunc = () => {
    if (series_data.id) {
      SeriesPageService.updateSeries(series_data, series_data.id)
        .then((response) => {
          alert("user updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    } else {
      console.error("Error: user.id is undefined");
    }
  };
  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <button type="button" className="btn btn-primary btn-sm pull-right mt-1 mb-1" onClick={showSeriesCreateModal}> */}
        {/* Create */}
        <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showSeriesFilter(!showFilter)}
        ></i>
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showSeriesCreateModal}
        ></i>
        {/* </button> */}
      </div>
      {/* <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <SeriesFilter /> : ""}</div>
      </div> */}
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
        id="seriesCreate"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="seriesCreateTitle"
              >
                Create Series
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideSeriesCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="series_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Project</label>
                      <select
                        className="form-select "
                        id="ch_id"
                        name="ch_id"
                        value={is_edit ? series_data?.ch_id : project_data?.ch_id}
                        onChange={handleChange}
                      >
                        <option value=""> - Choose Project - </option>
                        {project_data && project_data && project_data.length > 0
                          ? project_data.map((value, index) => {
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
                      <label className="form-label">Series Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="series_name"
                        name="series_name"
                        value={series_data.series_name}
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
                        value={series_data.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">
                        Thumbnail{" "}
                        {is_uploading === "series_thumbnail" ? (
                          <i className="mdi mdi-30px mdi-spin mdi-loading"></i>
                        ) : is_uploading ===
                          "series_thumbnail_upload_success" ? (
                          <i className="mdi mdi-30px mdi-attachment"></i>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        type="file"
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
                onClick={hideSeriesCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewSeriesCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingSeriesUpdateFunc}
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

export default SeriesCreate;
