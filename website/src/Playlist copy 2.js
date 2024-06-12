import React, { useRef, useState, useEffect, createRef } from "react";
import { useLocation } from "react-router-dom";
import ContentsPageService from "./DataApi/Api";
import ReactPlayer from "react-player";
import RegisterPage from "./DataApi/Register";

export default function PlayList() {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);

  const [Watching, setWatching] = useState([]);

  const fetchData = async () => {
    let DataById = await ContentsPageService.getByContenId(data.Item._id);
    // console.log(DataById, "DataById");
    let ContinewWatch = await RegisterPage.GetUserById(getlocalStorage?._id);
    let ContinewWatchingData = ContinewWatch?.continueWatching?.find(
      (ele) => ele.contentId === DataById._id
    );
    // console.log(ContinewWatchingData, "getlocalStorage");
    setWatching(ContinewWatchingData);
  };

  const location = useLocation();
  const data = location.state ? location.state : null;
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

    // updateBackendDuration(playedSeconds);
  };
  const handlePause = (state) => {
    // console.log(state, "onpause");
  };

  const handleDuration = (duration) => {
    let microsecondsd = duration * 1e6;
    setVideoState((prevState) => ({
      ...prevState,
      totalDuration: duration,
      microseconds: microsecondsd,
    }));
  };

  const updateBackendDuration = async () => {
    const contentId = data.Item?._id;
    const updatedDuration = {
      contentId: contentId,
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

  const handleReady = async () => {
    let seconds = Watching?.mobile_duration / 1e6;
    playerRef.current.seekTo(!seconds ? 0 : seconds);

    try {
      let ContinewWatch = await RegisterPage.GetUserById(getlocalStorage?._id);
      const isContentPurchased =
        ContinewWatch?.purchasedcontent?.ActiveContent?.find(
          (ele) => ele.content_id === data.Item._id
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
    const handleCopy = (e) => {
      e.preventDefault();
      alert("Copying is disabled");
    };

    const handleKeyUp = (e) => {
      navigator.clipboard.writeText("");
      alert("Screenshot Disabled");
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      className="col-md-12 bg-mg m-auto"
      style={{ backgroundColor: "#0f171e", height: "100vh" }}
    >
      <>
        {data.type === "Trailer" && (
          <ReactPlayer
            url={data.Item?.trailer}
            controls
            width="100%"
            height="100vh"
          />
        )}{" "}
        {data.type === "movie" && (
          <ReactPlayer
            ref={playerRef}
            url={data.Item?.video}
            controls
            width="100%"
            height="100vh"
            onProgress={handleProgress}
            onDuration={handleDuration}
            onReady={handleReady}
            onPause={handlePause}
            playing={isplaying}
          />
        )}
      </>
    </div>
  );
}
