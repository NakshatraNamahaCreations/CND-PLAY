import React, { useEffect, useState, useRef, createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Carousel from "react-bootstrap/Carousel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoInformationCircleOutline } from "react-icons/io5";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { ImFilm } from "react-icons/im";
import { AiOutlineDislike } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  // BGBnners,
  // mostvieved,
  mostvieved2,
  RecommendedMovies,
  BGBnners2,
  BGBnners3,
  LanguageWise,
  // ContentData,
} from "./JsonData";
import Footer from "./footer";
import ContentsPageService from "./DataApi/Api";

import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { setWatchListId, removeListId } from "./DataStore.js/Slice/Watchlist";
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestSlidesData, setLatestSlidesData] = useState(0);
  const [mostViewedSlidesData, setMostViewedSlidesData] = useState(0);
  const [mostViewedSlidesData2, setMostViewedSlidesData2] = useState(0);
  const [Recommended, setRecommended] = useState(0);
  const [LanguageWisedata, setLanguageWisedata] = useState(0);
  const [restartAnimation2, setRestartAnimation2] = useState(false);
  const [hideimage, setHideImage] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [currentSlides, setCurrentSlides] = useState(0);
  const [toptenMovies, setToptenMovies] = useState(0);
  const [videoProgress, setVideoProgress] = useState({});
  const [ContentData, setContentData] = useState([]);
  const [mostViewedM, setMostViewedM] = useState([]);
  const [BannerData, setBannerData] = useState([]);
  // handle banner
  const [animateLogo, setAnimateLogo] = useState(true);
  const [restartAnimation, setRestartAnimation] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [pausedTime, setPausedTime] = useState({});
  const [Volume, setVolume] = useState(false);
  const [PlayVideo, setPlayVideo] = useState(false);
  const [BVolume, setBVolume] = useState(false);
  const [WatchLater, setWatchLater] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const handleSelect = (index, direction) => {
    setCurrentSlide(index);
    setAnimateLogo(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 0 : prevSlide - 1));
    setAnimateLogo(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === BannerData.length - 1 ? prevSlide : prevSlide + 1
    );
    setAnimateLogo(true);
  };
  useEffect(() => {
    setRestartAnimation2(true);
  }, [currentSlides]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide === BannerData?.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide((prevSlide) => prevSlide + 1);
      }
      setAnimateLogo(true);
      setLogoVisible(true);
    }, 3000);
    setRestartAnimation(true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [restartAnimation, currentSlide, animateLogo]);

  const visibleCards = BGBnners2?.slice(currentSlides, currentSlides + 4);

  const handelnextSlider = (index) => {
    if (index === 0) {
      setLatestSlidesData(
        (prevSlide) => (prevSlide + 1) % (ContentData.length - 5)
      );
    }
    if (index === 1) {
      setMostViewedSlidesData(
        (prevSlide) => (prevSlide + 1) % (mostViewedM.length - 5)
      );
    }
    if (index === 2) {
      setLanguageWisedata(
        (prevSlide) => (prevSlide + 1) % (LanguageWise.length - 5)
      );
    }
    if (index === 3) {
      setRecommended(
        (prevSlide) => (prevSlide + 1) % (RecommendedMovies.length - 5)
      );
    }

    if (index === 4) {
      setCurrentSlides((prevSlide) => (prevSlide + 3) % (BGBnners2.length - 3));
    }
    if (index === 5) {
      setMostViewedSlidesData2(
        (prevSlide) => (prevSlide + 1) % (mostvieved2.length - 4)
      );
    }
  };

  const handelprevSlider = (index) => {
    if (index === 0) {
      setLatestSlidesData((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : ContentData.length - 5
      );
    }
    if (index === 1) {
      setMostViewedSlidesData((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : mostViewedM.length - 5
      );
    }
    if (index === 2) {
      setLanguageWisedata((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : LanguageWise.length - 5
      );
    }
    if (index === 3) {
      setRecommended((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : RecommendedMovies.length - 5
      );
    }
    if (index === 4) {
      setCurrentSlides((prevSlide) =>
        prevSlide > 3 ? prevSlide - 4 : BGBnners2.length - 4
      );
    }
    if (index === 5) {
      setMostViewedSlidesData2((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : mostvieved2.length - 3
      );
    }
  };

  //  videos

  const videoRefs = useRef([]);

  useEffect(() => {
    ContentData.forEach((ele) => {
      videoRefs.current[ele.id] = videoRefs.current[ele._id] || createRef();
    });
  }, [ContentData]);

  const handleMouseOver = (videoId) => {
    setHoveredVideoId(videoId);
    const video = videoRefs.current[videoId]?.current;

    if (video) {
      const currentTime = pausedTime[videoId] || 0;
      video.currentTime = currentTime;
      video.play().catch((error) => console.error(error));
    }
  };

  const handleMouseOut = (videoId) => {
    setHoveredVideoId(null);
    setHideImage(false);

    const video = videoRefs.current[videoId]?.current;

    if (video) {
      if (!video.paused && !video.ended) {
        const currentTime = video.currentTime;
        setPausedTime((prevPausedTime) => ({
          ...prevPausedTime,
          [videoId]: currentTime,
        }));
        video.pause();
      }
    }
  };

  const handleProgress = (videoId) => {
    const video = videoRefs.current[videoId]?.current;

    if (video) {
      const percentage = (video.currentTime / video.duration) * 100;
      setVideoProgress((prevProgress) => ({
        ...prevProgress,
        [videoId]: percentage,
      }));
    }
  };

  const handleMouseMove = (e, videoId) => {
    const video = videoRefs.current[videoId]?.current;
    setHideImage(true);
    if (video && videoRefs.current[videoId]?.isMounted) {
      const mouseX = e.nativeEvent.offsetX;
      const progressBarWidth = video.offsetWidth;
      const scrubTime = (mouseX / progressBarWidth) * video.duration;

      if (scrubTime >= 0 && scrubTime <= video.duration) {
        setVideoProgress((prevProgress) => ({
          ...prevProgress,
          [videoId]: (scrubTime / video.duration) * 100,
        }));

        if (video.paused || video.ended) {
          video.currentTime = scrubTime;
          video.play().catch((error) => console.error(error));
        }
      }
    }
  };
  useEffect(() => {
    if (!PlayVideo) {
      const intervalId = setInterval(() => {
        setToptenMovies((prevIndex) => (prevIndex + 1) % BGBnners3.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [BGBnners3.length, PlayVideo]);

  //  backend Api intigration

  const fetchData = async () => {
    let listOfMovie = await ContentsPageService.fetchContentsList();
    let mostvieved = await ContentsPageService.fetchMostViewList();
    let BannerData = await ContentsPageService.getBanerdata();

    setContentData(listOfMovie);
    setMostViewedM(mostvieved);
    setBannerData(BannerData);
  };
  const [views, setViews] = useState();
  const incrementViews = async (Item) => {
    try {
      if (ContentData.length > 0) {
        await ContentsPageService.postViews(Item);
        setViews((prevViews) => prevViews + 1);
        navigate("/WatchVideoMode", { state: { id: Item } });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const isInWishlist = useSelector((state) => state.watchlist.value);

  const handleWatchList = (item) => {
    dispatch(setWatchListId(item));
    setWatchLater(true);
  };
  const handleRemoveItem = (item) => {
    let Watchltr = isInWishlist?.filter((ele) => ele === item);
    if (Watchltr) {
      dispatch(removeListId(item));
      setWatchLater(false);
    }
  };

  return (
    <>
      <div className="row m-auto bg-mg">
        <div className="row m-auto relativeP">
          <Carousel activeIndex={currentSlide} onSelect={handleSelect}>
            {BannerData?.map((Ele, index) => (
              <Carousel.Item key={index} className="relativeP">
                <div className="overlay"></div>
                <Link state={{ id: Ele?._id }} to="/WatchVideoMode">
                  <img src={Ele?.banner} alt="" className="slide" />
                </Link>
                <div
                  className={`row logo-container ${
                    logoVisible ? "visible" : "hidden"
                  }`}
                >
                  <div className="row mb-3">
                    <img
                      src={BannerData[currentSlide]?.poster}
                      alt=""
                      className="col-md-6"
                      height={40}
                    />

                    <div className="col-md-8"></div>
                  </div>

                  <div className="row mt-4 ">
                    <div className="col-md-9 m-auto ">
                      <div className="row ">
                        <span className="col-md-3  m-auto  text-white ">
                          <Link
                            state={{ id: BannerData[currentSlide]?._id }}
                            to="/WatchVideoMode"
                          >
                            <PlayCircleFilledWhiteIcon className="playicon" />{" "}
                          </Link>
                        </span>
                        <span className="col-md-4 m-auto  text-white">
                          Play S4 E1
                        </span>
                        <div className="col-md-5 m-auto">
                          <div className="row  ">
                            <span className="col-md-6 m-auto text-white watchlist relativeP">
                              {" "}
                              {isInWishlist?.length === 0 ||
                              !isInWishlist?.includes(
                                BannerData[currentSlide]?._id
                              ) ? (
                                <AddIcon
                                  onClick={() =>
                                    handleWatchList(
                                      BannerData[currentSlide]?._id
                                    )
                                  }
                                  className="addicons"
                                />
                              ) : (
                                <CheckIcon
                                  onClick={() =>
                                    handleRemoveItem(
                                      BannerData[currentSlide]?._id
                                    )
                                  }
                                  className="addicons"
                                />
                              )}{" "}
                              <button className="col-md-4 watch1">
                                {isInWishlist.length === 0 ||
                                !isInWishlist.includes(
                                  BannerData[currentSlide]?._id
                                )
                                  ? "Watchlist"
                                  : "Added"}{" "}
                              </button>
                            </span>

                            <span className="col-md-6 m-auto text-white detailsList relativeP ">
                              <IoInformationCircleOutline className="addicons fnt30  " />
                              <button className="col-md-3  details">
                                Details
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 m-auto"></div>
                  </div>
                </div>
                <span
                  key={index}
                  className={`dotsc ${index === currentSlide ? "active" : ""}`}
                  onClick={() => handleSelect(index)}
                >
                  <span
                    className={`dotss ${
                      index === currentSlide ? "active" : ""
                    }`}
                  ></span>
                </span>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="row">
            <button
              onClick={prevSlide}
              className={`button1 col-md-1 text-white  ${
                currentSlide === 0 ? "disabled" : ""
              }`}
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className={`button1 col-md-1 button2 text-white  ${
                currentSlide === BannerData?.length - 1 ? "disabled" : ""
              }`}
            >
              &#10095;
            </button>
          </div>

          <div className="dot-container">
            {BannerData.map((_, index) => (
              <span
                key={index}
                className={`dotsc ${index === currentSlide ? "active" : ""}`}
                onClick={() => handleSelect(index)}
              >
                <span
                  className={`dotss ${index === currentSlide ? "active" : ""}`}
                ></span>
              </span>
            ))}
          </div>
        </div>

        <div className="row mt-3 mb-3  m-auto relativeP">
          <h6 className="row text_White m-auto mb-3 ">Continue Watching</h6>

          <button
            onClick={() => handelprevSlider(0)}
            className="slidebtn1 text-white"
          >
            &#10094;
          </button>
          <button
            onClick={() => handelnextSlider(0)}
            className="slidebtn2 text-white"
          >
            &#10095;
          </button>
          <div className="row m-auto  ">
            {ContentData?.slice(latestSlidesData, latestSlidesData + 4).map(
              (ele, index) => (
                <>
                  <div
                    key={ele?._id}
                    className="col-md-3 m-auto movie-container "
                  >
                    {hoveredVideoId === ele?._id && hideimage ? (
                      <>
                        {" "}
                        <iframe
                          onMouseMove={(e) => handleMouseMove(e, ele?._id)}
                          onMouseOver={() => handleMouseOver(ele?._id)}
                          onMouseOut={() => handleMouseOut(ele?._id)}
                          ref={videoRefs.current[ele?._id]}
                          autoPlay
                          controls="0"
                          muted={!Volume}
                          height={120}
                          className="w-100 p-0 borderRa video"
                          onTimeUpdate={() => handleProgress(ele?._id)}
                          src={ele?.video}
                          type="video/mp4"
                        ></iframe>
                        {/* <div className="row  m-auto  ">
                          <div className="volumes col-md-2 ">
                            {Volume ? (
                              <VolumeUpIcon onClick={() => setVolume(false)} />
                            ) : (
                              <VolumeOffIcon onClick={() => setVolume(true)} />
                            )}
                          </div>
                        </div> */}
                      </>
                    ) : (
                      <img
                        src={ele?.banner}
                        height={120}
                        alt=""
                        className="w-100 p-0 borderRa "
                      />
                    )}

                    {/* <div className="row  m-auto ">
                      <div className="controls col-md-11 ">
                        <div
                          className="progress__bar m-auto"
                          style={{
                            width: "100%",
                            height: "5px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            overflow: "hidden",
                          }}
                         
                        >
                          <div
                            className="progress__watched"
                            style={{
                              width: `${videoProgress[ele?._id] || 0}%`,
                              height: "100%",
                              backgroundColor: "#1a98ff",
                              transition: "width 0.3s ease",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div> */}
                    <div className="row  m-auto additional-content ">
                      <div className="row  p-2">
                        <div className="col-md-6 m-auto text_White ">
                          <div className="row">
                            <div className="col-md-6 m-auto">
                              <PlayCircleFilledWhiteIcon
                                onClick={() => incrementViews(ele?._id)}
                                className="fnt35 playicon1"
                              />{" "}
                            </div>
                            <span
                              className="col-md-6 fnt14  text_White m-auto"
                              onMouseMove={(e) => handleMouseMove(e, ele?._id)}
                              onMouseOver={() => handleMouseOver(ele?._id)}
                            >
                              Resume
                            </span>
                          </div>
                        </div>

                        <div className="col-md-3 text_White m-auto relativeP slidewatch">
                          <AddIcon className="addicon" />
                          <button className="p-1 mt-1 fnt12 sliderwatch1  textbold ">
                            watchlist
                          </button>
                        </div>
                        <div className="col-md-3 text_White m-auto relativeP viewmore">
                          <MoreVertIcon className="addicon" />
                          <button className="col-md-3 p-1 mt-1 fnt12 slidemore  textbold ">
                            More
                          </button>
                        </div>

                        {"  "}
                      </div>
                      <p className="fnt12 textbold">{ele?.title}</p>
                      <p className="fnt12 ">{ele?.duration}</p>
                      <p className="fnt12 ">
                        {ele?.subtitle}-{ele?.storyline}
                      </p>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
        <div className="row mt-3 mb-3  m-auto relativeP">
          <h6 className="row text_White m-auto mb-3 ">
            Most Viewed on CND PLAY
          </h6>

          <button
            onClick={() => handelprevSlider(1)}
            className="slidebtn1 text-white"
          >
            &#10094;
          </button>
          <button
            onClick={() => handelnextSlider(1)}
            className="slidebtn2 text-white"
          >
            &#10095;
          </button>
          <div className="row m-auto">
            {mostViewedM
              ?.slice(mostViewedSlidesData, mostViewedSlidesData + 4)
              .map((ele) => (
                <div
                  key={ele?.id}
                  className="col-md-3 m-auto  movie-container  "
                >
                  <img
                    src={ele?.banner}
                    alt=""
                    height={140}
                    className="w-100  borderRa"
                  />

                  <div className="row  m-auto additional-content ">
                    <div className="row  p-2">
                      <div className="col-md-6 m-auto text_White ">
                        <div className="row">
                          <div className="col-md-6 m-auto">
                            <Link state={{ id: ele?._id }} to="/WatchVideoMode">
                              <PlayCircleFilledWhiteIcon className="fnt35 playicon1" />{" "}
                            </Link>
                          </div>
                          <span
                            className="col-md-6 fnt14  text_White m-auto"
                            onMouseMove={(e) => handleMouseMove(e, ele?.id)}
                            onMouseOver={() => handleMouseOver(ele?.id)}
                          >
                            Resume
                          </span>
                        </div>
                      </div>

                      <div className="col-md-3 text_White m-auto relativeP slidewatch">
                        <AddIcon className="addicon" />
                        <button className="p-1 mt-1 fnt12 sliderwatch1  textbold ">
                          watchlist
                        </button>
                      </div>
                      <div className="col-md-3 text_White m-auto relativeP viewmore">
                        <MoreVertIcon className="addicon" />
                        <button className="col-md-3 p-1 mt-1 fnt12 slidemore  textbold ">
                          More
                        </button>
                      </div>

                      {"  "}
                    </div>
                    <p className="fnt12 textbold">{ele?.title}</p>
                    <p className="fnt12 ">{ele?.duration}</p>
                    <p className="fnt12 ">
                      {ele?.subtitle}-{ele?.storyline}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="row mt-3 mb-3  m-auto relativeP">
          <h6 className="row text_White m-auto mb-3 ">
            {" "}
            CND PLAY Watch In Your language
          </h6>

          <button
            onClick={() => handelprevSlider(2)}
            className="slidebtn1 text-white"
          >
            &#10094;
          </button>
          <button
            onClick={() => handelnextSlider(2)}
            className="slidebtn2 text-white"
          >
            &#10095;
          </button>
          <div className="row m-auto">
            {LanguageWise?.slice(LanguageWisedata, LanguageWisedata + 4).map(
              (ele) => (
                <div
                  key={ele?.id}
                  className="col-md-3 m-auto  movie-container  "
                >
                  <img
                    src={ele?.movie}
                    alt=""
                    height={140}
                    className="w-100  borderRa"
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="row mt-3 mb-3  m-auto relativeP">
          <h6 className="row text_White m-auto mb-3 ">
            {" "}
            CND PLAY Recommended Movies
          </h6>

          <button
            onClick={() => handelprevSlider(3)}
            className="slidebtn1 text-white"
          >
            &#10094;
          </button>
          <button
            onClick={() => handelnextSlider(3)}
            className="slidebtn2 text-white"
          >
            &#10095;
          </button>
          <div className="row m-auto">
            {RecommendedMovies?.slice(Recommended, Recommended + 4).map(
              (ele) => (
                <div
                  key={ele?.id}
                  className="col-md-3 m-auto  movie-container  "
                >
                  <img
                    src={ele?.movie}
                    alt=""
                    height={140}
                    className="w-100  borderRa"
                  />

                  <div className="row  m-auto additional-content ">
                    <div className="row  p-2">
                      <div className="col-md-6 m-auto text_White ">
                        <div className="row">
                          <div className="col-md-6 m-auto">
                            <PlayCircleFilledWhiteIcon
                              // onClick={() => incrementViews(ele?._id)}
                              className="fnt35 playicon1"
                            />{" "}
                          </div>
                          <span
                            className="col-md-6 fnt14  text_White m-auto"
                            onMouseMove={(e) => handleMouseMove(e, ele?.id)}
                            onMouseOver={() => handleMouseOver(ele?.id)}
                          >
                            Resume
                          </span>
                        </div>
                      </div>

                      <div className="col-md-3 text_White m-auto relativeP slidewatch">
                        <AddIcon className="addicon" />
                        <button className="p-1 mt-1 fnt12 sliderwatch1  textbold ">
                          watchlist
                        </button>
                      </div>
                      <div className="col-md-3 text_White m-auto relativeP viewmore">
                        <MoreVertIcon className="addicon" />
                        <button className="col-md-3 p-1 mt-1 fnt12 slidemore  textbold ">
                          More
                        </button>
                      </div>

                      {"  "}
                    </div>
                    <p className="fnt12 textbold">{ele?.title}</p>
                    <p className="fnt12 ">{ele?.duration}</p>
                    <p className="fnt12 ">
                      {ele?.title}-{ele?.desc}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="row mt-3 mb-3  m-auto relativeP">
          <h6 className="row text_White m-auto mb-3 ">
            CND PLAY Original Series
          </h6>

          <button
            onClick={() => handelprevSlider(4)}
            className={`slidebtn1 text-white ${
              currentSlides === BGBnners2.length - 1 ? "disabled" : ""
            }`}
          >
            &#10094;
          </button>
          <button
            onClick={() => handelnextSlider(4)}
            className={`slidebtn2 text-white ${
              (currentSlides === BGBnners2.length) === 0 ? "disabled" : ""
            }`}
          >
            &#10095;
          </button>
          <div className="Apps">
            <div className="containerdd">
              {visibleCards.map((image, index) => (
                <div key={index} className="cardss">
                  <div className="Orignal_seriesoverlays"></div>
                  <img
                    src={image.banner}
                    height={320}
                    alt={`image_${index}`}
                    className="card-image"
                  />
                  <div
                    className={`row ${
                      restartAnimation2 ? "row logo-container1" : "row"
                    }`}
                  >
                    <div className="row mb-3">
                      <img src={image.logo} alt="" height={50} />

                      <div className="col-md-8"></div>
                    </div>

                    <div className="d-flex mb-3">
                      {image.language?.map((Ele) => {
                        return (
                          <>
                            <span className="fnt12  me-1"> {Ele} </span>
                            <span className="fnt12  me-2">|</span>
                          </>
                        );
                      })}
                    </div>

                    <div className="row ">
                      <span className="col-md-3  m-auto  text-white ">
                        <Link state={{ id: image.id }} to="/WatchVideoMode">
                          <PlayCircleFilledWhiteIcon className="playicon" />{" "}
                        </Link>
                      </span>
                      <span className="col-md-4 m-auto  text-white">
                        Play S4 E1
                      </span>
                      <div className="col-md-5 m-auto">
                        <div className="row  ">
                          <span className="col-md-6 m-auto text-white watchlist relativeP">
                            {" "}
                            <AddIcon className="addicons" />
                            <button className="col-md-3      watch1">
                              watchlist
                            </button>
                          </span>

                          <span className="col-md-6 m-auto text-white detailsList relativeP ">
                            <IoInformationCircleOutline className="addicons fnt30  " />
                            <button className="col-md-3  details">
                              Details
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row m-auto  ">
          <h6 className="row text_White m-auto mb-3 ">
            {" "}
            CND PLAY Top 10 In India
          </h6>

          <Carousel
            activeIndex={toptenMovies}
            className="col-md-12 videoWidth videoBNr"
          >
            {BGBnners3.map((Ele, index) => (
              <Carousel.Item key={index} className="toptenmovie  ">
                <div className="toptenmovieOverl"> </div>
                <div className="row informat ">
                  <div className="row ms-4">
                    <h6 className="text_White">{Ele?.title}</h6>
                    <h1 className="text_White textbold mt-2 ">
                      {Ele?.subTitel}
                    </h1>
                    <p className="col-md-8 text_White textbold ">{Ele?.desc}</p>
                    <p className="col-md-8  textbold duration">
                      {Ele?.duration}
                    </p>

                    <div className="row  text_White  ">
                      <div className="col-md-7">
                        <div className="row ">
                          <span className="col-md-2  m-auto  text-white ">
                            <Link state={{ id: Ele?.id }} to="/WatchVideoMode">
                              <PlayCircleFilledWhiteIcon className="playicon" />{" "}
                            </Link>
                          </span>
                          <span className="col-md-1 m-auto  text-white">
                            Play
                          </span>
                          <div className="col-md-9 m-auto">
                            <div className="row  ">
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <ImFilm className="addicons lefts fnt30  " />
                                <button className="col-md-3  details trailer">
                                  Trailer
                                </button>
                              </span>

                              <span className="col-md-2 m-auto fnt14 watchlist relativeP ">
                                <AddIcon className="addicons lefts fnt30  " />
                                <button className="watch1">Watchlist</button>
                              </span>
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <ThumbUpAltOutlinedIcon className="addicons fnt30  " />
                                <button className="details like">Like</button>
                              </span>
                              {/* <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <AiOutlineDislike className="addicons lefts fnt30  " />
                                <button className="details dislike">
                                  Dislike
                                </button>
                              </span> */}
                              {/* <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <DownloadForOfflineOutlinedIcon className="addicons fnt30  " />
                                <button className="details downlaod">
                                  Dowload Episodes 1
                                </button>
                              </span> */}
                              {/* <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <CelebrationOutlinedIcon className="addicons fnt30  " />
                                <button className="details party">
                                  Watch Party
                                </button>
                              </span> */}
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <ShareOutlinedIcon className="addicons fnt30  " />
                                <button className="details">Share</button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div>

                  <div className="row mt-4  m-auto  relativeP ">
                    <button
                      onClick={() => handelprevSlider(5)}
                      className="slidebtn1 slidebtn3  text-white"
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={() => handelnextSlider(5)}
                      className="slidebtn2 slidebtn3  text-white"
                    >
                      &#10095;
                    </button>
                    <div className="row m-auto mt-1">
                      {mostvieved2
                        ?.slice(
                          mostViewedSlidesData2,
                          mostViewedSlidesData2 + 3
                        )
                        .map((ele, inneindex) => (
                          <>
                            <div key={ele?.id} className="col-md-4 m-auto    ">
                              <div className="row">
                                <h1 className="col-md-2 index_size text-white">
                                  {ele?.id}
                                </h1>
                                <div
                                  className="col-md-10"
                                  style={{ boxShadow: "10px" }}
                                >
                                  <img
                                    src={ele?.movie}
                                    alt=""
                                    height={140}
                                    className="w-100   borderRa"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>

                {PlayVideo && index === toptenMovies ? (
                  <>
                    <div
                      className="videoWrapper"
                      onMouseEnter={() => setPlayVideo(true)}
                      onMouseLeave={() => setPlayVideo(false)}
                    >
                      <div className="toptenmovieOverl"> </div>
                      <video
                        muted={!BVolume}
                        autoPlay
                        height={120}
                        className="relativeP videoWidth"
                        src={Ele?.movivid}
                      />

                      <div className="row  m-auto">
                        <div className="bnrvolume col-md-2 ">
                          {BVolume ? (
                            <VolumeUpIcon onClick={() => setBVolume(false)} />
                          ) : (
                            <VolumeOffIcon onClick={() => setBVolume(true)} />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className="imageWrapper"
                    onMouseEnter={() => setPlayVideo(true)}
                  >
                    <img
                      src={Ele?.banner}
                      alt=""
                      className="slide videoWidth"
                    />{" "}
                    <div className="toptenmovieOverl"> </div>
                  </div>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <Footer />
      </div>
    </>
  );
}
