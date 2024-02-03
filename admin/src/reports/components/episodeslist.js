import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  retrieveEpisodes,
  updateEpisodes,
  deleteEpisodes,
} from "../actions/episodes";

import EpisodesCreate from "./episodescreate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EpisodesPageService from "../service/episodespage.service";
const EpisodesList = () => {
  const dataCount = 5;

  const [page, setPage] = useState(1);
  const [prevEnabled, setPrevEnabled] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(1);
  const [triggerContent, setTriggerContent] = useState(0);
  const [Data, setData] = useState([]);
  const child = useRef();

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
      let EpisodeData = await EpisodesPageService.fetchEpisodesList(
        dataCount,
        page
      );

      if (Array.isArray(EpisodeData.data)) {
        setData(EpisodeData.data);
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
      let EpisodeData = await EpisodesPageService.fetchEpisodesList({
        datacount: dataCount,
        page: page + 1,
      });

      if (Array.isArray(EpisodeData.data)) {
        setData(EpisodeData.data);
        setPrevEnabled(1);

        if (EpisodeData.data.length > 0) {
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

  const handleChangeStatusEpisodesRecord = (idd, status) => {
    EpisodesPageService.changeEpisodesStatus({
      data: {
        status: status,
      },
      filter: { id: idd },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        EpisodesPageService.fetchEpisodesList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something Wrong. Please try again later.");
      });
  };

  const handleChangeApproveStatusEpisodesRecord = (index, is_approved) => {
    // dispatch(updateEpisodes({
    // 	data: {
    // 		is_approved: is_approved,
    // 	},
    // 	filter: {id: index}
    // }))
    // .then(data => {
    // 	if (data.data.insertId > 0 || data.data.affectedRows > 0) {
    // 		toast.success(((!is_approved)?'Refused':'Approved')+" Successfully.");
    // 		dispatch(retrieveEpisodes({is_delete: 0}));
    // 	} else {
    // 		toast.error("Something Wrong. Please try again later.");
    // 	}
    // }).catch(e => {
    // 	console.log(e);
    // });
  };

  const handleChangePublishStatusEpisodesRecord = (index, is_published) => {
    // dispatch(updateEpisodes({
    // 	data: {
    // 		is_published: is_published,
    // 	},
    // 	filter: {id: index}
    // }))
    // .then(data => {
    // 	if (data.data.insertId > 0 || data.data.affectedRows > 0) {
    // 		toast.success(((!is_published)?'Publishment Suppressed':'Published')+" Successfully.");
    // 		dispatch(retrieveEpisodes({is_delete: 0}));
    // 	} else {
    // 		toast.error("Something Wrong. Please try again later.");
    // 	}
    // }).catch(e => {
    // 	console.log(e);
    // });
  };
  const handleEditEpisodesRecord = (id) => {
    if (Array.isArray(Data.data)) {
      Data.data.forEach((ele) => {
        if (ele._id === id && child.current && ele._id) {
          const {
            _id,
            episodes_name,
            thumbnail,
            description,
            project_id,
            series_id,
          } = ele;

          const updatedData = {
            id: _id,
            episodes_name: episodes_name,
            thumbnail: thumbnail,
            description: description,
            project_id: project_id,
            series_id: series_id,
          };

          child.current.showEpisodesCreateChildModal(updatedData);
        }
      });
    } else {
      console.error("series_data.data is not an array");
    }
  };
  const handleTrashEpisodesRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this episodes?`
    );

    if (confirmed) {
      EpisodesPageService.trashEpisodes(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Episode deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Episode canceled the deletion.");
    }
  };

  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <EpisodesCreate ref={child} />
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
                        <th>Episodes Name</th>
                        <th>Approved</th>
                        <th>Published</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Data && Data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : Data?.length == 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        Data.data &&
                        Data.data.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img src={value.thumbnail} />
                              </td>
                              <td style={{ width: "60%" }}>
                                {value.episodes_name}
                              </td>
                              <td>
                                {value.is_approved ? (
                                  <i
                                    class="mdi mdi-checkbox-marked-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusEpisodesRecord(
                                        value.id,
                                        value.is_approved ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeApproveStatusEpisodesRecord(
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
                                      handleChangePublishStatusEpisodesRecord(
                                        value.id,
                                        value.is_published ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangePublishStatusEpisodesRecord(
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
                                      handleChangeStatusEpisodesRecord(
                                        value._id,
                                        value.status ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="mdi mdi-checkbox-blank-circle-outline"
                                    onClick={() =>
                                      handleChangeStatusEpisodesRecord(
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
                                          handleEditEpisodesRecord(value._id)
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      {!value.is_delete ? (
                                        <i
                                          class="mdi mdi-delete-circle"
                                          onClick={() =>
                                            handleTrashEpisodesRecord(value._id)
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

export default EpisodesList;
