import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import Files from "react-files";
import DistrictsFilter from "./districtsfilter";
import "react-toastify/dist/ReactToastify.css";
import http from "../../http-common.function";
import ContentsPageService from "../service/districtspage.service";
const DistrictsCreate = forwardRef((props, ref) => {
  const [dataCount, setDataCount] = useState(5);
  const [page, setPage] = useState(1);
  // const [file, setFile] = useState()
  const dispatch = useDispatch();
  const initialDistrictsData = {
    name: "",
    order: "",
    // active: false,
  };
  // const initialFileUploadData = {
  // 	thumbnail: "",
  // };
  var temp_publish_year_arr = [];
  for (let index = new Date().getFullYear(); index > 1950; index--) {
    temp_publish_year_arr.push(index);
  }
  const [districts_data, set_districts_data] =
    React.useState(initialDistrictsData);
  // const [file_upload_data, set_file_upload_data] = React.useState(initialFileUploadData);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);

  React.useImperativeHandle(ref, () => ({
    showDistrictsCreateChildModal(single_districts_data) {
      setEdit(true);
      showDistrictsCreateModal();
      setDataCount(single_districts_data.dataCount);
      setPage(single_districts_data.page);
      set_districts_data({
        id: single_districts_data.id,
        name: single_districts_data.data.name,
        order: single_districts_data.data.order,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_districts_data({ ...districts_data, [name]: value });
  };
  const showDistrictsCreateModal = () => {
    set_districts_data(initialDistrictsData);
    setShowModal("show");
  };

  const hideDistrictsCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };
  const handleSubmitNewDistrictsCreateFunc = async () => {
    let dataa = {
      name: districts_data.name,
    };

    try {
      const config = {
        url: `/districts/create`,
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

  const handleSubmitExistingDistrictsUpdateFunc = () => {
    if (districts_data.id) {
      ContentsPageService.updateDistricts(districts_data, districts_data.id)
        .then((response) => {
          alert("district  updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating district event", error);
        });
    } else {
      console.error("Error: district.id is undefined");
    }
  };
  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <i className="mdi mdi-filter-variant float-right mr-2"  onClick={() => showDistrictsFilter(!showFilter)}></i> */}
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showDistrictsCreateModal}
        ></i>
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <DistrictsFilter /> : ""}</div>
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
        id="districts_create"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="districts_create_title"
              >
                Create Districts
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideDistrictsCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="districts_form">
                <div className="container-fluid">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">District Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="name"
                        name="name"
                        value={districts_data.name}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {/* <div className="mb-2 col-md-12">
                      <label className="form-label">Order</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="order"
                        name="order"
                        value={districts_data.order}
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
                onClick={hideDistrictsCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewDistrictsCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingDistrictsUpdateFunc}
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

export default DistrictsCreate;
