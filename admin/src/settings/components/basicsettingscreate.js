import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Files from "react-files";
import BasicSettingsFilter from "./basicsettingsfilter";
import {
  retrieveBasicSettings,
  createBasicSettings,
  updateBasicSettings,
  fileUpload,
} from "../actions/basic_settings";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicSettingsPageService from "../service/basicsettingspage.service";
const BasicSettingsCreate = forwardRef((props, ref) => {
  //   const [file, setFile] = useState();
  // const insert_response = useSelector(state => state.BasicSettingsReducer, shallowEqual);
  const file_upload_response = useSelector(
    (state) => state.FileUploadReducer,
    shallowEqual
  );
  // const dispatch = useDispatch();
  const [chennel_logo, setchennel_logo] = useState(null);
  // console.log(show);
  const initialBasicSettingsData = {
    ch_id: "1",
    basic_settings_type: "",
    content_type: "",
    channel_name: "",
    website: "",
    chennel_logo: "",
  };

  const [basic_settings_data, set_basic_settings_data] = React.useState(
    initialBasicSettingsData
  );

  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [is_uploading, setUploading] = useState(false);

  React.useImperativeHandle(ref, () => ({
    showBasicSettingsCreateChildModal(single_basic_settings_data) {
      setEdit(true);
      showBasicSettingsCreateModal();
      set_basic_settings_data({
        id: single_basic_settings_data?.id,
        ch_id: single_basic_settings_data?.ch_id,
        basic_settings_type: single_basic_settings_data?.basic_settings_type,
        content_type: single_basic_settings_data?.content_type,
        channel_name: single_basic_settings_data?.channel_name,
        website: single_basic_settings_data?.website,
        chennel_logo: single_basic_settings_data?.chennel_logo,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_basic_settings_data({ ...basic_settings_data, [name]: value });
  };
  const showBasicSettingsCreateModal = () => {
    set_basic_settings_data(initialBasicSettingsData);
    setShowModal("show");
  };
  const showBasicSettingsFilter = (status) => {
    set_basic_settings_data(initialBasicSettingsData);
    // setShowModal('show');
    setShowFilter(status);
  };
  const hideBasicSettingsCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };
  const handleSubmitNewBasicSettingsCreateFunc = () => {
    let formData = new FormData();

    formData.append("ch_id", basic_settings_data?.ch_id);
    formData.append(
      "basic_settings_type",
      basic_settings_data?.basic_settings_type
    );
    formData.append("content_type", basic_settings_data?.content_type);
    formData.append("channel_name", basic_settings_data?.channel_name);
    formData.append("website", basic_settings_data?.website);
    formData.append("chennel_logo", chennel_logo);

    BasicSettingsPageService.createBasicSettings(formData)
      .then((response) => {
        if (response.status === 200) {
          alert("basic  data added");
          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingBasicSettingsUpdateFunc = () => {
    if (basic_settings_data.id) {
      BasicSettingsPageService.updateBasicSettings(
        basic_settings_data,
        basic_settings_data.id
      )
        .then((response) => {
          alert("Setting updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating setting ", error);
        });
    } else {
      console.error("Error: setting.id is undefined");
    }
  };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showBasicSettingsFilter(!showFilter)}
        ></i>
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showBasicSettingsCreateModal}
        ></i>
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <BasicSettingsFilter /> : ""}</div>
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
        id="basic_settingsCreate"
        style={{ display: showModal === "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="basic_settingsCreateTitle"
              >
                Create BasicSettings
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideBasicSettingsCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="basic_settings_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Channel Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="channel_name"
                        name="channel_name"
                        value={basic_settings_data.channel_name}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Basic Setting Type</label>
                      <input
                        type="text"
                        className="form-control"
                        rows="4"
                        id="basic_settings_type"
                        name="basic_settings_type"
                        value={basic_settings_data.basic_settings_type}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Website</label>
                      <input
                        type="text"
                        className="form-control"
                        rows="4"
                        id="website"
                        name="website"
                        value={basic_settings_data.website}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Content Type</label>
                      <input
                        type="text"
                        className="form-control"
                        rows="4"
                        id="content_type"
                        name="content_type"
                        value={basic_settings_data.content_type}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">
                        Thumbnail
                        {is_uploading === "basic_settings_chennel_logo" ? (
                          <i className="mdi mdi-30px mdi-spin mdi-loading"></i>
                        ) : is_uploading ===
                          "basic_settings_chennel_logo_upload_success" ? (
                          <i className="mdi mdi-30px mdi-attachment"></i>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        type="file"
                        name="chennel_logo"
                        onChange={(e) => {
                          setchennel_logo(e.target.files[0]);
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
                onClick={hideBasicSettingsCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewBasicSettingsCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingBasicSettingsUpdateFunc}
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

export default BasicSettingsCreate;
