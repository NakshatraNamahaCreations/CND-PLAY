import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContentsPageService from "./DataApi/Api";
import ReactPlayer from "react-player";
import RegisterPage from "./DataApi/Register";

export default function PlayList() {
  const [Watching, setWatching] = useState([]);
  const [isScreenRecordingDetected, setIsScreenRecordingDetected] =
    useState(false);

  const fetchData = async () => {
    let authResponseString = localStorage.getItem("cndplay_auth_response");
    let getlocalStorage = JSON.parse(authResponseString);
    let DataById = await ContentsPageService.getByContenId(data.Item._id);
    let ContinewWatch = await RegisterPage.GetUserById(getlocalStorage?._id);
    let ContinewWatchingData = ContinewWatch?.continueWatching?.find(
      (ele) => ele.contentId === DataById._id
    );
    setWatching(ContinewWatchingData);
  };

  const location = useLocation();
  const data = location.state ? location.state : null;
  console.log(data, "data");
  useEffect(() => {
    fetchData();
  }, [data.Item._id]);

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

    const videoElement = document.querySelector("video");
    if (videoElement) {
      const handleEncrypted = () => {
        setIsScreenRecordingDetected(true);
      };
      videoElement.addEventListener("encrypted", handleEncrypted);

      return () => {
        document.removeEventListener("copy", handleCopy);
        document.removeEventListener("keyup", handleKeyUp);
        videoElement.removeEventListener("encrypted", handleEncrypted);
      };
    }
  }, []);

  return (
    <div
      className="col-md-12 bg-mg m-auto"
      style={{ backgroundColor: "#0f171e", height: "100vh" }}
    >
      {isScreenRecordingDetected && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              marginTop: "50vh",
              fontSize: "24px",
              color: "red",
            }}
          >
            Screen Recording Detected
          </p>
        </div>
      )}
      {data?.type === "Trailer" && (
        <ReactPlayer
          url={data.Item?.trailer}
          controls
          width="100%"
          height="100vh"
        />
      )}
      {data?.type === "movie" && (
        <ReactPlayer
          url={data.Item?.video}
          controls
          width="100%"
          height="100vh"
        />
      )}
      {data?.type === "series" && (
        <ReactPlayer
          url={data.Item?.video}
          controls
          width="100%"
          height="100vh"
        />
      )}
    </div>
  );
}
