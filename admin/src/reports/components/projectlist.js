import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  retrieveProject,
  updateProject,
  deleteProject,
} from "../actions/project";
import ProjectPageService from "../service/projectpage.service";
import ProjectCreate from "./projectcreate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectList = () => {
  const child = useRef();

  const dataCount = 5;

  const [page, setPage] = useState(1);
  const [prevEnabled, setPrevEnabled] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(1);
  const [triggerContent, setTriggerContent] = useState(0);
  const [Data, setData] = useState([]);

  if (triggerContent) {
    setTriggerContent(0);

    if (
      page > 1 &&
      ((Data && Data.length === 0) || (Data.data && Data.length === 0))
    ) {
      setNextEnabled(0);
    }
  }

  const fetchData = async () => {
    try {
      let ProjectData = await ProjectPageService.fetchProjectList(
        dataCount,
        page
      );

      if (Array.isArray(ProjectData.data)) {
        setData(ProjectData.data);
      } else {
        console.error("Invalid data format received from the server.");
      }
    } catch (error) {
      console.error("Error fetching Indie Movie list:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setTriggerContent(1);
  }, [page]);

  useEffect(() => {
    setTriggerContent(0);

    if (page > 1 && Data && Array.isArray(Data) && Data.length === 0) {
      setNextEnabled(0);
    }
  }, [page, Data]);

  const handlePagePrev = () => {
    if (page - 1 === 1) {
      setPrevEnabled(0);
      setNextEnabled(1);
    }
    setPage(page - 1);
    setTriggerContent(1);
  };

  const handlePageNext = async () => {
    try {
      let projectData = await ProjectPageService.fetchProjectList({
        datacount: dataCount,
        page: page + 1,
      });

      if (Array.isArray(projectData.data)) {
        setData(projectData.data);
        setPrevEnabled(1);

        if (projectData.data.length > 0) {
          setPage(page + 1);
        } else {
          setNextEnabled(0);
        }

        setTriggerContent(1);
      } else {
        console.error("Invalid data format received from the server.");
      }
    } catch (error) {
      console.error("Error fetching Indie Movie list:", error);
    }
  };

  const handleChangeStatusProjectRecord = (index, status) => {
    ProjectPageService.changeProjectStatus({
      data: {
        status: status,
      },
      filter: { id: index },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        ProjectPageService.fetchProjectList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
       //  console.log(e);
      });
  };

  const handleChangeApproveStatusProjectRecord = (idd, is_approved) => {
    ProjectPageService.updateProject({
      data: {
        is_approved: is_approved,
      },
      filter: { id: idd },
    })

      .then((data) => {
        if (data.data.insertId > 0 || data.data.affectedRows > 0) {
          toast.success(
            (!is_approved ? "Refused" : "Approved") + " Successfully."
          );
          ProjectPageService.fetchProjectList(handleTrashProjectRecord(idd));
        } else {
          toast.error("Something Wrong. Please try again later.");
        }
      })
      .catch((e) => {
       //  console.log(e);
      });
  };

  const handleChangePublishStatusProjectRecord = (index, is_published) => {
    // dispatch(
    //   updateProject({
    //     data: {
    //       is_published: is_published,
    //     },
    //     filter: { id: index },
    //   })
    // )
    //   .then((data) => {
    //     if (data.data.insertId > 0 || data.data.affectedRows > 0) {
    //       toast.success(
    //         (!is_published ? "Publishment Suppressed" : "Published") +
    //           " Successfully."
    //       );
    //       dispatch(retrieveProject({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };

  const handleEditProjectRecord = (id) => {
    if (Array.isArray(Data.data)) {
      Data.data.forEach((ele) => {
        if (ele._id === id && child.current && ele._id) {
          const {
            _id,
            ch_id,
            project_type,
            content_type,
            project_name,
            description,
            thumbnail,
          } = ele;

          const updatedData = {
            id: _id,
            project_name: project_name,
            thumbnail: thumbnail,
            ch_id: ch_id,
            project_type: project_type,
            content_type: content_type,
            description: description,
          };

          child.current.showProjectCreateChildModal(updatedData);
        }
      });
    } else {
      console.error("project_data.data is not an array");
    }
  };

  const handleTrashProjectRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this project?`
    );

    if (confirmed) {
      ProjectPageService.trashProject(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Project deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log("User canceled the deletion.");
    }
  };
  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <ProjectCreate ref={child} />
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="card card-default">
                <div className="card-header center-flexbox">
                  {prevEnabled ? (
                    <span
                      className="float-right center-flexbox"
                      onClick={handlePagePrev}
                    >
                      {" "}
                      <i
                        className="mdi mdi-chevron-left"
                        style={{ fontSize: "18px" }}
                      ></i>{" "}
                      Prev{" "}
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="float-right center-flexbox">
                    {" "}
                    &nbsp; &nbsp; &nbsp; Page: {page} &nbsp; &nbsp; &nbsp;{" "}
                  </span>
                  {nextEnabled ? (
                    <span
                      className="float-right center-flexbox"
                      onClick={handlePageNext}
                    >
                      {" "}
                      Next{" "}
                      <i
                        className="mdi mdi-chevron-right"
                        style={{ fontSize: "18px" }}
                      ></i>{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="card-body table-responsive">
                  <table className="table table-striped fw-600">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Approved</th>
                        <th>Im Coming from Project Published</th>
                        <th>Status</th>
                        <th>Action</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {Data && Data?.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : Data?.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        Data &&
                        Data?.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img src={value.thumbnail} alt="" />
                              </td>
                              <td style={{ width: "60%" }}>
                                {value.project_name}
                              </td>
                              <td>
                                {value.is_approved ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusProjectRecord(
                                        value?._id,
                                        value.is_approved ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusProjectRecord(
                                        value?._id,
                                        value.is_approved ? 0 : 1
                                      )
                                    }
                                  ></i>
                                )}
                              </td>
                              <td>
                                {value.is_published ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangePublishStatusProjectRecord(
                                        value.id,
                                        value.is_published ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangePublishStatusProjectRecord(
                                        value.id,
                                        value.is_published ? 0 : 1
                                      )
                                    }
                                  ></i>
                                )}
                              </td>
                              <td>
                                {value.status ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusProjectRecord(
                                        value?._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusProjectRecord(
                                        value?._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                )}
                              </td>
                              <td>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-md-6 text-center">
                                      <i
                                        class="mdi mdi-pencil-circle-outline"
                                        onClick={() =>
                                          handleEditProjectRecord(value?._id)
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      <i
                                        class="mdi mdi-delete-circle"
                                        onClick={() =>
                                          handleTrashProjectRecord(value?._id)
                                        }
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
