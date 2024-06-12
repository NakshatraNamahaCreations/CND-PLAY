import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import http from "../../http-common.function";

import ContentsPageService from "../service/indiemoviepage.service";

import "react-toastify/dist/ReactToastify.css";
import IndieMovieFilter from "./indiemoviefilter";

const IndieMovieCreate = forwardRef((props, ref) => {
  const initialIndieMovieData = {
    section: "",
    type: "",
    title: "",
    amount: 0,
    validity: "",
    storyline: "",
    fromYoutube: false,
    publish: new Date(),
    banner: "",
    poster: "",
    video: "",
    genres: [],
    likes: 0,
    views: 0,
    rating: 0,
    searched: 0,
    ContentRating: 0,
    duration: 0,
    background_color: "",
    carouselOrder: "",
    isCarousel: false,
    trailer: "",
    subtitle: "",
    active: false,
  };

  var temp_publish_year_arr = [];
  for (let index = new Date().getFullYear(); index > 1950; index--) {
    temp_publish_year_arr.push(index);
  }
  const [indie_movie_data, set_indie_movie_data] = React.useState(
    initialIndieMovieData
  );

  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [is_edit, setEdit] = useState(false);

  const [publish_years, setPublishYears] = useState(temp_publish_year_arr);

  React.useImperativeHandle(ref, () => ({
    showIndieMovieCreateChildModal(single_indie_movie_data) {
      setEdit(true);
      showIndieMovieCreateModal();
      set_indie_movie_data({
        id: single_indie_movie_data.id,
        section: single_indie_movie_data.data.section,
        type: single_indie_movie_data.data.type,
        title: single_indie_movie_data.data.title,
        amount: single_indie_movie_data.data.amount,
        validity: single_indie_movie_data.data.validity,
        storyline: single_indie_movie_data.data.storyline,
        // fromYoutube: single_indie_movie_data.data.fromYoutube,
        publish: single_indie_movie_data.data.publish,
        banner: single_indie_movie_data.data.banner,
        poster: single_indie_movie_data.data.poster,
        video: single_indie_movie_data.data.video,
        genres: single_indie_movie_data.data.genres,
        likes: single_indie_movie_data.data.likes,
        views: single_indie_movie_data.data.views,
        rating: single_indie_movie_data.data.rating,
        searched: single_indie_movie_data.data.searched,
        ContentRating: single_indie_movie_data.data.ContentRating,
        duration: single_indie_movie_data.data.duration,
        background_color: single_indie_movie_data.data.background_color,
        carouselOrder: single_indie_movie_data.data.carouselOrder,
        isCarousel: single_indie_movie_data.data.isCarousel,
        duration: single_indie_movie_data.data.duration,
        trailer: single_indie_movie_data.data.trailer,
        subtitle: single_indie_movie_data.data.subtitle,
        active: single_indie_movie_data.data.active,
      });
    },
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    set_indie_movie_data({ ...indie_movie_data, [name]: value });
  };
  const showIndieMovieCreateModal = () => {
    set_indie_movie_data(initialIndieMovieData);
    setShowModal("show");
  };
  const showIndieMovieFilter = (status) => {
    set_indie_movie_data(initialIndieMovieData);
    setShowFilter(status);
  };
  const hideIndieMovieCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };

  const handleSubmitNewIndieMovieCreateFunc = async () => {
    let dataa = {
      section: indie_movie_data.section,
      type: indie_movie_data.type,
      title: indie_movie_data.title,
      amount: indie_movie_data.amount,
      validity: indie_movie_data.validity,
      storyline: indie_movie_data.storyline,
      // fromYoutube: indie_movie_data.fromYoutube,
      publish: indie_movie_data.publish,
      active: indie_movie_data.active,
      subtitle: indie_movie_data.subtitle,
      trailer: indie_movie_data.trailer,
      duration: indie_movie_data.duration,
      isCarousel: indie_movie_data.isCarousel,
      carouselOrder: indie_movie_data.carouselOrder,
      background_color: indie_movie_data.background_color,
      ContentRating: indie_movie_data.ContentRating,
      searched: indie_movie_data.searched,
      rating: indie_movie_data.rating,
      views: indie_movie_data.views,
      likes: indie_movie_data.likes,
      genres: indie_movie_data.genres,
      video: indie_movie_data.video,
      poster: indie_movie_data.poster,
      banner: indie_movie_data.banner,
    };

    try {
      const config = {
        url: `indiemovie/create`,
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
        console.log("Unexpected response:", config);
      }
    } catch (error) {
      console.error("Error while saving:", error);
    }
  };

  const handleSubmitExistingIndieMovieUpdateFunc = () => {
    if (indie_movie_data.id) {
      ContentsPageService.updateIndieMovie(
        indie_movie_data,
        indie_movie_data.id
      )
        .then((response) => {
          alert("india movie  updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating indiamovie event", error);
        });
    } else {
      console.error("Error: upcoming_data.id is undefined");
    }
  };

  return (
    <div className="mt-2 row">
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
        id="indie_movie_create"
        style={{ display: showModal == "show" ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title f-OpenSans fs-14px"
                id="indie_movie_create_title"
              >
                Create Indie Movie
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideIndieMovieCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <form action="POST" name="indie_movie_form">
                <div className="container-fluid">
                  <div className="row">
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Content Type</label>
                      <select
                        className="content_section_data form-select"
                        name="section"
                        defaultValue={indie_movie_data.section}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Content Type - </option>
                        <option
                          selected={
                            indie_movie_data.section === "musics" ? true : false
                          }
                          value="musics"
                        >
                          Musics
                        </option>
                        {/* selected={(indie_movie_data.section==='musics')?true:false}  */}
                        <option
                          selected={
                            indie_movie_data.section === "movie" ? true : false
                          }
                          value="movie"
                        >
                          Movies
                        </option>
                        {/* selected={(indie_movie_data.section==='movie')?true:false}  */}
                        <option
                          selected={
                            indie_movie_data.section === "series" ? true : false
                          }
                          value="series"
                        >
                          Web Series
                        </option>
                        {/* selected={(indie_movie_data.section==='series')?true:false}  */}
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Pay Type</label>
                      <select
                        className="content_section_data form-select"
                        name="type"
                        defaultValue={indie_movie_data.type}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Pay Type - </option>
                        <option
                          selected={
                            indie_movie_data.type === "FREE" ? true : false
                          }
                          value="FREE"
                        >
                          FREE
                        </option>
                        {/* selected={(indie_movie_data.type==='FREE')?true:false} */}
                        <option
                          selected={
                            indie_movie_data.type === "PAID" ? true : false
                          }
                          value="PAID"
                        >
                          PAID
                        </option>
                        {/* selected={(indie_movie_data.type==='PAID')?true:false} */}
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Youtube Content</label>
                      <select
                        className="content_section_data form-select"
                        name="fromYoutube"
                        defaultValue={indie_movie_data.fromYoutube}
                        onChange={handleChange}
                      >
                        <option
                          selected={
                            indie_movie_data.fromYoutube === true ? true : false
                          }
                          value={true}
                        >
                          Yes
                        </option>
                        {/* selected={(indie_movie_data.fromYoutube===true)?true:false} */}
                        <option
                          selected={
                            indie_movie_data.fromYoutube === false
                              ? true
                              : false
                          }
                          value={false}
                        >
                          No
                        </option>
                        {/* selected={(indie_movie_data.fromYoutube===false)?true:false} */}
                      </select>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Content Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="title"
                        name="title"
                        value={indie_movie_data.title}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Storyline</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows="4"
                        id="storyline"
                        name="storyline"
                        value={indie_movie_data.storyline}
                        onChange={handleChange}
                      ></textarea>
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
                            ? indie_movie_data?.amount
                            : indie_movie_data.amount
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
                            ? indie_movie_data?.validity
                            : indie_movie_data.validity
                        }
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label">Publish Year</label>
                      <select
                        className="content_section_data form-select"
                        name="publish"
                        defaultValue={indie_movie_data.publish}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Publish Year - </option>
                        {publish_years.map((value_p, index_p) => {
                          return (
                            <option
                              selected={
                                indie_movie_data.publish === value_p
                                  ? true
                                  : false
                              }
                              value={value_p}
                            >
                              {value_p}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Banner Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="banner"
                        name="banner"
                        value={indie_movie_data.banner}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Poster Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="poster"
                        name="poster"
                        value={indie_movie_data.poster}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Video Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="video"
                        name="video"
                        value={indie_movie_data.video}
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
                onClick={hideIndieMovieCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewIndieMovieCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitExistingIndieMovieUpdateFunc}
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

export default IndieMovieCreate;
