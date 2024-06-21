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

  const [CastData, set_Cast] = useState([]);
  const [CrewData, set_Crew] = useState([]);

  const [GenresData, setGenresData] = useState([]);

  const initialContentsData = {
    section: "",
    type: "",
    title: "",
    amount: 0,
    validity: "",
    storyline: "",
    isrecommended: false,
    publish: new Date(),
    banner: "",
    poster: "",
    video: "",
    likes: 0,
    views: 0,
    rating: 0,
    searched: 0,
    duration: "",
    isCarousel: false,
    trailer: "",
    subtitle: "",
    active: false,
    mobilebanner: "",
    tvhomescreenbnr: "",
    background_color: "",
    typeOfMovie: "",
    titleImg: "",
    creaw: "",
  };

  var temp_publish_year_arr = [];
  for (let index = new Date().getFullYear(); index > 1950; index--) {
    temp_publish_year_arr.push(index);
  }
  const [contents_data, set_contents_data] = useState(initialContentsData);

  const [showModal, setShowModal] = useState(false);
  const [is_edit, setEdit] = useState(false);
  const [publish_years, setPublishYears] = useState(temp_publish_year_arr);
  const [SelctedGeners, setSelctedGeners] = React.useState(
    GenresData.map((item) => item.name)
  );

  React.useImperativeHandle(ref, () => ({
    showContentsCreateChildModal(single_contents_data) {
      setEdit(true);
      showContentsCreateModal();
      setDataCount(single_contents_data.dataCount);
      setPage(single_contents_data.page);
      set_contents_data({
        id: single_contents_data.id,
        section: single_contents_data.section,
        type: single_contents_data.type,
        title: single_contents_data.title,
        amount: single_contents_data.amount,
        validity: single_contents_data.validity,
        storyline: single_contents_data.storyline,
        isrecommended: single_contents_data.isrecommended,
        publish: single_contents_data.publish,
        banner: single_contents_data.banner,
        mobilebanner: single_contents_data.mobilebanner,
        tvhomescreenbnr: single_contents_data.tvhomescreenbnr,
        poster: single_contents_data.poster,
        video: single_contents_data.video,
        likes: single_contents_data.likes,
        views: single_contents_data.views,
        rating: single_contents_data.rating,
        searched: single_contents_data.searched,
        ContentRating: single_contents_data.ContentRating,
        duration: single_contents_data.duration,
        background_color: single_contents_data.background_color,
        isCarousel: single_contents_data.isCarousel,
        trailer: single_contents_data.trailer,
        subtitle: single_contents_data.subtitle,
        active: single_contents_data.active,
        titleImg: single_contents_data.titleImg,

        typeOfMovie: single_contents_data.typeOfMovie,
      });
      setNumberOfInputs(single_contents_data.cast.length);
      setNumberOfCreaw(single_contents_data.creaw.length);
      set_Cast(single_contents_data.cast);
      set_Crew(single_contents_data.creaw);
      setSelctedGeners(single_contents_data.genres);
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
      isrecommended: contents_data.isrecommended,
      publish: contents_data.publish,
      banner: contents_data.banner,
      poster: contents_data.poster,
      video: contents_data.video,
      genres: SelctedGeners,
      likes: contents_data.likes,
      views: contents_data.views,
      rating: contents_data.rating,
      searched: contents_data.searched,
      ContentRating: contents_data.ContentRating,
      duration: contents_data.duration,
      isCarousel: contents_data.isCarousel,
      trailer: contents_data.trailer,
      subtitle: contents_data.subtitle,
      active: contents_data.active,
      mobilebanner: contents_data.mobilebanner,
      tvhomescreenbnr: contents_data.tvhomescreenbnr,
      typeOfMovie: contents_data.typeOfMovie,
      titleImg: contents_data.titleImg,
      cast: CastData,
      creaw: CrewData,
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
        // console.log("Unexpected response:", config);
      }
    } catch (error) {
      // console.error("Error while saving:", error);
    }
  };

  const handleSubmitExistingContentsUpdateFunc = () => {
    if (contents_data.id) {
      let data = {
        contents_data,
        genres: SelctedGeners,
        cast: CastData,
        creaw: CrewData,
      };

      ContentsPageService.updateContents(data, contents_data.id)
        .then((response) => {
          alert("contents updated successfully", response);
          window.location.reload("/");
        })
        .catch((error) => {
          // console.error("Error updating content event", error);
        });
    } else {
      // console.error("Error: content.id is undefined");
    }
  };

  useEffect(() => {
    FetchGeners();
  }, []);
  let count = 0;
  const [ContentData, setContentData] = useState([]);
  const FetchGeners = async () => {
    let Genres = await GenresPageService.getAllGenersData();
    let ContentData1 = await ContentsPageService.fetchContentsAllList();
    setContentData(ContentData1);
    setGenresData(Genres.data);
  };

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

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;

    const selectedNames = value?.filter(Boolean).map((ele) => ele.name);
    setSelctedGeners(selectedNames);
  };
  const [numberOfInputs, setNumberOfInputs] = useState(1);
  const [numberOfCreaw, setNumberOfCreaw] = useState(1);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const index = name.match(/\d+/)[0] - 1;
    const key = name.replace(/\d+/g, "");

    set_Cast((prev) => {
      const updatedCast = [...prev];
      if (!updatedCast[index]) {
        updatedCast[index] = {};
      }
      updatedCast[index][key] = value;
      return updatedCast;
    });
  };

  const handleCreawChange = (e) => {
    const { name, value } = e.target;
    const index = name.match(/\d+/)[0] - 1;
    const key = name.replace(/\d+/g, "");

    set_Crew((prev) => {
      const updatedCrew = [...prev];
      if (!updatedCrew[index]) {
        updatedCrew[index] = {};
      }
      updatedCrew[index][key] = value;
      return updatedCrew;
    });
  };

  const handleAddCreaw = () => {
    setNumberOfCreaw((prevNumber) => prevNumber + 1);
  };

  const handleAddInput = () => {
    setNumberOfInputs((prevNumber) => prevNumber + 1);
  };
  const handleremoveCast = (index) => {
    setNumberOfInputs((prev) => prev - 1);

    set_Cast((prev) => {
      const updatedCast = [...prev];
      updatedCast.splice(index, 1);
      return updatedCast;
    });
  };
  const handleremoveCreaw = (index) => {
    setNumberOfCreaw((prev) => prev - 1);

    set_Crew((prev) => {
      const updatedCrew = [...prev];
      updatedCrew.splice(index, 1);
      return updatedCrew;
    });
  };

  return (
    <div className="mt-2 row">
      <div className="mt-2 container-fluid">
        {/* <i
          className="mdi mdi-filter-variant float-right mr-2"
          onClick={() => showcontentFilter(!ShowFilter)}
        ></i> */}
        <i
          className="mdi mdi-plus-circle-outline float-right mr-2"
          onClick={showContentsCreateModal}
        ></i>
      </div>
      {/* <div className="mt-2 mb-2 container-fluid">
        <div className="row">
          {ShowFilter ? <ContentsFilter onFilter={handleFilter} /> : ""}
        </div>
      </div> */}
      {showModal === "show" ? (
        <div className="modal-backdrop fade show"></div>
      ) : (
        ""
      )}
      <div
        className={`modal fade f-OpenSans fs-14px ${showModal} `}
        tabIndex="-1"
        role="dialog"
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
                        {/* <option
                          selected={
                            contents_data.section === "musics" ? true : false
                          }
                          value="musics"
                        >
                          Musics
                        </option> */}
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
                            contents_data.type === "PREMIUM" ? true : false
                          }
                          value="PREMIUM"
                        >
                          PREMIUM
                        </option>
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Recommended Content</label>
                      {ContentData.map((Ele) => {
                        if (Ele.isrecommended === true && count <= 10) {
                          count++;
                        }
                        return null;
                      })}

                      <select
                        disabled={count === 10}
                        className="content_section_data form-select"
                        name="isrecommended"
                        defaultValue={contents_data.isrecommended}
                        onChange={handleChange}
                      >
                        <option
                          selected={
                            contents_data.isrecommended === true ? true : false
                          }
                          value={true}
                        >
                          Yes
                        </option>

                        <option
                          selected={
                            contents_data.isrecommended === false ? true : false
                          }
                          value={false}
                        >
                          No
                        </option>
                      </select>
                      {count === 10 && (
                        <p className="text-white">
                          Already 10 has been Recommended
                        </p>
                      )}
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">isCarousel Banner</label>
                      <select
                        className="content_section_data form-select"
                        name="isCarousel"
                        defaultValue={contents_data.isCarousel}
                        onChange={handleChange}
                      >
                        <option>Select</option>
                        <option
                          selected={
                            contents_data.isCarousel === true ? true : false
                          }
                          value={true}
                        >
                          Yes
                        </option>

                        <option
                          selected={
                            contents_data.isCarousel === false ? true : false
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
                        defaultValue={SelctedGeners}
                      >
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={SelctedGeners?.map((ele) =>
                            GenresData?.find((genre) => genre?.name === ele)
                          )}
                          onChange={handleChange1}
                          renderValue={(selected) =>
                            selected?.map((s) => s?.name)?.join(", ")
                          }
                          MenuProps={MenuProps}
                          className="text-white"
                        >
                          {GenresData.map((genre, index) => (
                            <MenuItem
                              key={`${genre.name}-${index}`}
                              value={genre}
                            >
                              <Checkbox
                                checked={SelctedGeners.includes(genre.name)}
                              />

                              <ListItemText className="text-white">
                                <span>{genre.name}</span>
                              </ListItemText>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/* {contents_data.section !== "series" &&
                      contents_data.section !== "musics" && ( */}
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Movie Type</label>
                      <select
                        className="content_section_data form-select"
                        name="typeOfMovie"
                        defaultValue={contents_data.typeOfMovie}
                        onChange={handleChange}
                      >
                        <option value=""> - Select Movie Type - </option>
                        <option
                          selected={
                            contents_data.typeOfMovie === "Indie" ? true : false
                          }
                          value="Indie"
                        >
                          Indie
                        </option>
                        <option
                          selected={
                            contents_data.typeOfMovie === "Upcoming"
                              ? true
                              : false
                          }
                          value="Upcoming"
                        >
                          Upcoming
                        </option>

                        <option
                          selected={
                            contents_data.typeOfMovie === "Trending"
                              ? true
                              : false
                          }
                          value="Trending"
                        >
                          Trending
                        </option>
                      </select>
                    </div>
                    {/* )} */}
                    {/* {contents_data.section === "series" &&
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
                                contents_data.typeOfMovie === "Indie Series"
                                  ? true
                                  : false
                              }
                              value="Indie Series"
                            >
                              Indie Series
                            </option>
                       
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
                      
                          </select>
                        </div>
                      )} */}
                    {/* {contents_data.section !== "series" &&
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
                                contents_data.typeOfMovie === "Indie Music"
                                  ? true
                                  : false
                              }
                              value="Indie Music"
                            >
                              Indie Music
                            </option>

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
                          </select>
                        </div>
                      )} */}
                    <div className="mb-2 col-md-4">
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
                    <div
                      className={`${
                        contents_data?.typeOfMovie === "Upcoming"
                          ? "col-md-2"
                          : "col-md-4"
                      } mb-2 `}
                    >
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
                    {contents_data?.typeOfMovie === "Upcoming" && (
                      <div className="mb-2 col-md-2">
                        <label className="form-label">
                          Upcoming Movie Date
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="subtitle"
                          name="subtitle"
                          placeholder="DD/MM/YY"
                          value={contents_data.subtitle}
                          onChange={handleChange}
                        ></input>
                      </div>
                    )}

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
                    <div className="mb-2 col-md-6">
                      <label className="form-label">
                        Pick Banner Color {contents_data?.background_color}
                      </label>
                      <input
                        type="color"
                        className="form-control form-control-sm"
                        id="background_color"
                        name="background_color"
                        defaultValue={contents_data.background_color}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-6">
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
                              selected={contents_data.publish}
                              value={value_p}
                            >
                              {value_p}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Title Image Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="titleImg"
                        name="titleImg"
                        value={contents_data.titleImg}
                        onChange={handleChange}
                      ></input>
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
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Trailer Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="trailer"
                        name="trailer"
                        value={contents_data.trailer}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Video Duration</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="duration"
                        name="duration"
                        value={contents_data.duration}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-2 col-md-4">
                      <label className="form-label">Rating</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="rating"
                        name="rating"
                        value={contents_data.rating}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span className="d-flex">
                          {" "}
                          <i
                            className="mdi mdi-plus-circle-outline float-right mr-2"
                            onClick={handleAddInput}
                          ></i>
                          <span> Add Cast</span>
                        </span>
                      </div>
                    </div>
                    {[...Array(numberOfInputs)].map((_, index) => (
                      <div className="row" key={index}>
                        <div className="mb-2 col-md-4">
                          <label className="form-label">Actor Name</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name={`actor${index + 1}`}
                            value={CastData[index]?.actor || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-2 col-md-4">
                          <label className="form-label">Role</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name={`charcter${index + 1}`}
                            value={CastData[index]?.charcter || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-2 col-md-3">
                          <label className="form-label">Profile</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name={`actorProfile${index + 1}`}
                            value={CastData[index]?.actorProfile || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <i
                          class="mdi color-red mdi-delete-circle col-md-1 m-auto"
                          onClick={() => handleremoveCast(index)}
                        ></i>
                      </div>
                    ))}
                    <div className="row">
                      <div className="row">
                        <div className="col-md-4">
                          <span className="d-flex">
                            {" "}
                            <i
                              className="mdi mdi-plus-circle-outline float-right mr-2"
                              onClick={handleAddCreaw}
                            ></i>{" "}
                            <span> Add Crew</span>
                          </span>
                        </div>
                      </div>

                      {[...Array(numberOfCreaw)].map((_, index) => (
                        <div className="row" key={index}>
                          <div className="mb-2 col-md-4">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name={`name${index + 1}`}
                              value={CrewData[index]?.name || ""}
                              onChange={handleCreawChange}
                            />
                          </div>
                          <div className="mb-2 col-md-4">
                            <label className="form-label">Role</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name={`Role${index + 1}`}
                              value={CrewData[index]?.Role || ""}
                              onChange={handleCreawChange}
                            />
                          </div>
                          <div className="mb-2 col-md-3">
                            <label className="form-label">Profile</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name={`profile${index + 1}`}
                              value={CrewData[index]?.profile || ""}
                              onChange={handleCreawChange}
                            />
                          </div>

                          <i
                            class="mdi color-red mdi-delete-circle col-md-1 m-auto"
                            onClick={() => handleremoveCreaw(index)}
                          ></i>
                        </div>
                      ))}
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
