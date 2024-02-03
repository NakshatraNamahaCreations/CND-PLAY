import React, { useRef, useState, useEffect, createRef } from "react";
import { BGBnners, mostvieved } from "./JsonData";
import { useLocation } from "react-router-dom";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10OutlinedIcon from "@mui/icons-material/Forward10Outlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import Accordion from "react-bootstrap/Accordion";
import ContentsPageService from "./DataApi/Api";
import ReactPlayer from "react-player";
export default function PlayList() {
  useEffect(() => {
    fetchData();
  }, []);
  const [ContentData, setContentData] = useState([]);

  const fetchData = async () => {
    let listOfMovie = await ContentsPageService.fetchContentsList();
    setContentData(listOfMovie);
  };
  const location = useLocation();
  const idd = location.state ? location.state.id : null;
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [Pause, setPause] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ShowAllDetails, setShowAllDetails] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [valumeValue, setvalumeValue] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [played, setPlayed] = useState(0);
  // const skipSeconds = (amount) => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime += amount;
  //     setCurrentTime(videoRef.current.currentTime);
  //   }
  // };

  // const handlePause = () => {
  //   if (videoRef.current) {
  //     videoRef.current.pause();
  //     setPause(true);
  //   }
  // };

  // const handleResume = () => {
  //   if (videoRef.current) {
  //     videoRef.current.play();
  //     setPause(false);
  //   }
  // };

  // const handleTimeUpdate = () => {
  //   setCurrentTime(videoRef.current.currentTime);
  // };
  // const skipSeconds = (amount) => {
  //   if (videoRef.current) {
  //     const currentTime = videoRef.current.getCurrentTime();
  //     videoRef.current.seekTo(currentTime + amount, "seconds");
  //   }
  // };

  // const handlePause = () => {
  //   setPause(true);
  // };

  // const handleResume = () => {
  //   setPause(false);
  // };
  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video?.addEventListener("timeupdate", handleTimeUpdate);
    video?.addEventListener("durationchange", handleDurationChange);

    return () => {
      video?.removeEventListener("timeupdate", handleTimeUpdate);
      video?.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  // const calculateProgress = () => {
  //   if (!duration || !played) {
  //     return 0;
  //   }

  //   return (played * 100) / duration;
  // };

  // const formatTime = (timeInSeconds) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = Math.floor(timeInSeconds % 60);
  //   return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
  //     2,
  //     "0"
  //   )}`;
  // };
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);

    setvalumeValue(isMuted ? 0 : valumeValue);
  };

  const handleVolumeChange = (event) => {
    setvalumeValue(event.target.value);
    setIsMuted(false);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = isMuted;
      videoElement.volume = valumeValue / 100;
    }
  }, [isMuted, valumeValue]);

  const handleFullscreenToggle = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (!isFullscreen) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) {
          videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) {
          videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
          videoElement.msRequestFullscreen();
        }
      } else {
        const exitFullscreen =
          document.exitFullscreen ||
          document.mozCancelFullScreen ||
          document.webkitExitFullscreen ||
          document.msExitFullscreen;

        if (exitFullscreen) {
          exitFullscreen.call(document);
        } else {
          console.error("Fullscreen API is not supported in this browser.");
        }
      }

      setIsFullscreen(!isFullscreen);
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!document?.fullscreenElement);
    };

    document?.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document?.removeEventListener(
        "fullscreenchange",
        fullscreenChangeHandler
      );
    };
  }, []);
  const handleProgress = (progress) => {
    // Handle progress updates
    console.log(progress);
  };

  const handleTimeUpdate = ({ playedSeconds, played }) => {
    setCurrentTime(playedSeconds);
    setPlayed(played);
  };

  const handlePause = () => {
    setPause(true);
  };

  const handleResume = () => {
    setPause(false);
  };

  const skipSeconds = (amount) => {
    setPlayed((prevPlayed) => prevPlayed + amount / duration);
  };

  const calculateProgress = () => {
    return played * 100;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  console.log(idd);
  return (
    <div
      className="col-md-12 bg-mg m-auto"
      style={{ backgroundColor: "#0f171e", height: "100vh" }}
    >
      {ContentData?.filter((ele) => ele._id === idd).map((vid) => {
        return (
          <>
            {!ShowAllDetails ? (
              <>
                {/* <ReactPlayer
                  url={vid.video}
                  controls={false}
                  title="CND PLAY"
                  frameBorder="0"
                  muted={isMuted}
                  volume={valumeValue / 100}
                  allowFullScreen={!isFullscreen}
                  disablePictureInPicture
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                        disablePictureInPicture: true,
                      },
                    },
                  }}
                  className="col-md-12 m-0 p-0 relativeP videotag"
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onPause={handlePause}
                  onPlay={handleResume}
                  onContextMenu={(e) => e.preventDefault()}
                  width="100%"
                  height="100vh"
                  playing={!Pause}
                /> */}
                <iframe
                  style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    zIndex: "20",
                  }}
                  autoPlay
                  controls
                  muted={isMuted}
                  src={vid.video}
                  allowFullScreen
                  title="fullscreen-video"
                ></iframe>
                <div className="row ms-4  playlis">
                  <div className="col-md-4"></div>
                  <p onClick={() => setShowAllDetails(true)}>All</p>
                  <div className="col-md-8 playlist">
                    {ContentData?.map((ele) => {
                      return (
                        <div className="row  mt-3 playlist_con">
                          <img
                            width={100}
                            className="p-0 col-md-4"
                            height={90}
                            src={ele.banner}
                            alt=""
                            onClick={() => skipSeconds(-10)}
                          />{" "}
                          <p className="col-md-4 m-auto">
                            <p className="row titl m-0">{ele.title}</p>
                            <p className="row titl m-auto">{ele.Portrays}</p>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* <div className="col-md-12  informat informat1">
                  <div className="row m-auto">
                    <div className="col-md-4"></div>
                    <div
                      className="col-md-4"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <Replay10Icon
                          onClick={() => skipSeconds(-10)}
                          className="resumeicn fs-1 "
                        />{" "}
                      </span>{" "}
                      <span>
                        {!Pause ? (
                          <PauseIcon
                            onClick={() => handlePause()}
                            className="resumeicn fs-1"
                          />
                        ) : (
                          <PlayArrowIcon
                            onClick={() => handleResume()}
                            className="resumeicn fs-1"
                          />
                        )}
                      </span>{" "}
                      <span>
                        <Forward10OutlinedIcon
                          onClick={() => skipSeconds(10)}
                          className="resumeicn fs-1"
                        />
                      </span>{" "}
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>

                <div className="col-md-11 progresbr m-auto">
                  <div
                    className="row m-auto"
                    style={{ backgroundColor: "grey" }}
                  >
                    <div
                      className="progress"
                      style={{
                        width: `${calculateProgress()}%`,
                        height: "2px",
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-2 ">
                      <span className="fnt12 me-1">
                        {formatTime(currentTime)}
                      </span>
                      <span className=" fnt10 leftime">
                        / {formatTime(duration - currentTime)}
                      </span>
                    </div>
                    <div className="col-md-6 m-auto"></div>
                    <div className="col-md-4 m-auto">
                      <div className="row">
                        <div className="col-md-7">
                          {isMuted ? (
                            <>
                              <VolumeOffOutlinedIcon
                                className="fnt12"
                                onClick={handleMuteToggle}
                              />{" "}
                              <input
                                type="range"
                                value={0}
                                onChange={handleVolumeChange}
                                min="0"
                                max="100"
                                step="1"
                                style={{ height: "4px" }}
                                disabled
                              />
                            </>
                          ) : (
                            <>
                              <VolumeUpOutlinedIcon
                                className="fnt12"
                                onClick={handleMuteToggle}
                              />{" "}
                              <input
                                type="range"
                                value={valumeValue}
                                onChange={handleVolumeChange}
                                min="0"
                                max="100"
                                step="1"
                                style={{ height: "4px" }}
                              />
                            </>
                          )}
                        </div>
                        <p className="col-md-1">
                          <AspectRatioOutlinedIcon
                            onClick={handleFullscreenToggle}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </>
            ) : (
              <div className="row m-auto">
                <div className="col-md-8 relativeP">
                  {/* <video
                    controls={false}
                    controlsList="nodownload"
                    title="CND PLAY"
                    frameBorder="0"
                    muted={valumeValue === 0}
                    allowFullScreen={!isFullscreen}
                    className="col-md-12 p-0 m-0"
                    src={vid.movivid}
                    style={{ height: "80vh" }}
                    ref={videoRef}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onPause={handlePause}
                  /> */}
                  <iframe
                    style={{
                      width: "100%",
                      height: "100vh",
                      objectFit: "cover",
                      zIndex: "20",
                    }}
                    autoPlay
                    controls
                    muted={isMuted}
                    src={vid.video}
                    allowFullScreen
                    title="fullscreen-video"
                  ></iframe>
                  {/* <div className="col-md-12  informat informat1">
                    <div className="row m-auto">
                      <div className="col-md-4"></div>
                      <div
                        className="col-md-4"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <Replay10Icon
                            onClick={() => skipSeconds(-10)}
                            className="resumeicn fs-1 "
                          />{" "}
                        </span>{" "}
                        <span>
                          {!Pause ? (
                            <PauseIcon
                              onClick={() => handlePause()}
                              className="resumeicn fs-1"
                            />
                          ) : (
                            <PlayArrowIcon
                              onClick={() => handleResume()}
                              className="resumeicn fs-1"
                            />
                          )}
                        </span>{" "}
                        <span>
                          <Forward10OutlinedIcon
                            onClick={() => skipSeconds(10)}
                            className="resumeicn fs-1"
                          />
                        </span>{" "}
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div> */}

                  {/* <div className="col-md-11  progresbr relativeP m-auto">
                    <div
                      className="row m-auto"
                      style={{ backgroundColor: "grey" }}
                    >
                      <div
                        className="progress"
                        style={{
                          width: `${calculateProgress()}%`,
                          height: "2px",
                        }}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-2 ">
                        <span className="fnt12 me-1">
                          {formatTime(currentTime)}
                        </span>
                        <span className=" fnt10 leftime">
                          / {formatTime(duration - currentTime)}
                        </span>
                      </div>
                      <div className="col-md-6 m-auto"></div>
                      <div className="col-md-4 m-auto">
                        <div className="row">
                          <div className="col-md-10 ">
                            {isMuted ? (
                              <div className="row m-auto">
                                <span className="col-md-1">
                                  <VolumeOffOutlinedIcon
                                    className="fnt12 "
                                    onClick={handleMuteToggle}
                                  />{" "}
                                </span>
                                <span className="col-md-5">
                                  <input
                                    type="range"
                                    value={0}
                                    onChange={handleVolumeChange}
                                    min="0"
                                    max="100"
                                    step="1"
                                    style={{ height: "4px" }}
                                    disabled
                                  />
                                </span>
                              </div>
                            ) : (
                              <div className="row m-auto">
                                <span className="col-md-1">
                                  <VolumeUpOutlinedIcon
                                    className="fnt12"
                                    onClick={handleMuteToggle}
                                  />{" "}
                                </span>
                                <span className="col-md-9">
                                  <input
                                    type="range"
                                    value={valumeValue}
                                    onChange={handleVolumeChange}
                                    min="0"
                                    max="100"
                                    step="1"
                                    style={{ height: "4px" }}
                                  />
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="col-md-1">
                            <AspectRatioOutlinedIcon
                              onClick={handleFullscreenToggle}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="col-md-4  ">
                  <p
                    className="row cursor m-auto text_White"
                    onClick={() => setShowAllDetails(false)}
                  >
                    X
                  </p>

                  <div className="row text_White activeWathced">
                    <p className="col-md-3"> In Scene</p>
                    <p className="col-md-2"> Cast</p>
                    <p className="col-md-5"> Bonus Content</p>
                    <p className="col-md-2"> Music</p>
                  </div>

                  <div className="row ms-4  playlist">
                    {ContentData?.map((ele) => {
                      return (
                        <Accordion className="row mt-3 ">
                          <Accordion.Item eventKey="0" className="acordian">
                            <Accordion.Header className="row">
                              <img
                                className="p-0 col-md-2"
                                height={50}
                                src={ele.banner}
                                alt=""
                              />{" "}
                              <p className="col-md-6 m-auto">
                                <p className="row titl m-0">{ele.title}</p>
                                <p className="row titl m-auto">
                                  {ele.subtitle}
                                </p>
                              </p>
                            </Accordion.Header>
                            <Accordion.Body>
                              <p>{ele.storyline}</p>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
