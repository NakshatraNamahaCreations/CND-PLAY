import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { retrieveSeries, updateSeries, deleteSeries } from "../actions/series";

import SeriesCreate from "./seriescreate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeriesPageService from "../service/seriespage.service";
const SeriesList = () => {
  const dataCount = 5;

  const [page, setPage] = useState(1);
  const [prevEnabled, setPrevEnabled] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(1);
  const [series_data, setseries_data] = useState([]);
  const child = useRef();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let seriesd = await SeriesPageService.fetchSeriesList();
    setseries_data(seriesd.data);
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
      let projectData = await SeriesPageService.fetchSeriesList({
        datacount: dataCount,
        page: page + 1,
      });

      if (Array.isArray(projectData.data)) {
        setseries_data(projectData.data);
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

  const handleChangeStatusSeriesRecord = (index, status) => {
    SeriesPageService.changeSeriesStatus({
      data: {
        status: status,
      },
      filter: { id: index },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        SeriesPageService.fetchSeriesList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something Wrong. Please try again later.");
      });
  };

  const handleChangeApproveStatusSeriesRecord = (index, is_approved) => {
    // dispatch(
    //   updateSeries({
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
    //       dispatch(retrieveSeries({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const handleChangePublishStatusSeriesRecord = (index, is_published) => {
    // dispatch(
    //   updateSeries({
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
    //       dispatch(retrieveSeries({ is_delete: 0 }));
    //     } else {
    //       toast.error("Something Wrong. Please try again later.");
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const handleEditSeriesRecord = (id) => {
    if (Array.isArray(series_data)) {
      series_data.forEach((ele) => {
        if (ele._id === id && child.current && ele._id) {
          const { _id, series_name, thumbnail, description, ch_id } = ele;

          const updatedData = {
            id: _id,
            series_name: series_name,
            thumbnail: thumbnail,
            description: description,
            ch_id: ch_id,
          };

          child.current.showSeriesCreateChildModal(updatedData);
        }
      });
    } else {
      console.error("series_data.data is not an array");
    }
  };

  const handleTrashSeriesRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this series?`
    );

    if (confirmed) {
      SeriesPageService.trashSeries(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Series deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log("User canceled the deletion.");
    }
  };
  // console.log(series_data)
  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <SeriesCreate ref={child} />
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
                        <th>Series Name</th>
                        <th>Approved</th>
                        <th>Published</th>
                        <th>Status</th>
                        <th>Tools</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {series_data && series_data.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : series_data.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        series_data &&
                        series_data.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img src={value.thumbnail} />
                              </td>
                              <td style={{ width: "60%" }}>
                                {value.series_name}
                              </td>
                              <td>
                                {value.is_approved ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusSeriesRecord(
                                        value.id,
                                        value.is_approved ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusSeriesRecord(
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
                                      handleChangePublishStatusSeriesRecord(
                                        value.id,
                                        value.is_published ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangePublishStatusSeriesRecord(
                                        value._id,
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
                                      handleChangeStatusSeriesRecord(
                                        value._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusSeriesRecord(
                                        value._id,
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
                                          handleEditSeriesRecord(value._id)
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      {!value.is_delete ? (
                                        <i
                                          class="mdi mdi-delete-circle"
                                          onClick={() =>
                                            handleTrashSeriesRecord(value._id)
                                          }
                                        ></i>
                                      ) : (
                                        ""
                                      )}
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

export default SeriesList;
