import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OFFerPageService from "../service/offercreate.service";
import OfferOfClubCreate from "./offercreate";
import "react-toastify/dist/ReactToastify.css";

const OfferList = () => {
  const dataCount = 5;
  const [page, setPage] = useState(1);
  const [prevEnabled, setPrevEnabled] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(1);
  const [triggerContent, setTriggerContent] = useState(0);
  const [Data, setData] = useState([]);

  const child = useRef();

  const fetchData = async () => {
    try {
      let ContentData = await OFFerPageService.fetchOfferList(dataCount, page);

      if (Array.isArray(ContentData.data)) {
        setData(ContentData.data);
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
  if (triggerContent) {
    setTriggerContent(0);

    if (
      page > 1 &&
      ((Data && Data?.length === 0) || (Data?.data && Data?.length === 0))
    ) {
      setNextEnabled(0);
    }
  }
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
      let ContentData = await OFFerPageService.fetchOfferList({
        datacount: dataCount,
        page: page + 1,
      });

      if (Array.isArray(ContentData.data)) {
        setData(ContentData.data);
        setPrevEnabled(1);

        if (ContentData.data.length > 0) {
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

  const handleChangeStatusContentsRecord = (index, status) => {
    OFFerPageService.changOfferStatus({
      data: {
        status: status,
      },
      filter: { id: index },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        OFFerPageService.fetchOfferList({
          datacount: dataCount,
          page: page,
        });
        window.location.reload("");
      })
      .catch((e) => {
        //  console.log(e);
      });
  };
  const handleEditContentsRecord = (id) => {
    Data.forEach((ele) => {
      if (ele?._id === id && child.current && ele?._id) {
        // console.log(ele.genres, "genres=====================");
        const {
          _id,
          title,
          subtitle,
          price,
          poster,
          Contents,
          validity,
          active,
          image,
        } = ele;

        const updatedData = {
          id: _id,
          poster: poster,
          title: title,
          price: price,
          validity: validity,
          Contents: Contents,
          subtitle: subtitle,
          active: active,
          image: image,
        };

        child.current.showOfferCreateChildModal(updatedData);
      }
    });
  };

  const handleTrashContentsRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Content?`
    );

    if (confirmed) {
      OFFerPageService.trashOffer(idd)
        .then((response) => {
          if (response.status === 200) {
            alert("Content deleted succesfully ");
            window.location.reload("/");
          }
        })
        .catch((error) => console.error(error));
    } else {
      // console.log("Content canceled the deletion.");
    }
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-12">
          <OfferOfClubCreate ref={child} />
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
                      <th>Poster</th>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Amount</th>
                      <th>Validity</th>
                      <th>Status</th>
                      <th>Action</th>
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
                      Data.map((value, index) => {
                        let {
                          _id,
                          title,
                          subtitle,
                          price,
                          poster,
                          Contents,
                          validity,
                          active,
                        } = value;
                        let displayIndex = index + 1 + (page - 1) * dataCount;
                        return (
                          <tr key={index}>
                            <td>{displayIndex}</td>
                            <td>
                              {" "}
                              <img src={poster} alt="" />
                            </td>

                            <td>{title}</td>
                            <td>{subtitle}</td>
                            <td>{price}</td>
                            <td>{validity}</td>

                            <td>
                              {active ? (
                                <i
                                  className="fa-solid fa-toggle-on"
                                  onClick={() =>
                                    handleChangeStatusContentsRecord(
                                      value?._id,
                                      active ? 0 : 1
                                    )
                                  }
                                ></i>
                              ) : (
                                <i
                                  className="fa-solid fa-toggle-off"
                                  onClick={() =>
                                    handleChangeStatusContentsRecord(
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
                                        handleEditContentsRecord(value?._id)
                                      }
                                    ></i>
                                  </div>
                                  <div className="col-md-6 text-center">
                                    <i
                                      class="mdi mdi-delete-circle"
                                      onClick={() =>
                                        handleTrashContentsRecord(value?._id)
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
  );
};

export default OfferList;
