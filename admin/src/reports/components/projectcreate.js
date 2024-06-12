import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Files from "react-files";
import ProjectFilter from "./projectfilter";
import {
  retrieveProject,
  createProject,
  updateProject,
  fileUpload,
} from "../actions/project";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectPageService from "../service/projectpage.service";
const ProjectCreate = forwardRef((props, ref) => {
  //   const [file, setFile] = useState();
  // const insert_response = useSelector(state => state.ProjectReducer, shallowEqual);
  const file_upload_response = useSelector(
    (state) => state.FileUploadReducer,
    shallowEqual
  );

  const initialProjectData = {
    ch_id: "1",
    project_type: "",
    content_type: "",
    project_name: "",
    description: "",
  };

  const [project_data, set_project_data] = React.useState(initialProjectData);
  const [thumbnail, setThumbnail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [is_uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  React.useImperativeHandle(ref, () => ({
    showProjectCreateChildModal(single_project_data) {
      setEdit(true);
      showProjectCreateModal();
      set_project_data({
        id: single_project_data?.id,
        ch_id: single_project_data?.ch_id,
        project_type: single_project_data?.project_type,
        content_type: single_project_data?.content_type,
        project_name: single_project_data?.project_name,
        description: single_project_data?.description,
        thumbnail: single_project_data?.thumbnail,
      });
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_project_data({ ...project_data, [name]: value });
  };
  const showProjectCreateModal = () => {
    set_project_data(initialProjectData);
    setShowModal("show");
  };
  const showProjectFilter = (status) => {
    set_project_data(initialProjectData);
    // setShowModal('show');
    setShowFilter(status);
  };
  const hideProjectCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewProjectCreateFunc = () => {
    let formData = new FormData();
    formData.append("project_type", project_data.project_type);
    formData.append("content_type", project_data.content_type);
    formData.append("project_name", project_data.project_name);
    formData.append("description", project_data.description);
    formData.append("thumbnail", thumbnail);

    ProjectPageService.createProject(formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Project created");
          window.location.reload("/");
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmitExistingProjectUpdateFunc = () => {
    if (project_data.id) {
      ProjectPageService.updateProject(project_data, project_data.id)
        .then((response) => {
          alert("Project updated successfully", response);
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
        {/* <button type="button" className="btn btn-primary btn-sm pull-right mt-1 mb-1" onClick={showProjectCreateModal}> */}
        {/* Create */}
        <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showProjectFilter(!showFilter)}
        ></i>
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showProjectCreateModal}
        ></i>
        {/* </button> */}
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">{showFilter ? <ProjectFilter /> : ""}</div>
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
        id="projectCreate"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="projectCreateTitle"
              >
                Create Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideProjectCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="project_form">
                <div className="container">
                  <div className="row">
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Project Type</label>
                      <select
                        className="content_section_data form-select"
                        name="project_type"
                        onChange={handleChange}
                      >
                        <option value=""> - Select Section - </option>
                        <option
                          selected={
                            project_data.project_type === "movie" ? true : false
                          }
                          value="movie"
                        >
                          Movies
                        </option>
                        <option
                          selected={
                            project_data.project_type === "show" ? true : false
                          }
                          value="show"
                        >
                          TV Shows
                        </option>
                      </select>
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label">Content Type</label>
                      <select
                        className="content_section_data form-select"
                        name="content_type"
                        onChange={handleChange}
                      >
                        <option value=""> - Select Section - </option>
                        <option
                          selected={
                            project_data.content_type === "action"
                              ? true
                              : false
                          }
                          value="action"
                        >
                          Action
                        </option>
                        <option
                          selected={
                            project_data.content_type === "horror"
                              ? true
                              : false
                          }
                          value="horror"
                        >
                          Horror
                        </option>
                        <option
                          selected={
                            project_data.content_type === "romantic"
                              ? true
                              : false
                          }
                          value="romantic"
                        >
                          Romantic
                        </option>
                        <option
                          selected={
                            project_data.content_type === "scifi" ? true : false
                          }
                          value="scifi"
                        >
                          Sci-Fi
                        </option>
                        <option
                          selected={
                            project_data.content_type === "funny" ? true : false
                          }
                          value="funny"
                        >
                          Funny
                        </option>
                        <option
                          selected={
                            project_data.content_type === "trailler"
                              ? true
                              : false
                          }
                          value="trailler"
                        >
                          Trailler
                        </option>
                      </select>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Project Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="project_name"
                        name="project_name"
                        value={project_data.project_name}
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
                        value={project_data.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">
                        Thumbnail
                        {is_uploading === "project_thumbnail" ? (
                          <i className="mdi mdi-30px mdi-spin mdi-loading"></i>
                        ) : is_uploading ===
                          "project_thumbnail_upload_success" ? (
                          <i className="mdi mdi-30px mdi-attachment"></i>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
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
                onClick={hideProjectCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewProjectCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingProjectUpdateFunc}
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

export default ProjectCreate;
