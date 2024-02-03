import React, { useLayoutEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const SingleComponent = () => {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);

  useLayoutEffect(() => {
    const play = {
      fill: true,
      fluid: true,
      autoplay: true,
      controls: true,
      preload: "metadata",
      sources: [
        {
          src: "https://cndplay.b-cdn.net/Trailers/BLACK%20N%20WHITE%20(Official%20Trailer)%20__%20Ravi%20Sarma%20__%20Assamese%20Feature%20Film%20__%2024th%20February.mp4"
          ,
          type: "application/x-mpegURL",
        },
      ],
    };

    // Check if the videoNode is available before initializing Video.js
    if (videoNode.current) {
      const _player = videojs(videoNode.current, play, () => {
        // Video.js player is ready
      });
      setPlayer(_player);

      return () => {
        // Clean up on component unmount
        if (_player !== null) {
          _player.dispose();
        }
      };
    }
  }, []);

  return (
    <div className="App">
      <div data-vjs-player>
        <video ref={videoNode} className="video-js"></video>
      </div>
    </div>
  );
};

export default SingleComponent;
