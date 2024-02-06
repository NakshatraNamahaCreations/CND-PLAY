import React, { useEffect, useState, useRef } from "react";
// import { BGBnners, mostvieved } from "./JsonData";
import ContentsPageService from "./DataApi/Api";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
// import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { ImFilm } from "react-icons/im";
import { AiOutlineDislike } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Footer from "./footer";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button } from "react-bootstrap";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import CloseIcon from "@mui/icons-material/Close";
import Plyr from "plyr";
import zIndex from "@mui/material/styles/zIndex";
export default function LikedContent() {
  const location = useLocation();
  const idd = location.state ? location.state.id : null;

  let authResponseString = localStorage.getItem("auth_response");
  let getlocalStorage = JSON.parse(authResponseString);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [LikedContent, setLikedContent] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const handelprevSlider = (index) => {
    if (index === 0) {
      setCurrentSlide((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : LikedContent.length - 5
      );
    }
  };

  const fetchData = async () => {
    try {
      let likedmovie = await ContentsPageService.getLikes(getlocalStorage._id);

      let iid = await Promise.all(
        likedmovie?.map(async (ele) => {
          return await ContentsPageService.getByContenId(ele?.content_id);
        })
      );

      setLikedContent(iid);
    } catch (error) {
      console.error("Error fetching liked movies:", error);
    }
  };

  const handelnextSlider = (index) => {
    if (index === 0) {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % (LikedContent.length - 5)
      );
    }
  };

  return (
    <div className="col-md-12  bg-mg">
      <div className="row m-auto">
        <p className="text_White textbold mt-5 mb-5">Liked Contents</p>
      </div>
      <div className="row m-auto   relativeP">
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

        {LikedContent?.slice(currentSlide, currentSlide + 4).map((ele) => (
          <div key={ele.id} className="col-md-3 m-auto  movie-container  ">
            <img
              src={ele.banner}
              alt=""
              height={140}
              className="w-100  borderRa"
            />

            <div className="row  m-auto additional-content ">
              <div className="row  p-2">
                <div className="col-md-6 m-auto text_White ">
                  <div className="row">
                    <div className="col-md-6 m-auto">
                      <PlayCircleFilledWhiteIcon className="fnt35 playicon1" />{" "}
                    </div>
                    <span className="col-md-6 fnt14  text_White m-auto">
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
              <p className="fnt12 textbold">{ele.title}</p>
              <p className="fnt12 ">{ele.duration}</p>
              <p className="fnt12 ">
                {ele.title}-{ele.storyline}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="row m-auto">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
