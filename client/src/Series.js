import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddIcon from "@mui/icons-material/Add";
import TheatersIcon from "@mui/icons-material/Theaters";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ContentsPageService from "./DataApi/Api";
import Footer from "./footer";
import IndiaMoviePageService from "./DataApi/SeriesApi";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoInformationCircleOutline } from "react-icons/io5";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { ImFilm } from "react-icons/im";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
export default function Series() {
  const [LatestReleased, setLatestReleased] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [IndiaSeries, setIndiaSeries] = useState([]);
  const [UpcomingSeries, setUpcomingSeries] = useState([]);
  const [TrendingSeries, setTrendingSeries] = useState([]);
  const [IndiaSeriesIndex, setIndiaSeriesIndex] = useState(0);
  const [TrendingIndex, setTrendingIndex] = useState(0);
  const [Upcomingdata, setUpcomingdata] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestreleased, setlatestreleased] = useState(0);
  const [movieview, setmovieview] = useState(false);
  const [SelectedMovie, setSelectedMovie] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % (Banners?.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide > 0 ? prevSlide - 1 : Banners?.length - 3
    );
  };
  const navigate = useNavigate();
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handelnextSlider = (index) => {
    if (index === 0) {
      setlatestreleased(
        (prevSlide) => (prevSlide + 1) % (LatestReleased?.length - 5)
      );
    }
    if (index === 1) {
      setIndiaSeriesIndex(
        (prevSlide) => (prevSlide + 1) % (IndiaSeries?.length - 5)
      );
    }
    if (index === 2) {
      setUpcomingdata(
        (prevSlide) => (prevSlide + 1) % (UpcomingSeries?.length - 5)
      );
    }
    if (index === 3) {
      setTrendingIndex(
        (prevSlide) => (prevSlide + 1) % (TrendingSeries?.length - 5)
      );
    }
  };

  const handelprevSlider = (index) => {
    if (index === 0) {
      setlatestreleased((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : LatestReleased?.length - 6
      );
    }
    if (index === 1) {
      setIndiaSeriesIndex((prevSlide) =>
        prevSlide > 1 ? prevSlide - 1 : IndiaSeries?.length - 6
      );
    }
    if (index === 2) {
      setUpcomingdata((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : UpcomingSeries?.length - 6
      );
    }
    if (index === 3) {
      setTrendingIndex((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : TrendingSeries?.length - 6
      );
    }
  };
  const handleMovieView = (Item) => {
    setmovieview(true);
    // setSelectedMovie(movie);
    navigate("/WatchVideoMode", { state: { id: Item } });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let listOfMovie = await ContentsPageService.fetchContentsList();
    let latestreleased = await ContentsPageService.getLatestreleased();
    let IndiaMovi = await IndiaMoviePageService.fetchIndiaSeriesList();
    let Upcomingdata = await IndiaMoviePageService.fetchUpcomingList();
    let Trendingdata = await IndiaMoviePageService.fetchTrendingList();

    setLatestReleased(latestreleased);
    setIndiaSeries(IndiaMovi);
    setBanners(listOfMovie);
    setUpcomingSeries(Upcomingdata);
    setTrendingSeries(Trendingdata);
  };

  return (
    <>
      <div className="col-md-12 m-auto bg-mg">
        <div className="col-md-12">
          <div className="row m-auto ">
            <button
              onClick={prevSlide}
              className={`button1 movibtn col-md-1 text-white  ${
                currentSlide === 0 ? "disabled" : ""
              }`}
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className={`button1 movibtn col-md-1 button2 text-white  ${
                currentSlide === Banners?.length - 1 ? "disabled" : ""
              }`}
            >
              &#10095;
            </button>

            {Banners?.slice(currentSlide, currentSlide + 3)?.map(
              (ele, index) => (
                <div className="col-md-4 ">
                  <img
                    className="m-auto"
                    width={400}
                    onClick={() => handleMovieView(ele?._id)}
                    height={250}
                    key={ele?._id}
                    src={ele?.banner}
                    alt=""
                  />{" "}
                </div>
              )
            )}
          </div>

          <div className="row m-auto mt-3 ">
            <div className="row">
              <h4 className="row text_White m-auto mb-3 ">
                Latest Released Series{" "}
              </h4>{" "}
              <div className="row m-auto relativeP">
                {LatestReleased?.length > 6 && (
                  <>
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
                  </>
                )}
                {LatestReleased?.slice(latestreleased, latestreleased + 6).map(
                  (ele) => (
                    <div className="col-md-2">
                      <img
                        height={190}
                        width={180}
                        className=" borderRa"
                        key={ele?._id}
                        src={ele?.banner}
                        onClick={() => handleMovieView(ele?._id)}
                        alt=""
                      />{" "}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="row">
              <div className="row m-auto mt-3 ">
                <h4 className="row text_White m-auto mb-3 ">India Series </h4>{" "}
                <div className="row m-auto relativeP">
                  {IndiaSeries?.length > 6 && (
                    <>
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
                    </>
                  )}
                  {IndiaSeries?.slice(
                    IndiaSeriesIndex,
                    IndiaSeriesIndex + 6
                  ).map((ele) => (
                    <div className="col-md-2">
                      <img
                        height={190}
                        width={180}
                        className=" borderRa"
                        key={ele?._id}
                        src={ele?.banner}
                        onClick={() => handleMovieView(ele?._id)}
                        alt=""
                      />{" "}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="row m-auto mt-3 ">
                <h4 className="row text_White m-auto mb-3 ">
                  Upcoming Series{" "}
                </h4>{" "}
                <div className="row m-auto relativeP">
                  {UpcomingSeries?.length > 6 && (
                    <>
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
                    </>
                  )}
                  {UpcomingSeries?.slice(Upcomingdata, Upcomingdata + 6).map(
                    (ele) => (
                      <div className="col-md-2">
                        <img
                          height={190}
                          width={180}
                          className=" borderRa"
                          key={ele?._id}
                          src={ele?.banner}
                          alt=""
                          onClick={() => handleMovieView(ele?._id)}
                        />{" "}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row m-auto mt-3 ">
                <h4 className="row text_White m-auto mb-3 ">
                  Trending Series{" "}
                </h4>{" "}
                <div className="row m-auto relativeP">
                  {TrendingSeries?.length > 6 && (
                    <>
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
                    </>
                  )}
                  {TrendingSeries?.slice(TrendingIndex, TrendingIndex + 6).map(
                    (ele) => (
                      <div className="col-md-2">
                        <img
                          height={190}
                          width={180}
                          className=" borderRa"
                          key={ele?._id}
                          onClick={() => handleMovieView(ele?._id)}
                          src={ele?.banner}
                          alt=""
                        />{" "}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
