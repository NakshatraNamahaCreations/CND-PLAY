import React, { useState, forwardRef } from "react";

import ContentsPageService from "../service/upcomingpage.service";

import "react-toastify/dist/ReactToastify.css";
import http from "../../http-common.function";
const UpcomingCreate = forwardRef((props, ref) => {
  const [dataCount, setDataCount] = useState(5);
  const [page, setPage] = useState(1);

  const initialUpcomingData = {
    banner: "",
    poster: "",
    active: false,
  };

  var temp_publish_year_arr = [];
  for (let index = new Date().getFullYear(); index > 1950; index--) {
    temp_publish_year_arr.push(index);
  }
  const [upcoming_data, set_upcoming_data] =
    React.useState(initialUpcomingData);

  const [showModal, setShowModal] = useState(false);

  const [is_edit, setEdit] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showContentsCreateChildModal(single_upcoming_data) {
      setEdit(true);
      showUpcomingCreateModal();
      setDataCount(single_upcoming_data.dataCount);
      setPage(single_upcoming_data.page);
      set_upcoming_data({
        id: single_upcoming_data.id,
        banner: single_upcoming_data.data.banner,
        poster: single_upcoming_data.data.poster,
        active: single_upcoming_data.data.active,
      });
    },
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_upcoming_data({ ...upcoming_data, [name]: value });
  };
  const showUpcomingCreateModal = () => {
    set_upcoming_data(initialUpcomingData);
    setShowModal("show");
  };

  const hideUpcomingCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewUpcomingCreateFunc = async () => {
    let dataa = {
      active: upcoming_data.active,
      poster: upcoming_data.poster,
      banner: upcoming_data.banner,
    };

    try {
      const config = {
        url: `upcoming/create`,
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
        // console.log("Unexpected response:", config);
      }
    } catch (error) {
      // console.error("Error while saving:", error);
    }
  };

  const handleSubmitExistingUpcomingUpdateFunc = () => {
    if (upcoming_data.id) {
      ContentsPageService.updateUpcoming(upcoming_data, upcoming_data.id)
        .then((response) => {
          alert("Upcoming event updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating upcoming event", error);
        });
    } else {
      console.error("Error: upcoming_data.id is undefined");
    }
  };

  return (
    <div className="mt-2 row">
      {/* <div className="mt-2 container-fluid">
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showUpcomingCreateModal}
        ></i>
      </div> */}
      {/* <div className="mt-2 mb-2 container-fluid"></div>
      {showModal === "show" ? (
        <div className="modal-backdrop fade show"></div>
      ) : (
        ""
      )} */}
      <div
        className={`modal fade f-OpenSans fs-14px ${showModal} `}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        id="upcoming_create"
        style={{ display: showModal === "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5
                className="modal-title f-OpenSans fs-14px"
                id="upcoming_create_title"
              >
                Create Upcoming
              </h5> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideUpcomingCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="upcoming_form">
                <div className="container-fluid">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Banner Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="banner"
                        name="banner"
                        value={upcoming_data.banner}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Poster Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="poster"
                        name="poster"
                        value={upcoming_data.poster}
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
                onClick={hideUpcomingCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewUpcomingCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingUpcomingUpdateFunc}
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

export default UpcomingCreate;
