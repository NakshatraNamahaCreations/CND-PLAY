import React, { useState, forwardRef, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import ContentsPageService from "../service/contentspage.service";
import http from "../../http-common.function";
import ContentsFilter from "./contentsfilter";
import GenresPageService from "../../general/service/genrespage.service";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ContentsCreate = forwardRef((props, ref) => {
  const [dataCount, setDataCount] = useState(5);
  const [page, setPage] = useState(1);

  const [GenresData, setGenresData] = useState([]);
  const [geners, setgeners] = useState(false);
  const initialContentsData = {
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
    contentRating: 0,
    duration: 0,
    carouselOrder: "",
    isCarousel: false,
    trailer: "",
    subtitle: "",
    active: false,
    mobilebanner: "",
    tvhomescreenbnr: "",
    background_color: "",
    typeOfMovie: "",
  };

  var temp_publish_year_arr = [];
  for (let index = new Date().getFullYear(); index > 1950; index--) {
    temp_publish_year_arr.push(index);
  }
  const [contents_data, set_contents_data] =
    React.useState(initialContentsData);
  const [showModal, setShowModal] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [publish_years, setPublishYears] = useState(temp_publish_year_arr);

  React.useImperativeHandle(ref, () => ({
    showUpcomingCreateChildModal(single_contents_data) {
      setEdit(true);
      showContentsCreateModal();
      setDataCount(single_contents_data.dataCount);
      setPage(single_contents_data.page);
      set_contents_data({
        id: single_contents_data.id,
        section: single_contents_data.data.section,
        type: single_contents_data.data.type,
        title: single_contents_data.data.title,
        amount: single_contents_data.data.pricing.amount,
        validity: single_contents_data.data.pricing.validity,
        storyline: single_contents_data.data.storyline,
        fromYoutube: single_contents_data.data.fromYoutube,
        publish: single_contents_data.data.publish,
        banner: single_contents_data.data.banner,
        mobilebanner: single_contents_data.data.mobilebanner,
        tvhomescreenbnr: single_contents_data.data.tvhomescreenbnr,
        poster: single_contents_data.data.poster,
        video: single_contents_data.data.video,
        genres: single_contents_data.data.genres,
        likes: single_contents_data.data.likes,
        views: single_contents_data.data.views,
        rating: single_contents_data.data.rating,
        searched: single_contents_data.data.searched,
        contentRating: single_contents_data.data.contentRating,
        duration: single_contents_data.data.duration,
        background_color: single_contents_data.data.background_color,
        carouselOrder: single_contents_data.data.carouselOrder,
        isCarousel: single_contents_data.data.isCarousel,
        trailer: single_contents_data.data.trailer,
        subtitle: single_contents_data.data.subtitle,
        active: single_contents_data.data.active,
        background_color: single_contents_data.data.background_color,
      });
    },
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;

    set_contents_data({ ...contents_data, [name]: value });
  };

  const showContentsCreateModal = () => {
    set_contents_data(initialContentsData);
    setShowModal("show");
  };

  const hideContentsCreateModal = () => {
    setEdit(false);
    setShowModal("");
  };
  const handleSubmitNewContentsCreateFunc = async () => {
    let dataa = {
      background_color: contents_data.background_color?.startsWith("#")
        ? contents_data.background_color?.substring(1)
        : contents_data.background_color,
      section: contents_data.section,
      type: contents_data.type,
      title: contents_data.title,
      amount: contents_data.amount,
      validity: contents_data.validity,
      storyline: contents_data.storyline,
      fromYoutube: contents_data.fromYoutube,
      publish: contents_data.publish,
      banner: contents_data.banner,
      poster: contents_data.poster,
      video: contents_data.video,
      genres: contents_data.genres,
      likes: contents_data.likes,
      views: contents_data.views,
      rating: contents_data.rating,
      searched: contents_data.searched,
      contentRating: contents_data.contentRating,
      duration: contents_data.duration,
      background_color: contents_data.background_color,
      carouselOrder: contents_data.carouselOrder,
      isCarousel: contents_data.isCarousel,
      trailer: contents_data.trailer,
      subtitle: contents_data.subtitle,
      active: contents_data.active,
      mobilebanner: contents_data.mobilebanner,
      tvhomescreenbnr: contents_data.tvhomescreenbnr,
      typeOfMovie: contents_data.typeOfMovie,
    };

    try {
      const config = {
        url: `contents/create`,
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

  const handleSubmitExistingContentsUpdateFunc = () => {
    if (contents_data.id) {
      ContentsPageService.updateContents(contents_data, contents_data.id)
        .then((response) => {
          alert("contents updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          console.error("Error updating content event", error);
        });
    } else {
      console.error("Error: content.id is undefined");
    }
  };
  const [ShowFilter, setShowFilter] = useState(false);
  const showcontentFilter = (status) => {
    set_contents_data(initialContentsData);
    setShowFilter(status);
  };
  const handleFilter = (filteredData) => {
    console.log("Filtered data:", filteredData);
  };
  useEffect(() => {
    FetchGeners();
  }, []);
  const FetchGeners = async () => {
    let Genres = await GenresPageService.fetchGenresList();
    setGenresData(Genres.data);
  };

  const [selectedGenres, setSelectedGenres] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [personName, setPersonName] = React.useState(
    GenresData.map((item) => item.name)
  );

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;

    const selectedNames = value.filter(Boolean).map((ele) => ele.name);
    setPersonName(selectedNames);
  };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showcontentFilter(!ShowFilter)}
        ></i>
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showContentsCreateModal}
        ></i>
      </div>
      <div className="mt-2 mb-2 container-fluid">
        <div className="row">
          {ShowFilter ? <ContentsFilter onFilter={handleFilter} /> : ""}
        </div>
      </div>
      {showModal === "show" ? (
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
                Create Contents
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideContentsCreateModal}
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
                        defaultValue={contents_data.section}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Content Type - </option>
                        <option
                          selected={
                            contents_data.section === "musics" ? true : false
                          }
                          value="musics"
                        >
                          Musics
                        </option>
                        {/* selected={(contents_data.section==='musics')?true:false}  */}
                        <option
                          selected={
                            contents_data.section === "movie" ? true : false
                          }
                          value="movie"
                        >
                          Movies
                        </option>
                        {/* selected={(contents_data.section==='movie')?true:false}  */}
                        <option
                          selected={
                            contents_data.section === "series" ? true : false
                          }
                          value="series"
                        >
                          Web Series
                        </option>
                        {/* selected={(contents_data.section==='series')?true:false}  */}
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Pay Type</label>
                      <select
                        className="content_section_data form-select"
                        name="type"
                        defaultValue={contents_data.type}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Pay Type - </option>
                        <option
                          selected={
                            contents_data.type === "FREE" ? true : false
                          }
                          value="FREE"
                        >
                          FREE
                        </option>

                        <option
                          selected={
                            contents_data.type === "PAID" ? true : false
                          }
                          value="PAID"
                        >
                          PAID
                        </option>
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Youtube Content</label>
                      <select
                        className="content_section_data form-select"
                        name="fromYoutube"
                        defaultValue={contents_data.fromYoutube}
                        onChange={handleChange}
                      >
                        <option
                          selected={
                            contents_data.fromYoutube === true ? true : false
                          }
                          value={true}
                        >
                          Yes
                        </option>

                        <option
                          selected={
                            contents_data.fromYoutube === false ? true : false
                          }
                          value={false}
                        >
                          No
                        </option>
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">isCarousel Banner</label>
                      <select
                        className="content_section_data form-select"
                        name="isCarousel"
                        defaultValue={contents_data.isCarousel}
                        onChange={handleChange}
                      >
                        <option
                          selected={
                            contents_data.fromYoutube === true ? true : false
                          }
                          value={true}
                        >
                          Yes
                        </option>

                        <option
                          selected={
                            contents_data.fromYoutube === false ? true : false
                          }
                          value={false}
                        >
                          No
                        </option>
                      </select>
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label">Select Genres </label>
                      <FormControl
                        size="small"
                        sx={{
                          width: 350,
                          padding: "0px",
                          height: "32px",
                          border: "none",
                          backgroundColor: "#2a3038",
                          borderRadius: "10px",
                        }}
                        name="geners"
                        value={(contents_data.genres = personName)}
                        onChange={handleChange}
                      >
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName.map((ele) =>
                            GenresData.find((genre) => genre.name === ele)
                          )}
                          onChange={handleChange1}
                          renderValue={(selected) =>
                            selected?.map((s) => s.name)?.join(", ")
                          }
                          MenuProps={MenuProps}
                        >
                          {GenresData.map((genre, index) => (
                            <MenuItem
                              key={`${genre.name}-${index}`}
                              value={genre}
                            >
                              <Checkbox
                                checked={personName.includes(genre.name)}
                              />

                              <ListItemText primary={genre.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    {contents_data.section !== "series" &&
                      contents_data.section !== "musics" && (
                        <div className="mb-2 col-md-4">
                          <label className="form-label">Movie Type</label>
                          <select
                            className="content_section_data form-select"
                            name="typeOfMovie"
                            defaultValue={contents_data.section}
                            onChange={handleChange}
                          >
                            <option value=""> - Select Movie Type - </option>
                            <option
                              selected={
                                contents_data.typeOfMovie === "India's Movie"
                                  ? true
                                  : false
                              }
                              value="India's Movie"
                            >
                              India's Movie
                            </option>
                            {/* selected={(contents_data.section==='musics')?true:false}  */}
                            <option
                              selected={
                                contents_data.typeOfMovie === "Upcoming Movie"
                                  ? true
                                  : false
                              }
                              value="Upcoming Movie"
                            >
                              Upcoming Movie
                            </option>
                            {/* selected={(contents_data.typeOfMovie==='movie')?true:false}  */}
                            <option
                              selected={
                                contents_data.typeOfMovie === "Trending Movie"
                                  ? true
                                  : false
                              }
                              value="Trending Movie"
                            >
                              Trending Movie
                            </option>
                            {/* selected={(contents_data.section==='series')?true:false}  */}
                          </select>
                        </div>
                      )}
                    {contents_data.section === "series" &&
                      contents_data.section !== "musics" && (
                        <div className="mb-2 col-md-4">
                          <label className="form-label">Series Type</label>
                          <select
                            className="content_section_data form-select"
                            name="typeOfMovie"
                            defaultValue={contents_data.section}
                            onChange={handleChange}
                          >
                            <option value=""> - Select Series Type - </option>
                            <option
                              selected={
                                contents_data.typeOfMovie === "India's Series"
                                  ? true
                                  : false
                              }
                              value="India's Series"
                            >
                              India's Series
                            </option>
                            {/* selected={(contents_data.section==='musics')?true:false}  */}
                            <option
                              selected={
                                contents_data.typeOfMovie === "Upcoming Series"
                                  ? true
                                  : false
                              }
                              value="Upcoming Series"
                            >
                              Upcoming Series
                            </option>
                            {/* selected={(contents_data.typeOfMovie==='movie')?true:false}  */}
                            <option
                              selected={
                                contents_data.typeOfMovie === "Trending Series"
                                  ? true
                                  : false
                              }
                              value="Trending Series"
                            >
                              Trending Series
                            </option>
                            {/* selected={(contents_data.section==='series')?true:false}  */}
                          </select>
                        </div>
                      )}
                    {contents_data.section !== "series" &&
                      contents_data.section === "musics" && (
                        <div className="mb-2 col-md-4">
                          <label className="form-label">Musics Type</label>
                          <select
                            className="content_section_data form-select"
                            name="typeOfMovie"
                            defaultValue={contents_data.section}
                            onChange={handleChange}
                          >
                            <option value=""> - Select Music Type - </option>
                            <option
                              selected={
                                contents_data.typeOfMovie === "India's Music"
                                  ? true
                                  : false
                              }
                              value="India's Music"
                            >
                              India's Music
                            </option>
                            {/* selected={(contents_data.section==='musics')?true:false}  */}
                            <option
                              selected={
                                contents_data.typeOfMovie === "Upcoming Music"
                                  ? true
                                  : false
                              }
                              value="Upcoming Music"
                            >
                              Upcoming Music
                            </option>
                            {/* selected={(contents_data.typeOfMovie==='movie')?true:false}  */}
                            <option
                              selected={
                                contents_data.typeOfMovie === "Trending Music"
                                  ? true
                                  : false
                              }
                              value="Trending Music"
                            >
                              Trending Music
                            </option>
                            {/* selected={(contents_data.section==='series')?true:false}  */}
                          </select>
                        </div>
                      )}
                    <div className="mb-2 col-md-12">
                      <label className="form-label">Content Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="title"
                        name="title"
                        value={contents_data.title}
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
                        value={contents_data.storyline}
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
                        value={contents_data.amount}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Validity</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="validity"
                        name="validity"
                        value={contents_data.validity}
                        onChange={handleChange}
                      ></input>
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label">Publish Year</label>
                      <select
                        className="content_section_data form-select"
                        name="publish"
                        defaultValue={contents_data.publish}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Publish Year - </option>
                        {publish_years.map((value_p, index_p) => {
                          return (
                            <option
                              selected={
                                contents_data.publish === value_p ? true : false
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
                      <label className="form-label">Mobile Banner Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mobilebanner"
                        name="mobilebanner"
                        value={contents_data.mobilebanner}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">
                        TV HomeScreen Banner Link
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="banner"
                        name="banner"
                        value={contents_data.banner}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">TV Banner Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="tvhomescreenbnr"
                        name="tvhomescreenbnr"
                        value={contents_data.tvhomescreenbnr}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Pick Banner Color</label>
                      <input
                        type="color"
                        className="form-control form-control-sm"
                        id="background_color"
                        name="background_color"
                        value={contents_data.background_color}
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
                        value={contents_data.poster}
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
                        value={contents_data.video}
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
                onClick={hideContentsCreateModal}
              >
                Close
              </button>
              {!is_edit ? (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={handleSubmitNewContentsCreateFunc}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary f-OpenSans fs-12px"
                  onClick={() =>
                    handleSubmitExistingContentsUpdateFunc(contents_data._id)
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

export default ContentsCreate;
