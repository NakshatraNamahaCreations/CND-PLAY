import React, { useRef, useState, useEffect, createRef } from "react";
import { useLocation } from "react-router-dom";
import ContentsPageService from "./DataApi/Api";
import ReactPlayer from "react-player";
import RegisterPage from "./DataApi/Register";
import ReactStarsRating from "react-awesome-stars-rating";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import axios from "axios";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeriesPageService from "./DataApi/SeriesApi";
export default function PlayEpisodes() {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [EpisodData, setEpisodData] = useState([]);
  const [Ratevalue, setRatevalue] = useState();
  const onChange = (value) => {
    setRatevalue(value);
  };
  const [Watching, setWatching] = useState([]);
  const location = useLocation();
  const data = location.state ? location.state : null;
  const fetchData = async () => {
    let DataById = await ContentsPageService.getByContenId(data.Item._id);
    let Episode = await SeriesPageService.fetchEpisodes();

    setEpisodData(Episode);
    let ContinewWatch = await RegisterPage.GetUserById(getlocalStorage?._id);
    let ContinewWatchingData = ContinewWatch?.continueWatching?.find(
      (ele) => ele?.contentId === DataById?._id
    );
    setWatching(ContinewWatchingData);
  };

  useEffect(() => {
    fetchData();
  }, [data.Item._id]);
  const [hideInfo, setHideInfo] = useState(false);
  // const [IsTrailer, setIsTrailer] = useState(false);

  const [videoState, setVideoState] = useState({
    currentTime: 0,
    totalDuration: 0,
    microseconds: 0,
  });

  const playerRef = useRef(null);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleProgress = (state) => {
    const { playedSeconds } = state;

    const currentMicroseconds = playedSeconds * 1e6;
    if (currentMicroseconds <= 127243266) {
      setHideInfo(true);
    }

    setVideoState((prevState) => ({
      ...prevState,
      currentTime: formatTime(playedSeconds),
      microseconds: currentMicroseconds,
    }));

    updateBackendDuration(playedSeconds);
  };

  const handleDuration = (duration) => {
    let microsecondsd = duration * 1e6;
    setVideoState((prevState) => ({
      ...prevState,
      totalDuration: duration,
      microseconds: microsecondsd,
    }));
  };
  // console.log(data);
  const updateBackendDuration = async () => {
    const contentId = data.Item?._id;
    const updatedDuration = {
      contentId: contentId,
      section: data.section,
      video: data.Item.video,
      banner: data.Item.banner,
      poster: data.Item.banner,
      duration: videoState.currentTime,
      mobile_duration: videoState.microseconds,
      totalDuration: formatTime(videoState.totalDuration),
    };
    let initialPostData = { continueWatching: [updatedDuration] };
    if (getlocalStorage?._id) {
      await ContentsPageService.ContinewWatching(
        initialPostData,
        getlocalStorage?._id
      );
    }
  };

  const [isplaying, setPlaying] = useState(false);
  const [Rating, setRating] = useState(false);
  const handleReady = async () => {
    let seconds = Watching?.mobile_duration / 1e6;
    playerRef.current.seekTo(!seconds ? 0 : seconds);

    try {
      let ContinewWatch = await RegisterPage.GetUserById(getlocalStorage?._id);
      const isContentPurchased =
        ContinewWatch?.purchasedcontent?.ActiveContent?.find(
          (ele) => ele.content_id === EpisodData._id
        );

      if (isContentPurchased) {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    } catch (error) {
      console.error("Error checking purchase status:", error);
      alert("An error occurred while checking the purchase status.");
    }
  };
  useEffect(() => {
    const halfTotalDuration = videoState.totalDuration / 2;
    const currentUserID = getlocalStorage?._id;

    // const shouldShowRatingModal = data?.Item?.ContentRating?.some(
    //   (rating) =>
    //     videoState.microseconds > halfTotalDuration &&
    //     rating.userId !== currentUserID
    // );
    // console.log(shouldShowRatingModal, "shouldShowRatingModal");
    // if (!shouldShowRatingModal) {
    //   setRating(true);
    // } else {
    //   setRating(false);
    // }
  }, [data, videoState]);

  const notify = () =>
    toast.success("Thank you for rating the movie!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "colored",
      transition: Bounce,
    });

  const handleSubmitRating = async () => {
    try {
      const response = await axios.post(
        `https://api.cndplay.com/api/contents/countratings/${data.Item._id}`,
        {
          userId: getlocalStorage?._id,
          rate: Ratevalue,
        }
      );
      if (response.status === 200) {
        notify();
        setRating(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error (e.g., display to user)
    }
  };

  return (
    <div
      className="col-md-12 bg-mg m-auto"
      style={{ backgroundColor: "#0f171e", height: "100vh" }}
    >
      {EpisodData?.filter((ele) => ele._id === data.Item._id)?.map((vid) => {
        console.log(vid, "vid");
        return (
          <>
            {data.type === "Trailer" && (
              <ReactPlayer
                url={vid?.trailer}
                controls
                width="100%"
                height="100vh"
              />
            )}{" "}
            {data.type === "movie" && (
              <ReactPlayer
                ref={playerRef}
                url={vid?.video}
                controls
                width="100%"
                height="100vh"
                onProgress={handleProgress}
                onDuration={handleDuration}
                onReady={handleReady}
                playing={isplaying}
              />
            )}
            <div className="row">
              <Modal
                className="row"
                show={Rating}
                style={{ position: "absolute", top: "10%" }}
              >
                <Modal.Body className="row bg-white shadow-lg text_White rounded">
                  <div className="text-center">
                    <p className="text-dark">How Was Your Experience?</p>
                    <ReactStarsRating onChange={onChange} value={Ratevalue} />
                    <p className="text-dark mt-3">{Ratevalue}</p>
                  </div>
                  <button
                    className="col-md-2 m-auto"
                    style={{ border: "none" }}
                    onClick={handleSubmitRating}
                  >
                    Submit
                  </button>
                </Modal.Body>
              </Modal>
            </div>
            <ToastContainer />
          </>
        );
      })}
    </div>
  );
}
