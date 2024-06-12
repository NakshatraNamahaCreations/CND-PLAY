import React, { useState, useEffect, useRef } from "react";

// import IndieMovieCreate from "./indiemoviecreate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentsCreate from "./contentscreate";
// import IndieMoviePageService from "../service/indiemoviepage.service";
import ContentsPageService from "../service/contentspage.service";

const IndieMovieList = () => {
  const child = useRef();
  let dataCount = 5;
  const [page, setPage] = useState(1);
  const [prevEnabled, setPrevEnabled] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(1);
  const [triggerContent, setTriggerContent] = useState(0);
  const [Data, setData] = useState([]);

  const fetchData = async () => {
    try {
      let indieMovieList = await ContentsPageService.fetchIndieMovieList(
        dataCount,
        page
      );
      setData(indieMovieList.data);
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
      ((Data && Data.length === 0) || (Data.data && Data.length === 0))
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
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setTriggerContent(1);
      setNextEnabled(1); // Enable next button as we are navigating to a previous page
    }

    if (page - 1 === 1) {
      setPrevEnabled(0);
    }
  };

  const handlePageNext = async () => {
    try {
      let indiamovieData = await ContentsPageService.fetchIndieMovieList(
        dataCount,
        page + 1
      );

      if (Array.isArray(indiamovieData.data)) {
        setData(indiamovieData.data);
        setPrevEnabled(1);
        setPage((prevPage) => prevPage + 1);

        if (indiamovieData.data.length > 0) {
          setNextEnabled(1);
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

  const handleChangeStatusIndieMovieRecord = (index, status) => {
    ContentsPageService.changeContentsStatus({
      data: {
        status: status,
      },
      filter: { id: index },
    })

      .then((data) => {
        toast.success(
          (!status ? "Deactivated" : "Activated") + " successfully."
        );

        ContentsPageService.fetchIndieMovieList({
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
          isrecommended,
          rating,
          active,
          section,
          video,
          type,
          title,
          isCarousel,
          searched,
          trailer,
          genres,
          subtitle,
          storyline,
          publish,
          ContentRating,
          amount,
          validity,
          views,
          likes,
          background_color,
          poster,
          titleImg,
          banner,
          mobilebanner,
          tvhomescreenbnr,
          typeOfMovie,
          mobilevideolink,
          cast,
          creaw,

          duration,
        } = ele;

        const updatedData = {
          id: _id,
          poster: poster,
          title: title,
          section: section,
          bgcolor: background_color?.startsWith("#")
            ? background_color?.substring(1)
            : background_color,
          type: type,
          amount: amount,
          validity: validity,
          storyline: storyline,
          publish: publish,
          banner: banner,
          video: video,
          genres: genres,
          likes: likes,
          views: views,
          rating: rating,
          searched: searched,
          ContentRating: ContentRating,
          duration: duration,
          isCarousel: isCarousel,
          trailer: trailer,
          subtitle: subtitle,
          mobilebanner: mobilebanner,
          tvhomescreenbnr: tvhomescreenbnr,
          background_color: background_color,

          active: active,
          dataCount,
          page,
          typeOfMovie: typeOfMovie,
          cast,
          creaw,
          mobilevideolink,
          titleImg,
        };

        child.current.showContentsCreateChildModal(updatedData);
      }
    });
  };

  const handleTrashindiamovieRecord = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Content?`
    );

    if (confirmed) {
      ContentsPageService.trashContents(idd)
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
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-12">
            <ContentsCreate ref={child} />
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
                        <th>SI.No</th>
                        <th>#</th>
                        <th>Contents Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>validity</th>
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
                            poster,
                            title,
                            section,
                            type,

                            active,
                            bgcolor,
                            validity,
                            amount,
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
                              <td>{section.toUpperCase()}</td>
                              <td>{type === "FREE" ? type : amount}</td>
                              <td>
                                {type === "FREE" ? "Unlimited" : validity}
                              </td>

                              <td>
                                {active ? (
                                  <i
                                    className="mdi mdi-checkbox-marked-circle-outline text-white"
                                    onClick={() =>
                                      handleChangeStatusIndieMovieRecord(
                                        value?._id,
                                        active ? 0 : 1
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    className="mdi mdi-checkbox-blank-circle-outline text-white"
                                    onClick={() =>
                                      handleChangeStatusIndieMovieRecord(
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
                                          handleTrashindiamovieRecord(
                                            value?._id
                                          )
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

export default IndieMovieList;
