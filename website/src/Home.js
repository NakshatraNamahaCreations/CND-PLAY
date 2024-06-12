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
import Modal from "react-bootstrap/Modal";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { ImFilm } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import IndiaMoviePageService from "./DataApi/indiaMovieApi";
import { RecommendedMovies, LanguageWise } from "./JsonData";
import Footer from "./footer";
import ContentsPageService from "./DataApi/Api";
import SeriesPageService from "./DataApi/SeriesApi";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Card } from "react-bootstrap";
import PlanServicePage from "./DataApi/PlanApi";
import RegisterPage from "./DataApi/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPlayer from "react-player";
import axios from "axios";

import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CaroselComponent from "./carosel";
import PurchaseContent from "./PurchaseContent";
import { PaymentRequestButtonElement } from "react-payment-request-api";
import { RotatingLines } from "react-loader-spinner";

export default function Home({ searchValue }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [latestSlidesData, setLatestSlidesData] = useState(0);
  // const [mostViewedSlidesData, setMostViewedSlidesData] = useState(0);
  const [mostViewedSlidesData2, setMostViewedSlidesData2] = useState(0);
  // const [Recommended, setRecommended] = useState(0);
  const [LanguageWisedata, setLanguageWisedata] = useState(0);
  const [restartAnimation2, setRestartAnimation2] = useState(false);
  const [hideimage, setHideImage] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [currentSlides, setCurrentSlides] = useState(0);
  const [toptenMovies, setToptenMovies] = useState(0);
  const [videoProgress, setVideoProgress] = useState({});
  const [ContentData, setContentData] = useState([]);
  const [TrendingMovies, setTrendingMovies] = useState([]);

  const [TrendingMoviesSlider, setTrendingMoviesSlider] = useState([]);
  const [SeriesData, setSeriesData] = useState([]);
  const [mostViewedM, setMostViewedM] = useState([]);
  const [IsRecomded, setIsRecomded] = useState([]);
  const [BannerData, setBannerData] = useState([]);
  const [purchaceContentData, setpurchaceContentData] = useState([]);
  const [purchaceContent, setPurchaceContent] = useState(false);
  const [purchaseid, setpurchaseid] = useState(null);
  const [WishlistContent, setWishlistContent] = useState([]);
  const [ContinewWatching, setContinewWatching] = useState([]);
  const [UserData, setUserData] = useState([]);
  // handle banner

  const [animateLogo, setAnimateLogo] = useState(true);
  const [restartAnimation, setRestartAnimation] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [pausedTime, setPausedTime] = useState({});
  const [Volume, setVolume] = useState(false);
  const [PlayVideo, setPlayVideo] = useState(false);
  const [BVolume, setBVolume] = useState(false);
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [searchValue]);

  useEffect(() => {
    fetchBanner();

    // AllPlan.filter((ele)=>ele.planType==="")
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
      prevSlide === BannerData?.length - 1 ? prevSlide : prevSlide + 1
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
    }, 5000);
    setRestartAnimation(true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [restartAnimation, currentSlide, animateLogo]);

  const visibleCards = SeriesData?.slice(currentSlides, currentSlides + 4);

  const handelnextSlider = (index) => {
    if (index === 2) {
      setLanguageWisedata(
        (prevSlide) => (prevSlide + 1) % (LanguageWise?.length - 5)
      );
    }
    // if (index === 3) {
    //   setRecommended(
    //     (prevSlide) => (prevSlide + 1) % (RecommendedMovies?.length - 5)
    //   );
    // }

    if (index === 4) {
      setCurrentSlides(
        (prevSlide) => (prevSlide + 3) % (SeriesData?.length - 3)
      );
    }
    if (index === 5) {
      setMostViewedSlidesData2(
        (prevSlide) => (prevSlide + 1) % (TrendingMovies?.length - 4)
      );
    }
  };

  const handelprevSlider = (index) => {
    if (index === 2) {
      setLanguageWisedata((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : LanguageWise?.length - 5
      );
    }
    // if (index === 3) {
    //   setRecommended((prevSlide) =>
    //     prevSlide > 0 ? prevSlide - 1 : RecommendedMovies?.length - 5
    //   );
    // }
    if (index === 4) {
      setCurrentSlides((prevSlide) =>
        prevSlide > 3 ? prevSlide - 4 : SeriesData?.length - 4
      );
    }
    if (index === 5) {
      setMostViewedSlidesData2((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : TrendingMovies?.length - 3
      );
    }
  };

  //  videos

  const videoRefs = useRef({});

  const [isplaying, setPlaying] = useState(false);

  const handleReady = (videoId, ele) => {
    const seconds = ele.mobile_duration / 1e6;
    videoRefs.current[videoId]?.seekTo(seconds);
    setPlaying(true);
  };
  const handleMouseOver = (videoId, ele) => {
    setHoveredVideoId(videoId);
    const video = videoRefs.current[videoId]?.current;

    if (video) {
      const currentTime = parseTimeToSeconds(ele?.duration || "00:00:00");
      video.currentTime = currentTime;

      if (video.readyState >= 2) {
        video.play().catch((error) => console.error(error));
      } else {
        video.addEventListener("loadeddata", () => {
          video.play().catch((error) => console.error(error));
        });
      }
    }
  };

  const handleMouseOut = (videoId) => {
    const video = videoRefs.current[videoId];
    setPlaying(false);
    setHideImage(false);
    setHoveredVideoId(null);
    if (video) {
      if (video.isPlaying) {
        const currentTime = video.getCurrentTime();
        setPausedTime((prevPausedTime) => ({
          ...prevPausedTime,
          [videoId]: currentTime,
        }));

        video.pause();
      }
    }
  };

  const handleProgress = (state, ele) => {
    const { playedSeconds } = state;
    const video = videoRefs.current[ele?._id]?.current;

    if (video) {
      const eleDurationInSeconds = parseTimeToSeconds(
        ele?.duration || "00:00:00"
      );

      const totalStartTime = video.getCurrentTime() + eleDurationInSeconds;
      const percentageCompleted = (playedSeconds / totalStartTime) * 100;
    }
  };

  const parseTimeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(":")?.map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    ContinewWatching?.forEach((ele) => {
      const videoId = ele?._id;
      const playedTime = parseTimeToSeconds(ele?.duration || "00:00:00");
      const totalDuration = parseTimeToSeconds(ele?.totalDuration || "00:00:01");

      const percentage = (playedTime / totalDuration) * 100;

      setVideoProgress((prevProgress) => ({
        ...prevProgress,
        [videoId]: percentage,
      }));
    });
  }, [ContinewWatching]);

  const handleMouseMove = (e, videoId) => {
    const video = videoRefs.current[videoId]?.current;
    setHideImage(true);
  };

  useEffect(() => {
    if (!PlayVideo) {
      const intervalId = setInterval(() => {
        setToptenMovies(
          (prevIndex) => (prevIndex + 1) % TrendingMovies?.length
        );
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [TrendingMovies?.length, PlayVideo]);

  const handlePurchaceContent = async (idd) => {
    setpurchaseid(idd);
    setPurchaceContent(true);
  };

  const filterDataBySearchValue = (data, searchValue) => {
    const value = searchValue?.toLowerCase();
    return data?.filter((ele) => {
      const dvalue = ele?.title?.toLowerCase();
      return dvalue && dvalue?.includes(value);
    });
  };
  const [disliked, setdisliked] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Purchades, setPurchades] = useState(false);

  const [AllContentData, setAllContentData] = useState([]);
  const fetchBanner = async () => {
    try {
      setLoading(true);
      let bannerData = await ContentsPageService.getBanerdata();

      let listOfMovie = await ContentsPageService.fetchContentsAllList();
      setAllContentData(listOfMovie);
      setpurchaceContentData(listOfMovie);
      setBannerData(bannerData);
      if (bannerData?.length > 0) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };
  const fetchData = async () => {
    let mostViewed = await ContentsPageService.fetchMostViewList();
    let seriesData = await SeriesPageService.fetchContentsListSeries();
    let trendingData = await IndiaMoviePageService.fetchTrendingList();
    let wishlist = await ContentsPageService.getWishList(getlocalStorage?._id);
    let continueWatching = await RegisterPage.GetUserById(getlocalStorage?._id);
    let episodes = await SeriesPageService.fetchEpisodes();
    let Recommended = await ContentsPageService.getRecomnded();

    let continueWatchingData = AllContentData?.filter((movie) => {
      return continueWatching?.continueWatching?.some((cont) =>
        movie?._id?.includes(cont.contentId)
      );
    })?.map((movie) => {
      const matchingCont = continueWatching?.continueWatching?.find(
        (cont) => cont.contentId === movie?._id
      );

      if (matchingCont) {
        return { ...movie, ...matchingCont };
      }
      return movie;
    });

    let continueWatchingEpisode = episodes
      ?.filter((episode) => {
        return continueWatching?.continueWatching?.some((cont) =>
          episode?._id?.includes(cont.contentId)
        );
      })
      ?.map((episode) => {
        const matchingCont = continueWatching?.continueWatching?.find(
          (cont) => cont.contentId === episode?._id
        );

        if (matchingCont) {
          return { ...episode, ...matchingCont };
        }

        return episode;
      });

    const filteredList = filterDataBySearchValue(
      continueWatchingData,
      searchValue
    );
    const filteredSeriesData = filterDataBySearchValue(seriesData, searchValue);
    const filteredListOfMovie = filterDataBySearchValue(
      AllContentData,
      searchValue
    );
    const filteredMostViewed = filterDataBySearchValue(mostViewed, searchValue);
    const filteredIsRecommended = filterDataBySearchValue(
      Recommended,
      searchValue
    );
    const filteredTrendingData = filterDataBySearchValue(
      trendingData,
      searchValue
    );

    setContinewWatching(filteredList.concat(continueWatchingEpisode));
    setSeriesData(filteredSeriesData);
    setContentData(filteredListOfMovie);
    setMostViewedM(filteredMostViewed);
    setTrendingMovies(filteredTrendingData);
    setIsRecomded(filteredIsRecommended);
    setTrendingMoviesSlider(trendingData);
    setWishlistContent(wishlist);
    setUserData(continueWatching);
  };

  const incrementViews = async (Item) => {
    try {
      if (ContentData?.length > 0) {
        navigate("/viewdetails-about-movie", { state: { id: Item } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMore = (item) => {
    navigate("/viewdetails-about-series", { state: { id: item?._id } });
  };
  const notifyLikes = () => {
    setdisliked(true);
    toast("Content added in your watchlist");
  };

  const handleAddToWishlist = (idd) => {
    if (!getlocalStorage) {
      window.location.assign("/login");
      return;
    }
    const updatedWishlist = { content_id: idd, userid: getlocalStorage?._id };
    let initialPostData = { wishlist: updatedWishlist };
    if (updatedWishlist.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage?._id)
        .then((response) => {
          // setWishlist(true);
          setdisliked(true)
          toast(response.data.message);
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };

  const handlePlanPurchase = async (data) => {
    const currentDate = new Date();

    const expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + data.validity);

    let initialPostData = {
      planType: data.planType,
      purchaseddate: currentDate.toISOString(),
      expiryddate: expirationDate.toISOString(),
    };

    await RegisterPage.PurchasePlan(
      { plan: initialPostData },
      getlocalStorage?._id
    )
      .then((response) => {
        toast(`${data.planType}  Purchased`);
        // console.log(response, "response");
        window.location.reload("");
      })
      .catch((error) => {
        // console.log("Error updating user ");
      });
  };
  const handlePurchaseContenet = async (id, validity) => {
    try {
      const currentDate = new Date();
      const validityInHours = validity * 24;
      const expirationDate = new Date(
        currentDate.getTime() + validityInHours * 60 * 60 * 1000
      );

      const ContentData = {
        purchaseddate: currentDate.toISOString(),
        expiryddate: expirationDate.toISOString(),
        content_id: purchaseid,
      };

      const config = {
        url: `https://api.cndplay.com/api/authenticateRoute/purchasecontent/${getlocalStorage?._id}`,
        method: "put",
        data: ContentData,
      };

      const response = await axios(config);
      if (response.status === 200) {
        alert("You have purchased successfully.");
        window.location.reload("");
      }
    } catch (err) {
      // console.error("Error:", err);
      alert("An error occurred while processing your request.");
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [ContineuWacthIndex, setContineuWacthIndex] = useState(0);

  const itemsPerPage = 4;

  const handleNext = () => {
    setContineuWacthIndex((prevIndex) =>
      prevIndex + 1 >= ContinewWatching?.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = (index) => {
    setContineuWacthIndex((prevIndex) =>
      prevIndex - 1 < 0 ? ContinewWatching?.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {Loading ? (
        <div
          className="row m-auto bg-mg text-center"
          style={{ height: "100vh" }}
        >
          <div className="col-md-2 m-auto">
            <RotatingLines
              visible={true}
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : (
        <div className="row m-auto bg-mg">
          <div className="row m-auto relativeP">
            <Carousel activeIndex={currentSlide} onSelect={handleSelect}>
              {BannerData?.map((Ele, index) => {
                const isWishlist = WishlistContent?.some(
                  (wishl) => wishl?.content_id === BannerData[currentSlide]?._id
                );
                let currentDate = new Date();
                const hasExpiredPlans = UserData?.plan?.some(
                  (plan) => new Date(plan.expiryddate) < currentDate // Changed to check for expired plans
                );
                let data = UserData?.purchasedcontent?.some(
                  (ele) =>
                    (ele?.content_id === BannerData[currentSlide]?._id &&
                      new Date(ele.expiryddate) > currentDate) ||
                    hasExpiredPlans
                );
                return (
                  <Carousel.Item key={index} className="relativeP">
                    <div className="overlay"></div>

                    <img
                      src={BannerData[currentSlide].banner}
                      alt=""
                      onClick={() =>
                        incrementViews(BannerData[currentSlide]?._id)
                      }
                      className="slide cursor"
                    />
                    <div
                      className={`row logo-container ${logoVisible ? "visible" : "hidden"
                        }`}
                    >
                      <div className="col-md-12 m-auto ">
                        <div className="row ">
                          <span className="col-md-3  m-auto  text-white ">
                            <PlayCircleFilledWhiteIcon
                              onClick={() =>
                                incrementViews(BannerData[currentSlide]._id)
                              }
                              className="playicon"
                            />{" "}
                          </span>
                          <span className="col-md-4 m-auto  text-white">
                            Play
                          </span>
                          <div className="col-md-5 m-auto">
                            <div className="row  ">
                              <span className="col-md-6 m-auto text-white watchlist relativeP">
                                {" "}
                                {isWishlist ? (
                                  <CheckIcon
                                    className="addicons"
                                    onClick={() =>
                                      handleAddToWishlist(
                                        BannerData[currentSlide]._id
                                      )
                                    }
                                  />
                                ) : (
                                  <AddIcon
                                    className="addicons"
                                    onClick={() =>
                                      handleAddToWishlist(
                                        BannerData[currentSlide]._id
                                      )
                                    }
                                  />
                                )}
                                <button className="col-md-4 watch1">
                                  {!isWishlist ? "Watchlist" : "Added"}{" "}
                                </button>
                              </span>

                              <span className="col-md-6 m-auto text-white detailsList relativeP ">
                                <IoInformationCircleOutline
                                  onClick={() =>
                                    incrementViews(BannerData[currentSlide])
                                  }
                                  className="addicons fnt30  "
                                />
                                <button className="col-md-3  details">
                                  Details
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 m-auto"></div>
                      {/* </div> */}
                    </div>
                    <span
                      key={index}
                      className={`dotsc ${index === BannerData[currentSlide] ? "active" : ""
                        }`}
                      onClick={() => handleSelect(index)}
                    >
                      <span
                        className={`dotss ${index === BannerData[currentSlide] ? "active" : ""
                          }`}
                      ></span>
                    </span>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <div className="dot-container">
              {BannerData?.map((_, index) => (
                <span
                  key={index}
                  className={`dotsc ${index === currentSlide ? "active" : ""}`}
                  onClick={() => handleSelect(index)}
                >
                  <span
                    className={`dotss ${index === currentSlide ? "active" : ""
                      }`}
                  ></span>
                </span>
              ))}
            </div>
          </div>

          {/* {ContinewWatching?.length > 0 && (
          <div className="row mt-3 mb-3  relativeP items-center justify-center">
            <h4 className="row text_White m-auto mb-3 ">Continue Watching</h4>

            <div className="row  ">
              <div className="row relativeP">
                <div className="mediaScreen">
                  <div className="banner ">
                    {ContinewWatching?.slice(
                      ContineuWacthIndex,
                      ContineuWacthIndex + itemsPerPage
                    )?.map((item, index) => {
                      const isWishlist = WishlistContent?.some(
                        (wishl) => wishl?.content_id === item._id
                      );
                      return (
                        <div key={item._id} className="">
                          <div className="mediaDiv ">
                            <div className="relativeP">
                              <img
                                src={item.banner}
                                alt={item.name}
                                className="mediaImg"
                              />
                              <div className="row m-auto  ">
                                <div className="controls col-md-11">
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
                                        width: `${videoProgress[item?._id]}%`,
                                        height: "100%",
                                        backgroundColor: "#1a98ff",
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        transition: "width 0.3s ease",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="displayhoverScreen">
                              <div className="hoverScreen">
                                <div className="mediaHoverImg">
                                  {hoveredVideoId === item?._id &&
                                    hideimage && (
                                      <>
                                        <ReactPlayer
                                          ref={(ref) =>
                                            (videoRefs.current[item._id] = ref)
                                          }
                                          controls="0"
                                          muted={!Volume}
                                          height={120}
                                          className="w-100 p-0 borderRa 
                                           video"
                                          onProgress={(state) =>
                                            handleProgress(state, item)
                                          }
                                          type="video/mp4"
                                          onReady={() =>
                                            handleReady(item._id, item)
                                          }
                                          url={item?.video}
                                          playing={isplaying}
                                          onPause={handleMouseOut}
                                        />
                                      </>
                                    )}
                                </div>
                                <div className="hoverData">
                                  <div className="hoverHeading">
                                    <p className="title">{item.title}</p>
                                  </div>
                                  <div className="row  ">
                                    <div className="col-md-6 m-auto text_White ">
                                      <div className="row">
                                        <div className="col-md-6 m-auto">
                                          <PlayCircleFilledWhiteIcon
                                            onClick={() =>
                                              incrementViews(item?._id)
                                            }
                                            className="fnt35 playicon1"
                                          />{" "}
                                        </div>
                                        <span
                                          className="col-md-6 fnt14  text_White m-auto"
                                          onMouseMove={(e) =>
                                            handleMouseMove(e, item?._id)
                                          }
                                          onMouseOver={() =>
                                            handleMouseOver(item._id, item)
                                          }
                                        >
                                          Resume
                                        </span>
                                      </div>
                                    </div>

                                    <div className="col-md-3 text_White m-auto relativeP slidewatch">
                                      {isWishlist ? (
                                        <CheckIcon
                                          className="addicon"
                                          onClick={() =>
                                            handleAddToWishlist(item._id)
                                          }
                                        />
                                      ) : (
                                        <AddIcon
                                          className="addicon"
                                          onClick={() =>
                                            handleAddToWishlist(item._id)
                                          }
                                        />
                                      )}
                                      <button className="p-1 mt-1 fnt12 sliderwatch1  textbold ">
                                        watchlist
                                      </button>
                                    </div>
                                    <div className="col-md-3 text_White m-auto relativeP viewmore">
                                      <MoreVertIcon
                                        onClick={() =>
                                          handlePurchaceContent(item?._id)
                                        }
                                        className="addicon"
                                      />
                                      <button className="col-md-3 p-1 mt-1 fnt12 slidemore  textbold ">
                                        More
                                      </button>
                                    </div>

                                    {"  "}
                                  </div>

                                  <div className="footerScreen">
                                    <p className="fnt12 ">{item?.duration}</p>
                                    <p className="fnt12 ">
                                      {item?.subtitle}-{item?.storyline}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {ContinewWatching?.length >= 4 && (
                  <>
                    <button
                      onClick={handlePrev}
                      disabled={ContineuWacthIndex === 0}
                      className="slidebtn1 text-white"
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={
                        ContineuWacthIndex + itemsPerPage >=
                        ContinewWatching.length
                      }
                      className="slidebtn2 text-white"
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )} */}

          <div className="row mt-3">
            {mostViewedM?.length > 0 && (
              <>
                <h4 className="row text_White m-auto mb-3 ">
                  Most Viewed on CND PLAY
                </h4>{" "}
                <CaroselComponent
                  data={mostViewedM}
                  incrementViews={incrementViews}
                  handleAddToWishlist={handleAddToWishlist}
                />
              </>
            )}
          </div>

          <div className="row mt-3">
            {IsRecomded?.length > 0 && (
              <>
                <h4 className="row text_White m-auto mb-3 ">
                  CND PLAY Recommended Movies
                </h4>{" "}
                <CaroselComponent
                  data={IsRecomded}
                  incrementViews={incrementViews}
                  handleAddToWishlist={handleAddToWishlist}
                />
              </>
            )}
          </div>

          {visibleCards?.length > 0 && (
            <div className="row mt-3 mb-3  m-auto relativeP">
              <h6 className="row text_White m-auto mb-3 ">
                CND PLAY Original Series
              </h6>
              {visibleCards?.length > 6 && (
                <>
                  <button
                    onClick={() => handelprevSlider(4)}
                    className={`slidebtn1 text-white ${currentSlides === SeriesData.length - 1 ? "disabled" : ""
                      }`}
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={() => handelnextSlider(4)}
                    className={`slidebtn2 text-white ${(currentSlides === SeriesData.length) === 0
                        ? "disabled"
                        : ""
                      }`}
                  >
                    &#10095;
                  </button>
                </>
              )}
              <div className="Apps">
                <div className="containerdd">
                  {visibleCards?.map((image, index) => (
                    <div key={index} className="cardss">
                      <div className="Orignal_seriesoverlays"></div>
                      <img
                        src={image.banner}
                        height={320}
                        alt={`image_${index}`}
                        onClick={() => handleMore(image)}
                        className="card-image"
                      />
                      <div
                        className={`row ${restartAnimation2 ? "row logo-container1" : "row"
                          }`}
                      >
                        <div className="row mb-3">
                          {/* <img src={image.titleImg} alt="" height={50} /> */}
                          <p className="text-white">{image.title}</p>
                          <div className="col-md-8"></div>
                        </div>

                        <div className="row m-auto">
                          {/* <span className="col-md-4 me-1  m-auto  text-white ">
                            <PlayCircleFilledWhiteIcon
                              onClick={() => incrementViews(image?._id)}
                              className="playicon"
                            />{" "}
                          </span> */}

                          <span className="col-md-5 me-2 m-auto text-white watchlist relativeP">
                            {" "}
                            <AddIcon
                              className="addicons"
                              onClick={() => handleAddToWishlist(image?._id)}
                            />
                            <button className="col-md-3  watch1">
                              watchlist
                            </button>
                          </span>

                          <span className="col-md-5 m-auto text-white detailsList relativeP ">
                            <IoInformationCircleOutline
                              onClick={() => handleMore(image)}
                              className="addicons fnt30  "
                            />
                            <button className="col-md-3  details">
                              Details
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {TrendingMovies?.length > 0 && (
            <div className="row m-auto relativeP">
              <h6 className="row text_White m-auto mb-3 ">
                CND PLAY Top 10 Indie Movies
              </h6>

              <Carousel
                activeIndex={toptenMovies}
                className="col-md-12 videoWidth videoBNr home"
              >
                {TrendingMovies?.map((Ele, index) => (
                  <Carousel.Item key={index} className="toptenmovie">
                    <div className="toptenmovieOverl"> </div>
                    <div className="row informat">
                      <div className="row ms-4">
                        <h6 className="text_White">{Ele?.title}</h6>
                        <h1 className="text_White textbold mt-2 ">
                          {Ele?.subTitel}
                        </h1>
                        <p className="col-md-8 text_White textbold ">
                          {Ele?.desc}
                        </p>
                        <p className="col-md-8 textbold duration">
                          {Ele?.duration}
                        </p>

                        <div className="row text_White">
                          <div className="col-md-7">
                            <div className="row">
                              <span className="col-md-2 m-auto text-white">
                                <PlayCircleFilledWhiteIcon
                                  onClick={() => incrementViews(Ele?._id)}
                                  className="playicon extraindex"
                                />
                              </span>
                              <span className="col-md-2 m-auto fnt14 watchlist relativeP">
                                <AddIcon
                                  className="addicons lefts fnt30"
                                  onClick={() => handleAddToWishlist(Ele?._id)}
                                />
                                <button className="watch1">Watchlist</button>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4"></div>
                        </div>
                      </div>
                    </div>

                    {PlayVideo && index === toptenMovies ? (
                      <div
                        className="videoWrapper"
                        onMouseEnter={() => setPlayVideo(true)}
                        onMouseLeave={() => setPlayVideo(false)}
                      >
                        <div className="toptenmovieOverl"> </div>

                        <ReactPlayer
                          muted={!BVolume}
                          url={Ele?.trailer}
                          className="relativeP videoWidth"
                          width="100%"
                          title="Video Player"
                          height="100vh"
                          type="video/mp4"
                          playing={true}
                          onClick={() => incrementViews(Ele?._id)}
                          allowFullScreen
                        />
                        <div className="row m-auto">
                          <div className="bnrvolume col-md-2">
                            {BVolume ? (
                              <VolumeUpIcon onClick={() => setBVolume(false)} />
                            ) : (
                              <VolumeOffIcon onClick={() => setBVolume(true)} />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="imageWrapper"
                        onMouseEnter={() => setPlayVideo(true)}
                      >
                        <img
                          src={Ele?.banner}
                          alt=""
                          onClick={() => incrementViews(Ele?._id)}
                          className="slide videoWidth"
                        />
                        <div className="toptenmovieOverl"> </div>
                      </div>
                    )}
                  </Carousel.Item>
                ))}
              </Carousel>

              <div
                className="row"
                style={{ position: "absolute", top: "70%", zIndex: "999" }}
              >
                <MultiCarousel responsive={responsive}>
                  {TrendingMoviesSlider?.map((ele, inneindex) => (
                    <div key={ele?._id} className="col-md-10 m-auto">
                      <div className="row">
                        <h1 className="col-md-2 index_size text-white">
                          {inneindex + 1}
                        </h1>
                        <div
                          className="col-md-10"
                          style={{ boxShadow: "10px" }}
                        >
                          <img
                            src={ele?.banner}
                            alt=""
                            onClick={() => incrementViews(ele?._id)}
                            height={140}
                            className="w-100 borderRa"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </MultiCarousel>
              </div>
            </div>
          )}

          <PurchaseContent
            purchaceContent={purchaceContent}
            setPurchaceContent={setPurchaceContent}
            purchaceContentData={purchaceContentData}
            purchaseid={purchaseid}
            handlePurchaseContenet={handlePurchaseContenet}
            handlePlanPurchase={handlePlanPurchase}
          />
          {/* {showWebView && (
          <iframe
            src={paymentUrl}
            title="Payment"
            width="100%"
            height="500px"
          />
        )} */}
          {disliked ||
            (Purchades && (
              <div className="row">
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  style={{ width: "100%", height: "14%" }}
                />
              </div>
            ))}

          <Footer />
        </div>
      )}
    </>
  );
}
