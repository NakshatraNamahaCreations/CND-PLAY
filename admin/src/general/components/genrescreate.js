import React, { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import GenresFilter from "./genresfilter";
import http from "../../http-common.function";
import ContentsPageService from "../service/genrespage.service";

import "react-toastify/dist/ReactToastify.css";

const GenresCreate = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const initialGenresData = {
    name: "",
    // popularity: "",
    active: false,
  };
  // const initialFileUploadData = {
  // 	thumbnail: "",
  // };
  var temp_publish_year_arr = [];
  for (let index = new Date().getFullYear(); index > 1950; index--) {
    temp_publish_year_arr.push(index);
  }
  const [genres_data, set_genres_data] = React.useState(initialGenresData);
  // const [file_upload_data, set_file_upload_data] = React.useState(initialFileUploadData);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [is_uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [publish_years, setPublishYears] = useState(temp_publish_year_arr);
  // setPublishYears(temp_publish_year_arr);
  React.useImperativeHandle(ref, () => ({
    showGenresCreateChildModal(single_genres_data) {
  
      setEdit(true);
      showGenresCreateModal();
      set_genres_data({
        id: single_genres_data.id,
        name: single_genres_data.data.name,
        // popularity: single_genres_data.data.popularity,
        active: single_genres_data.data.active,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_genres_data({ ...genres_data, [name]: value });
  };
  const showGenresCreateModal = () => {
    set_genres_data(initialGenresData);
    setShowModal("show");
  };
  const showGenresFilter = (status) => {
    set_genres_data(initialGenresData);
    setShowFilter(status);
  };
  const hideGenresCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewGenresCreateFunc = async () => {
    let dataa = {
      name: genres_data.name,
      active: genres_data.active,
    };

    try {
      const config = {
        url: `genres/create`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: dataa,
      };

      let res = await http(config);

      if (res.status === 200) {
        alert("Successfully saved");
        window.location.reload("/");
      } else {
        console.log("Unexpected response:", config);
      }
    } catch (error) {
      console.error("Error while saving:", error);
    }
  };
  const handleSubmitExistingGenresUpdateFunc = () => {
    if (genres_data.id) {
      ContentsPageService.updateGenres(genres_data, genres_data.id)
        .then((response) => {
          alert("Geners  updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating geners event", error);
        });
    } else {
      console.error("Error: upcoming_data.id is undefined");
    }
  };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <i className="mdi mdi-filter-variant float-right mr-2"  onClick={() => showGenresFilter(!showFilter)}></i> */}
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showGenresCreateModal}
        ></i>
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <GenresFilter /> : ""}</div>
      </div>
      {showModal === "show" ? (
        <div className="modal-backdrop fade show"></div>
      ) : (
        ""
      )}
      <div
        className={`modal fade f-OpenSans fs-14px ${showModal} `}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        id="genres_create"
        style={{ display: showModal === "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="genres_create_title"
              >
                Create Genres
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideGenresCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="genres_form">
                <div className="container-fluid">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Genres Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="name"
                        name="name"
                        value={genres_data.name}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {/* <div className="mb-2 col-md-12">
                      <label className="form-label">Popularity</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="popularity"
                        name="popularity"
                        value={genres_data.popularity}
                        onChange={handleChange}
                      ></input>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default f-OpenSans fs-12px"
                data-bs-dismiss="modal"
                onClick={hideGenresCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewGenresCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingGenresUpdateFunc}
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

export default GenresCreate;
