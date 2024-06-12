import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ ele }) => {
  const LatesMovies = [
    {
      id: 1,
      duration: "2023 8 hr 40 min",
      movie:
        "https://s3-dub-2.cf.trailer.row.aiv-cdn.net/8340/511b/16f2/460c-a174-4d5b623268db/c76e81f2-992a-49b5-a1b0-8a42d898f8f2_video_900_audio_aaclc_128.mp4?Expires=1703726496&Signature=hbPS4btp9zGSM-UTd9FCTvDixKeyITcex3t~iUeNpSWUaGHUXxJ8j6o53MBMHkgl1YcUoAa4NgktiLtqB6tjGteVLt65XHphZE~WN00tC1RSJ0cB3FILrXPL~NbDcmWqaoZ9kHJm-6NYGhljkJSU5vG7raFBwdQyEOKjYpsXtZeVyeZMkNti3BZCQLULQMKlU7Us2t7hbGMfv-si1g0lrvSmCsj56DVTq0SsVWP8E6doELeJBGPF-SF525IB5W6JBmOXl6DFyRx~0uUMWw4cyI8UCybvvAYrTXUAGLsGZq9iBdR6qSpcyDnyddFy1O--4cAoiVL3eag1lTTBf3cGaA__&Key-Pair-Id=APKAJIYEUF5P2E3CCYTA",
      logo: "../NewImg/dunky-removebg-preview.png",
      desc: "Pandappa from remote village of mandy vowes to perform if the field are suidtable",
      language: "",
      title: "Sri Raghupati",
    },
    {
      id: 2,
      duration: "2023 8 hr 40 min",
      logo: "../NewImg/dunky-removebg-preview.png",
      desc: "Pandappa from remote village of mandy vowes to perform if the field are suidtable",
      title: "Sri Raghupati",
      movie:
        "https://s3-iad-2.cf.trailer.row.aiv-cdn.net/2efc/7e2b/ac21/4f71-8657-5e9fa8f316e6/fa3742d3-c4a2-46f7-b0d4-ee2e618ba80c_video_900_audio_aaclc_128.mp4?Expires=1703726496&Signature=ViLmijKjzcoXxCBhaCJMnkW6kle-JBLtPcxBlloyO1Kx3PHLoUUhedNW-~XZWBa5G5dCJa5BIXKXbCjP5AkZvl8pq6YmYYw~jozpHT~jCeAQLOY8lia-tBvgbd7mxapEmKhxZDfOFn2yDZYEmDO30mzqAlz2ZkDUxWRoBhqojALrV1MaUaq2x5wsJ~0khBs57aJCu93Uq6LZ89MgaByPy39RshWJNI~k0n2DG9rdUv3DKpfIHNgNU98TgsjeL4rC4r1qe7miIo67f7RTGh9wn2ygvJ5owIiqr7BqAdl3WRioVqFawFZ~qaf6fPd0vIzdLrEOv~kCI8U0ulwAxIunLw__&Key-Pair-Id=APKAJIYEUF5P2E3CCYTA",
    },
    {
      id: 3,
      duration: "2023 8 hr 40 min",
      logo: "../NewImg/dunky-removebg-preview.png",
      desc: "Pandappa from remote village of mandy vowes to perform if the field are suidtable",
      title: "Sri Raghupati",
      movie:
        "https://s3-iad-2.cf.trailer.row.aiv-cdn.net/97da/e9a0/9a90/45d8-b692-7a2d0c9fdc15/bb12e4b4-72a4-4447-b8de-9ba9b80742c5_video_900_audio_aaclc_128.mp4?Expires=1703726496&Signature=Y3JUdTJg-GP8Tdew6QbWWf-v1CtciHyc4Zubr7CcL3plXrXpzUb1itpzlAudxVg4hPYGm2R9YuHz4Qt8pPxzsyimxb0lWmdt~vfPXWLpbKObtcxzMLzPxmq7dpj14si5ZZ8TVjgVuzM1Tmsq1AAjPg9g7Mst-QMnnN1iLVYo~ZOfMpwYJjFtG-G2lVGbhFfElUfOqz2A8pwVVMTr3FNJl~pueWm3GWM6X9waqbt4oCsEOg84Adq3QEvxGec2j23Xe75val6R-8SecjLPbNRMgrfMzdo4fF6EDVgK491yv60SLXC5AiStwV50MA-fbaYcda8aoi98AI6WaR8a3KQavw__&Key-Pair-Id=APKAJIYEUF5P2E3CCYTA",
    },
    {
      id: 4,
      duration: "2023 8 hr 40 min",
      logo: "../NewImg/dunky-removebg-preview.png",
      desc: "Pandappa from remote village of mandy vowes to perform if the field are suidtable",
      title: "Sri Raghupati",
      movie:
        "https://s3.ll.videorolls.row.aiv-cdn.net/ww_iad/fe15/e45a/10be/42ba-893d-5cd958258071/8111016f-39a3-459d-8cbb-661f6da6f863_video_480p_900kbps_audio_aaclc_128kbps.mp4",
    },
    {
      id: 5,
      duration: "2023 8 hr 40 min",
      logo: "../NewImg/dunky-removebg-preview.png",
      desc: "Pandappa from remote village of mandy vowes to perform if the field are suidtable",
      title: "Sri Raghupati",
      movie:
        "https://s3.ll.videorolls.row.aiv-cdn.net/ww_iad/f190/b8e7/3e76/4b42-914a-7a9ca3cb3f23/f549b19d-f2e8-413d-8a8e-013127b94e03_video_480p_900kbps_audio_aaclc_128kbps.mp4",
    },

    {
      id: 6,
      duration: "2023 8 hr 40 min",
      logo: "../NewImg/dunky-removebg-preview.png",
      desc: "Pandappa from remote village of mandy vowes to perform if the field are suidtable",
      title: "Sri Raghupati",
      movie:
        "https://s3.ll.videorolls.row.aiv-cdn.net/ww_iad/a535/24b0/e3de/4b57-ba56-fae476526c86/95c59aca-e41c-4cd7-b158-b01893496a97_video_480p_900kbps_audio_aaclc_128kbps.mp4",
    },
    {
      id: 7,
      duration: "2023 8 hr 40 min",
      logo: "../NewImg/dunky-removebg-preview.png",
      desc: "Pandappa from remote village of mandy vowes to perform if the field are suidtable",
      title: "Sri Raghupati",
      movie:
        "https://s3.ll.videorolls.row.aiv-cdn.net/ww_iad/f190/b8e7/3e76/4b42-914a-7a9ca3cb3f23/f549b19d-f2e8-413d-8a8e-013127b94e03_video_480p_900kbps_audio_aaclc_128kbps.mp4",
    },
  ];
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [hoveredVideos, setHoveredVideos] = useState(new Map());
  const videoRef = useRef({});

  useEffect(() => {
    // Initialize or update the videoRef.current with the latest video element
    if (ele) {
      videoRef.current[ele.id] = videoRef.current[ele.id] || React.createRef();
    }
  }, [ele]);

  const handleMouseOver = (videoId) => {
    setHoveredVideos((prev) => new Map(prev.set(videoId, true)));
    const video = videoRef.current[videoId]?.current;
    if (video && !video.paused && !video.ended) {
      video.play();
    }
  };

  const handleMouseOut = (videoId) => {
    setHoveredVideos((prev) => new Map(prev.set(videoId, false)));
    const video = videoRef.current[videoId]?.current;
    if (video && !video.paused && !video.ended) {
      video.pause();
    }
  };

  const handleMouseMove = (e, videoId) => {
    const video = videoRef.current[videoId];
    if (!video) return;

    const mouseX = e.nativeEvent.offsetX;
    const progressBarWidth = e.target.offsetWidth;
    const scrubTime = (mouseX / progressBarWidth) * video.duration;
    video.currentTime = scrubTime;

    if (!video.paused && !video.ended) {
      video.play();
    }
  };

  const handleProgress = (videoId) => {
    const video = videoRef.current[videoId];
    if (!video) return;

    const percentage = (video.currentTime / video.duration) * 100;
    setProgressPercentage(percentage);
  };

  return (
    <div className="row">
      {LatesMovies?.map(
        (ele) =>
          ele && (
            <div key={ele.id} className="col-md-3 m-auto">
              <video
                ref={
                  (videoRef.current[ele.id] =
                    videoRef.current[ele.id] || React.createRef())
                }
                height={120}
                className="w-100 p-0 borderRa video"
                onPlay={() => handleMouseOver(ele.id)}
                onPause={() => handleMouseOut(ele.id)}
                onTimeUpdate={() => handleProgress(ele.id)}
                onMouseOver={() => handleMouseOver(ele.id)}
                onMouseOut={() => handleMouseOut(ele.id)}
                onClick={(e) => handleMouseMove(e, ele.id)}
                src={ele.movie}
              />
              <div
                className="controls"
                onMouseMove={(e) => handleMouseMove(e, ele.id)}
                onMouseOver={() => handleMouseOver(ele.id)}
                onMouseOut={() => handleMouseOut(ele.id)}
              >
                <div
                  onClick={(e) => handleMouseMove(e, ele.id)}
                  className="progress__filled"
                  style={{
                    flexBasis: `${progressPercentage}%`,
                    height: "5px",
                  }}
                ></div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default VideoPlayer;
