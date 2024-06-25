import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  retrieveGenres,
  updateGenres,
  changeGenresStatus,
  deleteGenres,
} from "../actions/genres";

import GenresCreate from "./genrescreate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GenresPageService from "../service/genrespage.service";

const GenresList = () => {
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
      let DistictsData = await GenresPageService.fetchGenresList(
        dataCount,
        page
      );

      if (Array.isArray(DistictsData.data)) {
        setData(DistictsData.data);
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
      let districtData = await GenresPageService.fetchGenresList({
        datacount: dataCount,
        page: page + 1,
      });

      if (Array.isArray(districtData.data)) {
        setData(districtData.data);
        setPrevEnabled(1);

        if (districtData.data.length > 0) {
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

  const handleChangeStatusGenresRecord = (index, status) => {
    GenresPageService.changeGenresStatus({
      data: {
        status: status,
      },
      filter: { id: index },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        GenresPageService.fetchGenresList({
          datacount: dataCount,
          page: page,
        });
      })
      .catch((e) => {
        //  console.log(e);
      });
  };
  const handleEditGenresRecord = (id) => {
    Data.forEach((ele) => {
      if (ele?._id === id && child.current && ele?._id) {
        const { _id, name, active } = ele;

        const updatedData = {
          id: _id,
          data: {
            name: name,

            active: active,
          },
          dataCount,
          page,
        };

        child.current.showGenresCreateChildModal(updatedData);
      }
    });
  };
  const handleTrashGenresRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this geners?`
    );

    if (confirmed) {
      GenresPageService.trashGenres(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Geners  deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Geners  canceled the deletion.");
    }
  };

  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <GenresCreate ref={child} />
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
                        <th>Genres Name</th>
                        {/* <th>Popularity</th> */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Data && Data.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : Data.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        Data &&
                        Data?.map((value, index) => {
                          let { name, popularity, active } = value;
                          let displayIndex = index + 1 + (page - 1) * dataCount;
                          return (
                            <tr key={index}>
                              <td>{displayIndex}</td>
                              <td>{name}</td>
                              {/* <td>{popularity ? popularity : 0}</td> */}
                              <td>
                                {active ? (
                                  <i
                                    class="fa-solid fa-toggle-on"
                                    onClick={() =>
                                      handleChangeStatusGenresRecord(
                                        value?._id,
                                        active ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    class="fa-solid fa-toggle-off"
                                    onClick={() =>
                                      handleChangeStatusGenresRecord(
                                        value?._id,
                                        active ? 0 : 1
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
                                        className="mdi mdi-pencil-circle-outline"
                                        onClick={() =>
                                          handleEditGenresRecord(value?._id)
                                        }
                                      ></i>
                                    </div>
                                    <div className="col-md-6 text-center">
                                      <i
                                        class="mdi mdi-delete-circle"
                                        onClick={() =>
                                          handleTrashGenresRecord(value?._id)
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

export default GenresList;
