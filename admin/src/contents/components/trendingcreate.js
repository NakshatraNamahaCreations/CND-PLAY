import React, { useState, forwardRef } from "react";
import http from "../../http-common.function";
import "react-toastify/dist/ReactToastify.css";
import ContentsPageService from "../service/trendingpage.service";
import ContentsFilter from "./contentsfilter";

const TrendingCreate = forwardRef((props, ref) => {
  const initialtrendingData = {
    section: "",
    type: "",
    title: "",
    amount: 0,
    validity: "",
    banner: "",
    poster: "",
    active: false,
  };

  var temp_publish_year_arr = [];
  for (let index = new Date().getFullYear(); index > 1950; index--) {
    temp_publish_year_arr.push(index);
  }
  const [trending_data, set_trending_data] =
    React.useState(initialtrendingData);
  const [dataCount, setDataCount] = useState(5);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [is_edit, setEdit] = useState(false);

  React.useImperativeHandle(ref, () => ({
    showContentsCreateChildModal(Trendingdata) {
      setEdit(true);
      showtrendingCreateModal();
      setDataCount(Trendingdata.dataCount);
      setPage(Trendingdata.page);

      set_trending_data({
        id: Trendingdata.id,
        section: Trendingdata.data.section,
        title: Trendingdata.data.title,
        amount: Trendingdata.data.pricing?.amount,
        validity: Trendingdata.data.pricing?.validity,
        poster: Trendingdata.data.poster,
        active: Trendingdata.data.active,
        banner: Trendingdata.data.banner,
      });
    },
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_trending_data({ ...trending_data, [name]: value });
  };
  const showtrendingCreateModal = () => {
    set_trending_data(initialtrendingData);
    setShowModal("show");
  };

  const hidetrendingCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewtrendingCreateFunc = async () => {
    let dataa = {
      section: trending_data.section,
      type: trending_data.type,
      title: trending_data.title,
      amount: trending_data.amount,
      validity: trending_data.validity,
      poster: trending_data.poster,
      banner: trending_data.banner,
    };

    try {
      const config = {
        url: `trending/create`,
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
  const handleSubmitExistingtrendingUpdateFunc = () => {
    if (trending_data.id) {
      ContentsPageService.updateTrending(trending_data, trending_data.id)
        .then((response) => {
          alert("trending movie updated successfully", response);
          window.location.reload("/");
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error updating trending event", error);
        });
    } else {
      console.error("Error: upcoming_data.id is undefined");
    }
  };
  const [ShowFilter, setShowFilter] = useState(false);
  const showcontentFilter = (status) => {
    set_trending_data(initialtrendingData);
    setShowFilter(status);
  };

  return (
    <div className="mt-2 row">
      {/* <div className="mt-2 container-fluid">
        
        <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showcontentFilter(!ShowFilter)}
        ></i>
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showtrendingCreateModal}
        ></i>
      </div> */}
      {/* <div className="mt-2 mb-2 container-fluid">
        <div className="row">{ShowFilter ? <ContentsFilter /> : ""}</div>
      </div> */}
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
        id="contents_create"
        style={{ display: showModal === "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="contents_create_title"
              >
                Create Trending
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hidetrendingCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="contents_form">
                <div className="container-fluid">
                  <div className="row">
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Content Type</label>
                      <select
                        className="content_section_data form-select"
                        name="section"
                        defaultValue={trending_data.section}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Content Type - </option>
                        <option
                          selected={
                            trending_data.section === "musics" ? true : false
                          }
                          value="musics"
                        >
                          Musics
                        </option>
                        {/* selected={(trending_data.section==='musics')?true:false}  */}
                        <option
                          selected={
                            trending_data.section === "movie" ? true : false
                          }
                          value="movie"
                        >
                          Movies
                        </option>
                        {/* selected={(trending_data.section==='movie')?true:false}  */}
                        <option
                          selected={
                            trending_data.section === "series" ? true : false
                          }
                          value="series"
                        >
                          Web Series
                        </option>
                        {/* selected={(trending_data.section==='series')?true:false}  */}
                      </select>
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label">Content Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="title"
                        name="title"
                        value={trending_data.title}
                        onChange={handleChange}
                      ></input>
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label">Content Price</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="amount"
                        name="amount"
                        defaultValue={
                          !is_edit
                            ? trending_data.pricing?.amount
                            : trending_data.amount
                        }
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label">Validity</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="validity"
                        name="validity"
                        defaultValue={
                          !is_edit
                            ? trending_data.pricing?.validity
                            : trending_data.validity
                        }
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label">Poster Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="poster"
                        name="poster"
                        value={trending_data.poster}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Banner Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="banner"
                        name="banner"
                        value={trending_data.banner}
                        onChange={handleChange}
                      ></input>
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
                onClick={hidetrendingCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewtrendingCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={() =>
                    handleSubmitExistingtrendingUpdateFunc(trending_data?._id)
                  }
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

export default TrendingCreate;
