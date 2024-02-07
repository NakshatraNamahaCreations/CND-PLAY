import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContentsPageService from "./DataApi/Api";
import Footer from "./footer";
import musicsPageService from "./DataApi/MusicApi";
import { Link, useNavigate } from "react-router-dom";

export default function MusicComponent() {
  const [LatestReleased, setLatestReleased] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [IndiaMusic, setIndiaMusic] = useState([]);
  const [UpcomingMusic, setUpcomingMusic] = useState([]);
  const [TrendingMusic, setTrendingMusic] = useState([]);
  const [IndiaMusicIndex, setIndiaMusicIndex] = useState(0);
  const [TrendingIndex, setTrendingIndex] = useState(0);
  const [Upcomingdata, setUpcomingdata] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestreleased, setlatestreleased] = useState(0);
  const [movieview, setmovieview] = useState(false);
  // const [SelectedMovie, setSelectedMovie] = useState(false);

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
      setIndiaMusicIndex(
        (prevSlide) => (prevSlide + 1) % (IndiaMusic?.length - 5)
      );
    }
    if (index === 2) {
      setUpcomingdata(
        (prevSlide) => (prevSlide + 1) % (UpcomingMusic?.length - 5)
      );
    }
    if (index === 3) {
      setTrendingIndex(
        (prevSlide) => (prevSlide + 1) % (TrendingMusic?.length - 5)
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
      setIndiaMusicIndex((prevSlide) =>
        prevSlide > 1 ? prevSlide - 1 : IndiaMusic?.length - 6
      );
    }
    if (index === 2) {
      setUpcomingdata((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : UpcomingMusic?.length - 6
      );
    }
    if (index === 3) {
      setTrendingIndex((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : TrendingMusic?.length - 6
      );
    }
  };
  const handleMovieView = (Item) => {
    setmovieview(true);
    navigate("/WatchVideoMode", { state: { id: Item } });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let listOfMovie = await musicsPageService.fetchContentsListmusics();
    let latestreleased = await musicsPageService.getLatestreleasedmusics();
    let IndiaMovi = await musicsPageService.fetchIndiamusicsList();
    let Upcomingdata = await musicsPageService.fetchUpcomingListmusics();
    let Trendingdata = await musicsPageService.fetchTrendingListmusics();

    setLatestReleased(latestreleased);
    setIndiaMusic(IndiaMovi);
    setBanners(listOfMovie);
    setUpcomingMusic(Upcomingdata);
    setTrendingMusic(Trendingdata);
  };

  return (
    <>
      <div className="col-md-12 m-auto bg-mg">
        <div className="col-md-12">
          {Banners.length > 0 && (
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
          )}

          <div className="row m-auto mt-3 ">
            {LatestReleased.length > 0 && (
              <div className="row">
                <h4 className="row text_White m-auto mb-3 ">
                  Latest Released Music{" "}
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
                  {LatestReleased?.slice(
                    latestreleased,
                    latestreleased + 6
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
            )}
            {IndiaMusic.length > 0 && (
              <div className="row">
                <div className="row m-auto mt-3 ">
                  <h4 className="row text_White m-auto mb-3 ">India Music </h4>{" "}
                  <div className="row m-auto relativeP">
                    {IndiaMusic?.length > 6 && (
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
                    {IndiaMusic?.slice(
                      IndiaMusicIndex,
                      IndiaMusicIndex + 6
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
            )}
            {UpcomingMusic.length > 0 && (
              <div className="row">
                <div className="row m-auto mt-3 ">
                  <h4 className="row text_White m-auto mb-3 ">
                    Upcoming Music{" "}
                  </h4>{" "}
                  <div className="row m-auto relativeP">
                    {UpcomingMusic?.length > 6 && (
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
                    {UpcomingMusic?.slice(Upcomingdata, Upcomingdata + 6).map(
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
            )}
            {TrendingMusic.length > 0 && (
              <div className="row">
                <div className="row m-auto mt-3 ">
                  <h4 className="row text_White m-auto mb-3 ">
                    Trending Music{" "}
                  </h4>{" "}
                  <div className="row m-auto relativeP">
                    {TrendingMusic?.length > 6 && (
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
                    {TrendingMusic?.slice(TrendingIndex, TrendingIndex + 6).map(
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
            )}
            <Footer />
          </div>
        </div>
        {LatestReleased &&
          Banners &&
          IndiaMusic &&
          UpcomingMusic &&
          TrendingMusic && <div className="col-md-12">Music Not Found</div>}
      </div>
    </>
  );
}
