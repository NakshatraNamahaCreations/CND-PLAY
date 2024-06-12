import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { retrieveVideos, updateVideos, deleteVideos } from "../actions/videos";

import VideosCreate from "./videoscreate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideosPageService from "../service/videospage.service";
import http from "../../http-common.function";

const VideosList = () => {
  // const videos_data = useSelector((state) => state.VideosReducer, shallowEqual);
  const [videos_data, setvideos_data] = useState([]);
  const child = useRef();
  let imgUrl = process.env.REACT_APP_API_IMage;
  const dataCount = 5;

  const [page, setPage] = useState(1);
  const [prevEnabled, setPrevEnabled] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(1);

  useEffect(() => {
    // let data = {
    //   is_delete: 0,
    // };
    // dispatch(retrieveVideos(data));
    fetchData();
  }, []);
  const fetchData = async () => {
    let videos = await VideosPageService.fetchVideosList();
    setvideos_data(videos.data);
  };

  const handlePagePrev = () => {
    if (page - 1 === 1) {
      setPrevEnabled(0);
      setNextEnabled(1);
    }
    setPage(page - 1);
    // setTriggerContent(1);
  };

  const handlePageNext = async () => {
    try {
      let projectData = await VideosPageService.fetchVideosList({
        datacount: dataCount,
        page: page + 1,
      });

      if (Array.isArray(projectData.data)) {
        setvideos_data(projectData.data);
        setPrevEnabled(1);

        if (projectData.data.length > 0) {
          setPage(page + 1);
        } else {
          setNextEnabled(0);
        }

        // setTriggerContent(1);
      } else {
        console.error("Invalid data format received from the server.");
      }
    } catch (error) {
      console.error("Error fetching Indie Movie list:", error);
    }
  };
  const handleChangeStatusVideosRecord = (idd, status) => {
    VideosPageService.changeVideosStatus({
      data: {
        status: status,
      },
      filter: { id: idd },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        VideosPageService.fetchVideosList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
        ////  console.log(e);
        toast.error("Something Wrong. Please try again later.");
      });
  };
  const handleChangeApproveStatusVideosRecord = (idd, is_approved) => {
    // dispatch(
    //   updateVideos({
    //     data: {
    //       is_approved: is_approved,
    //     },
    //     filter: { id: index },
    //   })
    // )
    //   .then((data) => {
    //     if (data.data.insertId > 0 || data.data.affectedRows > 0) {
    //       toast.success(
    //         (!is_approved ? "Refused" : "Approved") + " Successfully."
    //       );
    //       // dispatch(retrieveVideos({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };

  const handleChangePublishStatusVideosRecord = (index, is_published) => {
    // dispatch(
    //   updateVideos({
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
    //       dispatch(retrieveVideos({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //    //  console.log(e);
    //   });
  };

  const handleEditVideosRecord = (id) => {
    if (Array.isArray(videos_data)) {
      videos_data.forEach((ele) => {
        if (ele._id === id && child.current && ele._id) {
          const {
            _id,
            ch_id,
            project_id,
            series_id,
            episodes_id,
            videos_name,
            description,
            thumbnail,
            videofile,
            duration,
            origin,
          } = ele;

          const updatedData = {
            id: _id,
            ch_id: ch_id,
            project_id: project_id,
            series_id: series_id,
            episodes_id: episodes_id,
            videos_name: videos_name,
            description: description,
            thumbnail: thumbnail,
            videofile: videofile,
            duration: duration,
            origin: origin,
          };

          child.current.showVideosCreateChildModal(updatedData);
        }
      });
    } else {
      console.error("video.data is not an array");
    }
  };

  const handleTrashVideosRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this video?`
    );

    if (confirmed) {
      VideosPageService.trashVideos(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Video deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      // console.log("Video canceled the deletion.");
    }
  };

  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <VideosCreate ref={child} />
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
                        <th>Videos Name</th>
                        <th>Approved</th>
                        <th>Im Coming from Video Published</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos_data && videos_data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : videos_data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        videos_data &&
                        videos_data?.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img
                                  width={100}
                                  height={100}
                                  src={`${imgUrl}/video/${value.thumbnail}`}
                                  alt=""
                                />
                              </td>

                              <td style={{ width: "60%" }}>
                                {value.videos_name}
                              </td>
                              <td>
                                {value.is_approved ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusVideosRecord(
                                        value.id,
                                        value.is_approved ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusVideosRecord(
                                        value.id,
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
                                      handleChangePublishStatusVideosRecord(
                                        value.id,
                                        value.is_published ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangePublishStatusVideosRecord(
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
                                      handleChangeStatusVideosRecord(
                                        value?._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusVideosRecord(
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
                                          handleEditVideosRecord(value?._id)
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      <i
                                        class="mdi mdi-delete-circle"
                                        onClick={() =>
                                          handleTrashVideosRecord(value?._id)
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

export default VideosList;
