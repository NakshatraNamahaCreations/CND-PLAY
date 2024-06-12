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
import ReactPlayer from "react-player";
import RegisterPage from "./DataApi/Register";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import CaroselComponent from "./carosel";
import axios from "axios";
import PurchaseContent from "./PurchaseContent";
import Moment from "react-moment";
export default function WatchVideoMode() {
  const location = useLocation();
  const idd = location.state ? location.state.id : null;

  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [ContentData, setContentData] = useState([]);
  const [Watching, setWatching] = useState([]);
  const [mostvieved, setMostViewedM] = useState([]);
  const [WachedMovie, setWachedMovie] = useState(false);
  const [WatchedIndex, setWatchedIndex] = useState(0);
  const [disliked, setdisliked] = useState(false);
  const [like, setlike] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [ShowPlan, setShowPlan] = useState(false);
  const [Rating, setRating] = useState(false);

  useEffect(() => {
    fetchData();
  }, [idd]);

  const navigate = useNavigate();

  const notifyLikes = () => {
    setdisliked(true);
    toast("Great! well recommend more like this");
  };
  const notifyDislike = () => {
    setlike(true);
    toast("Content added in your watchlist");
  };

  const handleSelect = (index) => {
    setWachedMovie(true);
    setWatchedIndex(index);
  };
  useEffect(() => {
    setWachedMovie(true);
  }, []);

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

  const fetchData = async () => {
    let DataById = await ContentsPageService.getByContenId(idd);
    let mostvieved = await ContentsPageService.fetchContentsAllList();
    let ContinewWatching = await RegisterPage.GetUserById(getlocalStorage?._id);

    let data = mostvieved?.filter((contele) => {
      if (DataById?.section === contele?.section) {
        return DataById?.genres?.map((gener) => {
          contele?.genres?.filter((ele) => ele?.includes(gener));
        });
      }
    });
    let ContinewWatchingData = ContinewWatching?.continueWatching?.find(
      (ele) => ele.contentId === DataById?._id
    );

    setContentData(DataById);
    setWatching(ContinewWatchingData);
    setMostViewedM(data);
  };
  // console.log(PurchaseInfo.purchasedcontent.ActiveContent.find((ele)=>ele.content_id),"PurchaseInfo")
  const handleLikeMovie = (idd) => {
    const updatedLikes = { content_id: idd, userid: getlocalStorage?._id };
    let initialPostData = { Likes: updatedLikes };
    if (updatedLikes.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage?._id)
        .then((response) => {
          notifyLikes();
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };

  const handleRatethisMovie = async (Item) => {
    try {
      await ContentsPageService.ContentRating(Item);
      notifyLikes();
    } catch (error) {
      console.error(error);
    }
  };
  const handlePlayListview = async (Item, vidtype) => {
    try {
      if (vidtype === "Trailer") {
        navigate("/Playlist", { state: { Item: Item, type: vidtype } });
      }
      if (vidtype === "movie") {
        let ContinewWatch = await RegisterPage.GetUserById(getlocalStorage?._id);
        const isContentPurchased =
          await ContinewWatch?.purchasedcontent?.ActiveContent?.find(
            (ele) => ele.content_id === Item._id
          );
        if (isContentPurchased === undefined) {
          setpurchaseid(ContentData._id);
          setPurchaceContent(true);
          navigate("/Playlist", { state: { Item: Item, type: vidtype } });
        } else {
          navigate("/Playlist", { state: { Item: Item, type: vidtype } });
        }
      }
    } catch (error) {
      console.error("Error checking purchase status:", error);
      alert("An error occurred while checking the purchase status.");
    }
  };

  const handleAddToWishlist = (idd) => {
    const updatedWishlist = { content_id: idd, userid: getlocalStorage?._id };
    let initialPostData = { wishlist: updatedWishlist };
    if (updatedWishlist.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage?._id)
        .then((response) => {
          notifyDislike();
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };

  const [purchaseid, setpurchaseid] = useState(null);
  const [purchaceContentData, setpurchaceContentData] = useState([]);
  const [purchaceContent, setPurchaceContent] = useState(false);
  const handlePurchaceContent = async (idd) => {
    setpurchaseid(idd);
    setPurchaceContent(true);
  };
  const incrementViews = async (Item) => {
    try {
      await ContentsPageService.postViews(Item);
      navigate("/viewdetails-about-movie", { state: { id: Item } });
    } catch (error) {
      console.error(error);
    }
  };

  const [Purchades, setPurchades] = useState(false);
  const handlePurchaseContenet = async (id, validity) => {
    try {
      const currentDate = new Date();
      const validityInHours = validity * 24;
      const expirationDate = new Date(
        currentDate.getTime() + validityInHours * 60 * 60 * 1000
      );

      const ContentData = {
        purchaseddate: currentDate.toISOString(),
        expiryddate: expirationDate.toISOString(),
        content_id: purchaseid,
      };

      const config = {
        url: `https://api.cndplay.com/api/authenticateRoute/purchasecontent/${getlocalStorage?._id}`,
        method: "put",
        data: ContentData,
      };

      const response = await axios(config);

      // Handle different response status codes
      if (response.status === 200) {
        alert("You have purchased successfully.");
        window.location.reload("");
        // initiatePayment();
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while processing your request.");
    }
  };
  const handlePlanPurchase = async (platy) => {
    let initialPostData = { plan: platy };
    await RegisterPage.update(initialPostData, getlocalStorage?._id)
      .then((response) => {
        toast(`${platy}  Purchased`);
        setPurchades(true);
        window.location.reload("");
      })
      .catch((error) => {
        // console.log("Error updating user ");
      });
  };

  return (
    <div className="col-md-12  bg-mg">
      <div className="col-md-12">
        <div className="watchmovie-overlay"></div>
        <>
          <div className="row m-auto">
            <img alt="" width="100%" height="600" src={ContentData?.banner} />
          </div>

          {/* {hideInfo && ( */}
          <div className="row m-auto">
            <div className="col-md-12 informat  m-auto">
              <div className="row ms-4">
                <>
                  <h6 className="text_White mt-5">{ContentData?.title}</h6>
                  <h1 className="text_White textbold mt-5 mb-5 ">
                    {ContentData?.subTitel}
                  </h1>
                  <p className="col-md-8 text_White textbold ">
                    {ContentData?.storyline}
                  </p>
                </>
                <div className="row  text_White  ">
                  <div className="col-md-4">
                    <div className="row ">
                      <span className="col-md-2  m-auto  text-white ">
                        <PlayCircleFilledWhiteIcon
                          onClick={() =>
                            handlePlayListview(ContentData, "movie")
                          }
                          className="playicon cursor"
                        />{" "}
                      </span>
                      <span className="col-md-1 m-auto  text-white">Play</span>
                      <div className="col-md-9 m-auto">
                        <div className="row  ">
                          <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                            <ImFilm
                              className="addicons lefts fnt30  "
                              onClick={() =>
                                handlePlayListview(ContentData, "Trailer")
                              }
                            />
                            <button className="col-md-3  details trailer">
                              Trailer
                            </button>
                          </span>

                          <span className="col-md-2 m-auto fnt14 watchlist relativeP ">
                            <AddIcon
                              onClick={() =>
                                handleAddToWishlist(ContentData?._id)
                              }
                              className="addicons lefts fnt30  "
                            />
                            <button className="watch1">Watchlist</button>
                          </span>
                          <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                            <ThumbUpAltOutlinedIcon
                              onClick={() => handleLikeMovie(ContentData?._id)}
                              className="addicons fnt30  "
                            />
                            <button className="details like">Like</button>
                          </span>

                          {/* <span className="col-md-2 m-auto fnt14 detailsList relativeP ">
                            <ShareOutlinedIcon
                              onClick={() => setIsShare(true)}
                              className="addicons fnt30  "
                            />
                            <button className="details">Share</button>
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8"></div>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </>
      </div>
      <div className="row m-auto mt-5 mb-5">
        <div className="col-md-5"></div>
        <div className="col-md-2">
          <div className="d-flex">
            <p
              className={`cursor text_White textbold m-auto ${
                (WachedMovie && WatchedIndex === 0) || WatchedIndex === null
                  ? "activeWathced"
                  : ""
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

      <PurchaseContent
        purchaceContent={purchaceContent}
        setPurchaceContent={setPurchaceContent}
        purchaceContentData={purchaceContentData}
        purchaseid={purchaseid}
        handlePurchaseContenet={handlePurchaseContenet}
        handlePlanPurchase={handlePlanPurchase}
      />

      {WatchedIndex === 0 && (
        <div className="row m-auto relativeP">
          <p className="text_White textbold">Customers also watched</p>

          {mostvieved?.length > 0 && (
            <>
              <CaroselComponent
                data={mostvieved}
                incrementViews={incrementViews}
                handleAddToWishlist={handleAddToWishlist}
                handlePurchaceContent={handlePurchaceContent}
              />
            </>
          )}
        </div>
      )}

      {WatchedIndex === 1 && (
        <div className="row m-auto relativeP activeWathced">
          <p className="text_White textbold">More Info</p>
          <p className="text_White textbold">Content advisory</p>
          <p className="text_White textbold">{ContentData.rating}</p>
          <p className="text_White textbold col-md-4">
            <div className="row">
              <div className="col-md-2">
                <Moment className="me-1" format="YYYY">
                  {ContentData.publish}
                </Moment>
                <Moment className="me-1" format="MMM">
                  {ContentData.publish}
                </Moment>
                <Moment className="me-1" format="D">
                  {ContentData.publish}
                </Moment>
              </div>
              <div className="col-md-3">{ContentData.duration}</div>
              <div className="col-md-6">
                {ContentData?.genres?.map((Ele) => (
                  <span className="me-2">{Ele}</span>
                ))}{" "}
              </div>
              <div className="col-md-1"></div>
            </div>
          </p>

          <p className="text_White textbold">Audio languages</p>
          <p className="text_White textbold">অসমীয়া</p>
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
