import React, { useState } from "react";
import ContentsPageService from "./Api";
import { useLocation, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
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
import { useEffect } from "react";
export default function WatchVideoMode() {
  const location = useLocation();
  const idd = location.state ? location.state.id : null;
  const { movieDetails } = location.state || {};
  console.log("idd", idd);
  const [volume, setvolume] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [WachedMovie, setWachedMovie] = useState(0);
  const [WatchedIndex, setWatchedIndex] = useState(0);
  const [disliked, setdisliked] = useState(false);
  const [like, setlike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const handelnextSlider = (index) => {
    if (index === 0) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % (mostvieved.length - 5));
    }
  };
  const notifyLikes = () => {
    setdisliked(true);
    toast("Great! well recommend more like this");
  };
  const notifyDislike = () => {
    setlike(true);
    toast("Got it. we won't recommend this");
  };
  const handelprevSlider = (index) => {
    if (index === 0) {
      setCurrentSlide((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : mostvieved.length - 5
      );
    }
  };

  const handleSelect = (index) => {
    setWachedMovie(true);
    setWatchedIndex(index);
  };
  const redirectToEmail = (event) => {
    event.stopPropagation();
    window.location.href = "mailto:cndplay.com";
  };

  const redirectToFacebook = () => {
    window.location.href = "https://facebook.com/";
  };

  const redirectToTwitter = () => {
    window.location.href =
      "https://twitter.com/intent/tweet?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.clockndail.clockndail%26pcampaignid%3Dweb_share&via=GooglePlay&text=Have%20a%20look%20at%20%27CND%20PLAY%27";
  };

  const redirectToPinterest = () => {
    window.location.href = "https://pinterest.com/";
  };
  const [ContentData, setContentData] = useState([]);
  const [mostvieved, setMostViewedM] = useState([]);

  const fetchData = async () => {
    let listOfMovie = await ContentsPageService.fetchContentsList();
    let mostvieved = await ContentsPageService.fetchMostViewList();
    setContentData(listOfMovie);
    setMostViewedM(mostvieved);
  };

  return (
    <div className="col-md-12  bg-mg">
      <div className="col-md-12  ">
        {ContentData.filter((ele) => ele._id === idd).map((vid) => {
          console.log(vid, "viddd");
          return (
            <>
              {/* <video
                autoPlay
                muted={!volume}
                className="col-md-12 "
                src={vid.movivid}
              /> */}
 <iframe
                autoPlay
                muted={!volume}
                className="row"
                controls="0"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  vid.video
                )}?autoplay=1`}
                allowFullScreen
              ></iframe>
              <iframe
                autoPlay
                muted={!volume}
                className="col-md-12"
                controls="0"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  vid.video
                )}?autoplay=1`}
              ></iframe>

              <div className="row  m-auto">
                <div className="col-md-10"></div>
                <div className="bnrvolume col-md-2 ">
                  {volume ? (
                    <VolumeUpIcon onClick={() => setvolume(false)} />
                  ) : (
                    <VolumeOffIcon onClick={() => setvolume(true)} />
                  )}
                </div>
              </div>
              <div className="overlaybn"> </div>
              <div className="row m-auto">
                <div className="col-md-12 informat m-auto">
                  <div className="row ms-4">
                    <h6 className="text_White mt-5">{vid.title}</h6>
                    <h1 className="text_White textbold mt-5 mb-5 ">
                      {vid.subTitel}
                    </h1>
                    <p className="col-md-8 text_White textbold ">{vid.desc}</p>
                    <p className="col-md-8  textbold duration">
                      {vid.duration}
                    </p>

                    <div className="row  text_White  ">
                      <div className="col-md-7">
                        <div className="row ">
                          <span className="col-md-2  m-auto  text-white ">
                            <Link to="/Playlist" state={{ id: vid }}>
                              <PlayCircleFilledWhiteIcon className="playicon cursor" />{" "}
                            </Link>
                          </span>
                          <span className="col-md-1 m-auto  text-white">
                            Play
                          </span>
                          <div className="col-md-9 m-auto">
                            <div className="row  ">
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <ImFilm className="addicons lefts fnt30  " />
                                <button className="col-md-3  details trailer">
                                  Trailer
                                </button>
                              </span>

                              <span className="col-md-2 m-auto fnt14 watchlist relativeP ">
                                <AddIcon className="addicons lefts fnt30  " />
                                <button className="watch1">Watchlist</button>
                              </span>
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <ThumbUpAltOutlinedIcon
                                  onClick={notifyLikes}
                                  className="addicons fnt30  "
                                />
                                <button className="details like">Like</button>
                              </span>
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <AiOutlineDislike
                                  onClick={notifyDislike}
                                  className="addicons lefts fnt30  "
                                />
                                <button className="details dislike">
                                  Dislike
                                </button>
                              </span>
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <DownloadForOfflineOutlinedIcon className="addicons fnt30  " />
                                <button className="details downlaod">
                                  Dowload Episodes 1
                                </button>
                              </span>
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <CelebrationOutlinedIcon className="addicons fnt30  " />
                                <button className="details party">
                                  Watch Party
                                </button>
                              </span>
                              <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                                <ShareOutlinedIcon
                                  onClick={() => setIsShare(true)}
                                  className="addicons fnt30  "
                                />
                                <button className="details">Share</button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="row m-auto">
        <div className="col-md-5"></div>
        <div className="col-md-2">
          <div className="d-flex">
            <p
              className={`cursor text_White textbold m-auto ${
                WachedMovie && WatchedIndex === 0 ? "activeWathced" : ""
              }`}
              onClick={() => handleSelect(0)}
            >
              Related
            </p>
            <p
              className={`cursor text_White textbold m-auto ${
                WachedMovie & (WatchedIndex === 1) ? "activeWathced" : ""
              }`}
              onClick={() => handleSelect(1)}
            >
              Details
            </p>
          </div>
        </div>
        <div className="col-md-5"></div>
      </div>
      {WachedMovie && WatchedIndex === 0 && (
        <div className="row m-auto relativeP">
          <p className="text_White textbold">Customers also watched</p>

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

          {mostvieved.slice(currentSlide, currentSlide + 4).map((ele) => (
            <div key={ele.id} className="col-md-3 m-auto  movie-container  ">
              <img
                src={ele.movie}
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
                  {ele.title}-{ele.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {WachedMovie && WatchedIndex === 1 && (
        <div className="row m-auto relativeP activeWathced">
          <p className="text_White textbold">More Info</p>
          <p className="text_White textbold">Content advisory</p>
          <p className="text_White textbold">
            Foul language, alcohol use, tobacco depictions
          </p>
          <p className="text_White textbold">Audio languages</p>
          <p className="text_White textbold">हिन्दी</p>
        </div>
      )}
      {like && (
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
      )}

      {disliked && (
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
      )}
      <div className="row">
        <Modal
          className="row"
          show={isShare}
          onHide={() => setIsShare(false)}
          style={{ position: "absolute", top: "10%" }}
        >
          <Modal.Header className="row bg-dark ">
            <span className="col-md-1 m-auto text_White">Share</span>
            <span className="col-md-8 m-auto "></span>
            <span className="col-md-1 m-auto text_White">
              <CloseIcon onClick={() => setIsShare(false)} className="cursor" />
            </span>
          </Modal.Header>
          <Modal.Body className="row bg-dark text_White">
            <div className="row">
              <div className="col-md-3">
                <div className="row text-center m-auto">
                  <span>
                    <MailOutlineIcon onClick={redirectToEmail} />
                  </span>
                  <p>Email</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="row text-center m-auto">
                  <span>
                    <FacebookIcon onClick={redirectToFacebook} />
                  </span>
                  <p>Facebook</p>
                </div>
              </div>{" "}
              <div className="col-md-3">
                <div className="row text-center m-auto">
                  <span>
                    <TwitterIcon onClick={redirectToTwitter} />
                  </span>
                  <p>Twitter</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="row text-center m-auto">
                  <span>
                    <PinterestIcon onClick={redirectToPinterest} />
                  </span>
                  <p>Pinterest</p>
                </div>
              </div>
            </div>
            <Button className="col-md-12 m-auto copylink  text-center  p-2">
              Copy Link
            </Button>
          </Modal.Body>
        </Modal>
      </div>

      <div className="row m-auto">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
