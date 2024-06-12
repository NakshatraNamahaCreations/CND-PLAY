import React, { useEffect, useState, useRef } from "react";
import ContentsPageService from "./DataApi/Api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { ImFilm } from "react-icons/im";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";
import RegisterPage from "./DataApi/Register";
import CheckIcon from "@mui/icons-material/Check";
import Moment from "react-moment";
import axios from "axios";
import PurchaseContent from "./PurchaseContent";
import Slider from "react-slick";
import SeriesPageService from "./DataApi/SeriesApi";
import StarIcon from "@mui/icons-material/Star";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Modal from "react-bootstrap/Modal";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button } from "react-bootstrap";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ReactStarsRating from "react-awesome-stars-rating";
import { RiMovieLine } from "react-icons/ri";

export default function Episode() {
  const location = useLocation();
  const idd = location.state ? location.state.id : null;
  console.log(idd, "idd");
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [ContentData, setContentData] = useState([]);
  const [Watching, setWatching] = useState([]);
  const [mostvieved, setMostViewedM] = useState([]);
  const [WachedMovie, setWachedMovie] = useState(false);
  const [WatchedIndex, setWatchedIndex] = useState(0);
  const [disliked, setdisliked] = useState(false);
  const [like, setlike] = useState(false);
  const [EpisodesData, setEpisodesData] = useState([]);
  const [purchaseid, setpurchaseid] = useState(null);

  const [isShare, setIsShare] = useState(false);
  const [Ratevalue, setRatevalue] = useState(0);
  const [Rating, setRating] = useState(false);
  const [isRate, setisRate] = useState();
  useEffect(() => {
    fetchData();
  }, [idd]);
  useEffect(() => {
    setWachedMovie(true);
    let data = ContentData?.ContentRating?.find(
      (ele) => ele?.userId === getlocalStorage?._id
    );

    setisRate(data);
  }, [ContentData]);
  const navigate = useNavigate();

  // const notifyLikes = () => {
  //   setdisliked(true);
  //   toast("Great! well recommend more like this");
  // };
  // const notifyDislike = () => {
  //   setlike(true);
  //   toast("Your Content has been Added to the wishlist.");
  // };

  const handleSelect = (index) => {
    setWachedMovie(true);
    setWatchedIndex(index);
  };
  useEffect(() => {
    setWachedMovie(true);
  }, []);
  const [Wishlist, setWishlist] = useState(false);

  const [checkPlan, setCheckPlan] = useState(null);
  const [checkPurchase, setCheckPurchase] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const [WishlistContent, setWishlistContent] = useState();

  const handleSubmitRating = async (id) => {
    try {
      const response = await axios.post(
        `https://api.cndplay.com/api/contents/countratings/${id}`,
        {
          userId: getlocalStorage?._id,
          rate: Ratevalue,
        }
      );
      if (response.status === 200) {
        toast.success("Thank you for rating the movie!", {});
        // setRatevalue(null);
        setRating(true);
        window.location.assign("/");
      }
    } catch (error) {
      // console.error("Error:", error.message);
      // Handle error (e.g., display to user)
    }
  };

  const fetchData = async () => {
    let DataById = await ContentsPageService.getByContenId(idd);
    let mostvieved = await ContentsPageService.fetchContentsAllList();

    setpurchaceContentData(mostvieved);
    let ContinewWatching = await RegisterPage.GetUserById(getlocalStorage?._id);
    let Episode = await SeriesPageService.fetchEpisodes();
    let data = mostvieved?.filter((contele) => {
      if (DataById?.section === contele?.section) {
        return DataById?.genres?.map((gener) =>
          contele?.genres?.filter((ele) => ele?.includes(gener))
        );
      }
    });
    let ContinewWatchingData = ContinewWatching?.continueWatching?.find(
      (ele) => ele.contentId === DataById?._id
    );
    let Wishlist = await ContentsPageService.getWishList(getlocalStorage?._id);
    let filteredData = Episode.filter((ele) => ele?.series_id === idd);

    setWishlistContent(Wishlist);
    setEpisodesData(filteredData);
    setContentData(DataById);
    setWatching(ContinewWatchingData);
    setMostViewedM(data);
  };

  // const [checkPlan, setCheckPlan] = useState(null);
  // const [checkPurchase, setCheckPurchase] = useState(null);

  useEffect(() => {
    if (ContentData && idd) {
      fetchPlanData();
    }
  }, [ContentData, idd]);

  const fetchPlanData = async () => {
    try {
      let currentDate = new Date();
      let ContinewWatch = await RegisterPage.GetUserById(getlocalStorage?._id);
      if (!ContinewWatch) {
        console.error("User not found");
        return;
      }

      const isContentPurchased = ContinewWatch.purchasedcontent.some(
        (ele) =>
          ele.content_id === ContentData._id &&
          new Date(ele.expiryddate) > currentDate
      );

      const hasExpiredPlans = ContinewWatch.plan.some(
        (ele) =>
          new Date(ele.expiryddate) > currentDate && ele.planType !== "Silver"
      );

      setCheckPlan(hasExpiredPlans);
      setCheckPurchase(isContentPurchased);
    } catch (error) {
      console.error("Error fetching plan data:", error);
    }
  };

  // console.log(PurchaseInfo.purchasedcontent.ActiveContent.find((ele)=>ele.content_id),"PurchaseInfo")
  const handleLikeMovie = (idd) => {

    if (!getlocalStorage) {
      window.location.assign("/login");
      return;
    }
    const updatedLikes = { content_id: idd, userid: getlocalStorage?._id };
    let initialPostData = { Likes: updatedLikes };
    if (updatedLikes.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage?._id)
        .then((response) => {
          setWishlist(true);
          toast(response.data.message, {
            icon: "👍",
          });
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };

  const handlePlayListview = async (Item, vidtype, ContentData) => {
    if (!getlocalStorage?._id) {
      window.location.assign("/login");
    }
    try {
      if (checkPlan) {
        navigate("/Playlist", { state: { Item: Item, type: "series" } });
      }

      if (ContentData.type === "FREE") {
        navigate("/Playlist", {
          state: {
            Item: Item,
            type: vidtype,
            contentType: ContentData.type,
          },
        });
      }

      if (!checkPurchase) {
        await setpurchaseid(ContentData._id);
        setPurchaceContent(true);
        await ContentsPageService.postViews(Item._id);
      } else {
        navigate("/Playlist", {
          state: {
            Item: Item,
            type: vidtype,
            contentType: ContentData.type,
          },
        });
      }
    } catch (error) {
      alert("An error occurred while checking the purchase status.");
    }
  };

  const handleTailer = async (ContentData, vidtype) => {
    navigate("/Playlist", {
      state: {
        Item: ContentData,
        type: vidtype,
        contentType: ContentData?.type,
      },
    });
  };

  const handleAddToWishlist = (idd) => {
    if (!getlocalStorage) {
      window.location.assign("/login");
      return;
    }
    const updatedWishlist = { content_id: idd, userid: getlocalStorage?._id };
    let initialPostData = { wishlist: updatedWishlist };
    if (updatedWishlist.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage?._id)
        .then((response) => {
          setWishlist(true);
          toast(response.data.message);
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };

  const [purchaceContentData, setpurchaceContentData] = useState([]);
  const [purchaceContent, setPurchaceContent] = useState(false);
  const handlePurchaceContent = async (idd) => {
    setpurchaseid(idd);
    setPurchaceContent(true);
  };
  const [paymentError, setPaymentError] = useState(null);
  const handlePayment = async (item) => {
    const txnid = `Txn${Date.now()}`;
    const paymentData = {
      amount: item.amount,
      productinfo: item.storyline,
      firstname: getlocalStorage.username,
      email: getlocalStorage.email,
      phone: getlocalStorage.phone,
      surl: `https://api.cndplay.com/api/success/${txnid}/${getlocalStorage._id}/${item._id}/${item.validity}/${item.amount}`,
      furl: "https://www.cndplay.com/failure",
      pg: "UPI",
      bankcode: "UPI",
      vpa: "8951592630@ybl",
      txnid: txnid,
    };

    try {
      const response = await fetch("https://api.cndplay.com/api/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      const result = await response.json();
      redirectToPayU(result.paymentUrl, result.params);
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      setPaymentError("Payment Initialization Error");
    }
  };

  const redirectToPayU = (paymentUrl, params) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentUrl;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };

  const [Purchades, setPurchades] = useState(false);
  // const handlePurchaseContenet = async (id, validity) => {
  //   try {
  //     const currentDate = new Date();
  //     const validityInHours = validity * 24;
  //     const expirationDate = new Date(
  //       currentDate.getTime() + validityInHours * 60 * 60 * 1000
  //     );

  //     const ContentData = {
  //       purchaseddate: currentDate.toISOString(),
  //       expiryddate: expirationDate.toISOString(),
  //       content_id: purchaseid,
  //     };

  //     const config = {
  //       url: `https://api.cndplay.com/api/authenticateRoute/purchasecontent/${getlocalStorage?._id}`,
  //       method: "put",
  //       data: ContentData,
  //     };

  //     const response = await axios(config);
  //     if (response.status === 200) {
  //       alert("You have purchased successfully.");
  //       window.location.reload("");
  //     }
  //   } catch (err) {
  //     // console.error("Error:", err);
  //     alert("An error occurred while processing your request.");
  //   }
  // };

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

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 >= EpisodesData?.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 1 < 0 ? EpisodesData?.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  const castSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(6, ContentData?.cast?.length || 0),
    slidesToScroll: 1,
    centerMode: false,
  };

  const crewSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(6, ContentData?.creaw?.length || 0),
    slidesToScroll: 1,
    centerMode: false,
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
      "https://x.com/coldplay?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor";
  };

  const [ratingCount, setRatingCount] = useState(0);

  const formatRatingCount = (count, isOutOfFive = false) => {
    if (isOutOfFive) {
      return Math.ceil(count / (1388.6 / 5));
    } else {
      return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
    }
  };
  useEffect(() => {
    const ratingList = ContentData?.ContentRating;
    if (ratingList && ratingList.length > 0) {
      const totalRating = ratingList?.reduce((acc, curr) => acc + curr.rate, 0);
      const averageRating = (totalRating / ratingList.length).toFixed(1);
      setRatingCount(averageRating);
    } else {
      setRatingCount(0); // No ratings yet, so set rating count to 0
    }
  }, [ContentData]);

  const [buttonText, setButtonText] = useState("Copy Link");

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => setButtonText("Copy Link"), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const onChange = (value) => {
    // console.log(`React Stars Rating value is ${value}`);
    setRatevalue(value);
  };
  const handleRatingOpen = () => {
    if (!getlocalStorage) {
      return window.location.assign("/login")
    }
    setRating(true)
  }
  return (
    <div className="col-md-12  bg-mg">
      {Wishlist && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Bounce}
          width={200}
        />
      )}
      <div className="col-md-12">
        <div className="watchmovie-overlay"></div>
        <>
          <div className="row m-auto">
            <img alt="" width="100%" height="600" src={ContentData?.banner} />
          </div>

          <div className="row m-auto">
            <div className="col-md-12 informat  m-auto">
              <div className="row ms-4">
                <>
                  <h1 className="text_White mt-5">{ContentData?.title}</h1>
                  <div className="row">
                    <div className="col-md-6 d-flex">
                      <div className="text_light me-2">
                        <span className="text_light me-2 textbold">
                          {" "}
                          Published Date
                        </span>
                        <Moment className="text_light textbold " format="YYYY">
                          {ContentData?.publish}
                        </Moment>{" "}
                      </div>
                      <span className="text_light me-2 textbold">|</span>
                      <span className="text_light me-2">Assamese</span>
                      <span className="text_light me-2 textbold">|</span>
                      <div className="col-md-3 text_light">
                        {ContentData?.genres?.map((Ele) => (
                          <span className="me-2">{Ele}</span>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-6"></div>
                  </div>
                  <h1 className="text_White textbold ">
                    {ContentData?.subTitel}
                  </h1>
                  <p
                    className="col-md-8 text_White textbold mb-3"
                    style={{ maxHeight: "80px" }}
                  >
                    {ContentData?.storyline}
                  </p>
                </>
                <div className="row  text_White  ">
                  <div className="col-md-7">
                    <div className="row m-auto">
                      {!checkPlan && (
                        <div className="col-md-2 m-auto p-0">
                          <a href="/plan">
                            <button
                              className="row p-3"
                              style={{
                                borderRadius: "10px",
                                backgroundColor: "#33373d",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                              }}
                            >
                              <p className="text-white m-auto">BUY PLAN</p>
                            </button>
                          </a>
                        </div>
                      )}

                      {!checkPlan && !checkPurchase && (
                        <div className="col-md-2 m-auto p-0">
                          <button
                            onClick={() =>
                              handlePurchaceContent(ContentData?._id)
                            }
                            className="row p-1"
                            style={{
                              borderRadius: "10px",
                              backgroundColor: "#33373d",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                            }}
                          >
                            <p className="text-white m-0">Rent Series</p>
                            <p className="text-white m-0">
                              ₹{ContentData?.amount}
                            </p>
                          </button>
                        </div>
                      )}

                      <div className="col-md-7 m-auto">
                        <div className="row">
                          <span className="col-md-2 m-auto fnt14 detailsList relativeP">
                            <RiMovieLine
                              className="addicons lefts fnt30"
                              onClick={() =>
                                handleTailer(ContentData, "Trailer")
                              }
                            />
                            <button className="col-md-3 details trailer">
                              Trailer
                            </button>
                          </span>

                          <span className="col-md-2 m-auto fnt14 watchlist relativeP">
                            {WishlistContent?.some(
                              (wishl) => wishl?.content_id === ContentData?._id
                            ) ? (
                              <CheckIcon
                                className="addicons"
                                onClick={() =>
                                  handleAddToWishlist(ContentData?._id)
                                }
                              />
                            ) : (
                              <AddIcon
                                className="addicons"
                                onClick={() =>
                                  handleAddToWishlist(ContentData?._id)
                                }
                              />
                            )}
                            <button className="watch1">Watchlist</button>
                          </span>
                          <span className="col-md-2 m-auto fnt14 detailsList relativeP">
                            <ThumbUpAltOutlinedIcon
                              onClick={() => handleLikeMovie(ContentData?._id)}
                              className="addicons fnt30"
                            />
                            <button className="details like">Like</button>
                          </span>

                          <span className="col-md-2 m-auto fnt14 detailsList relativeP">
                            <ShareOutlinedIcon
                              onClick={() => setIsShare(true)}
                              className="addicons fnt30"
                            />
                            <button className="details">Share</button>
                          </span>
                          {!isRate && (
                            <span className="col-md-2 me-2 m-auto fnt14 detailsList relativeP">
                              <StarBorderIcon
                                onClick={handleRatingOpen}
                                className="addicons fnt30"
                              />
                              <button className="details">
                                Rate {ContentData?.section}
                              </button>
                            </span>
                          )}

                          <div
                            className="col-md-4 m-auto fnt14 p-2"
                            style={{
                              borderRadius: "10px",
                              backgroundColor: "white",
                              width: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <StarIcon
                              style={{ color: "green", fontSize: "15px" }}
                            />
                            <span className="text-dark">{ratingCount}</span>
                            <span className="text-dark">
                              (
                              {formatRatingCount(
                                ContentData?.ContentRating?.length
                              )}
                              )
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="row m-auto mt-5 mb-5">
        <div className="col-md-5"></div>
        <div className="col-md-2">
          <div className="d-flex">
            <p
              className={`cursor text_White textbold m-auto ${(WachedMovie && WatchedIndex === 0) || WatchedIndex === null
                ? "activeWathced"
                : ""
                }`}
              onClick={() => handleSelect(0)}
            >
              Episodes
            </p>
            <p
              className={`cursor text_White textbold m-auto ${WachedMovie & (WatchedIndex === 1) ? "activeWathced" : ""
                }`}
              onClick={() => handleSelect(1)}
            >
              Details
            </p>
          </div>
        </div>
        <div className="col-md-5"></div>
      </div>
      {paymentError && <p>{paymentError}</p>}
      <PurchaseContent
        purchaceContent={purchaceContent}
        setPurchaceContent={setPurchaceContent}
        purchaceContentData={purchaceContentData}
        purchaseid={purchaseid}
        handlePayment={handlePayment}
        handlePlanPurchase={handlePlanPurchase}
      />

      {WatchedIndex === 0 && (
        <div className="row m-auto relativeP">
          <p className="text_White textbold">{ContentData?.title}</p>

          {mostvieved?.length > 0 && (
            <>
              <div className="col-md-12 relativeP">
                <div className="mediaScreen">
                  <div className="banner">
                    {EpisodesData?.slice(
                      startIndex,
                      startIndex + itemsPerPage
                    )?.map((item, index) => {
                      const isWishlist = WishlistContent?.some(
                        (wishl) => wishl?.content_id === item?._id
                      );
                      return (
                        <div key={item?._id}>
                          <div className="mediaDiv">
                            <img
                              src={item.banner}
                              alt={item?.name}
                              className="mediaImg"
                            />

                            <div className="displayhoverScreen">
                              <div className="hoverScreen">
                                <img
                                  className="mediaHoverImg"
                                  alt=""
                                  src={item.banner}
                                />
                                <div className="hoverData">
                                  <div className="hoverHeading">
                                    <p className="title mt-4">{item?.title}</p>
                                  </div>
                                  <div className="row  ">
                                    <div className="col-md-2  text_White ">
                                      <div className="row">
                                        <div className="col-md-6 m-auto">
                                          <PlayCircleFilledWhiteIcon
                                            onClick={() =>
                                              handlePlayListview(
                                                item,
                                                "series",
                                                ContentData
                                              )
                                            }
                                            className="fnt35 playicon1"
                                          />{" "}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6"></div>
                                    {/* <div className="col-md-2 text_White m-auto relativeP slidewatch">
                                      {isWishlist ? (
                                        <CheckIcon
                                          className="addicon"
                                          onClick={() =>
                                            handleAddToWishlist(item?._id)
                                          }
                                        />
                                      ) : (
                                        <AddIcon
                                          className="addicon"
                                          onClick={() =>
                                            handleAddToWishlist(item?._id)
                                          }
                                        />
                                      )}
                                      <button className="p-1 mt-1 fnt12 sliderwatch1  textbold ">
                                        watchlist
                                      </button>
                                    </div> */}

                                    {"  "}
                                  </div>

                                  <div className="footerScreen row">
                                    <p className="row ">
                                      <span className="col-md-2 dicription">
                                        <Moment format="YYYY">
                                          {item?.publish}
                                        </Moment>
                                      </span>
                                      <span className="col-md-6 dicription">
                                        {item?.duration}{" "}
                                      </span>

                                      <span
                                        style={{
                                          width: "fitContent",
                                          backgroundColor: "#33373d",
                                          borderRadius: "10px",
                                        }}
                                        className="col-md-4 p-0 text-center"
                                      >
                                        {ContentData?.rating}
                                      </span>
                                    </p>
                                    <p className="row dicription">
                                      {item?.episodes_name}
                                    </p>

                                    <p className="dicription row">
                                      {`${item?.description}`?.slice(0, 90)}
                                      ...
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {EpisodesData?.length >= 4 && (
                  <>
                    <button
                      onClick={handlePrev}
                      disabled={startIndex === 0}
                      className="slidebtn1 text-white"
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={
                        startIndex + itemsPerPage >= EpisodesData?.length
                      }
                      className="slidebtn2 text-white"
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </div>
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

          <div className="row">
            <p className="text_White textbold">Cast</p>
            <div className="container p-4 m-auto">
              <Slider {...castSettings}>
                {ContentData?.cast?.map((ele) => (
                  <div className="col-md-3 m-auto" key={ele.actor}>
                    <img
                      className=""
                      style={{ borderRadius: "100%" }}
                      src={ele.actorProfile}
                      height={100}
                      width={100}
                      alt=""
                    />
                    <p className="text_White mt-2 row m-auto">{ele.actor}</p>
                    <p className="text_White textbold row m-auto">
                      {ele.charcter}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="row">
            <p className="text_White textbold">Creaw</p>
            <div className="row ">
              <Slider {...crewSettings}>
                {ContentData?.creaw?.map((ele) => (
                  <div className="col-md-3" key={ele.name}>
                    <img
                      className=""
                      style={{ borderRadius: "100%" }}
                      src={ele.profile}
                      height={100}
                      width={100}
                      alt=""
                    />
                    <p className="text_White mt-2 row m-auto">{ele.Role}</p>
                    <p className="text_White textbold">{ele.name}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <p className="text_White textbold">Audio languages</p>
          <p className="text_White textbold">অসমীয়া</p>
        </div>
      )}

      <Modal
        className="row"
        show={isShare}
        onHide={() => setIsShare(false)}
        style={{ position: "absolute", top: "50%" }}
      >
        <Modal.Header className="row bg-dark">
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
            {/* <div className="col-md-3">
                  <div className="row text-center m-auto">
                    <span>
                      <PinterestIcon onClick={redirectToPinterest} />
                    </span>
                    <p>Pinterest</p>
                  </div>
                </div> */}
          </div>

          <Button
            className="col-md-12 m-auto copylink text-center p-2"
            onClick={() => copyToClipboard("https://cndplay.com")}
          >
            {buttonText}
          </Button>
        </Modal.Body>
      </Modal>

      <div className="row">
        <Modal
          className="row"
          show={Rating}
          style={{ position: "absolute", top: "10%" }}
        >
          <Modal.Body className="row bg-white shadow-lg text_White rounded">
            <div className="text-center">
              <p className=" fw-bold" style={{ color: "#e2b616" }}>
                RATE THIS
              </p>
              <p className="text-dark">{ContentData?.title}</p>
              <ReactStarsRating onChange={onChange} value={Ratevalue} />
              <p className="text-dark mt-3">{Ratevalue}</p>
            </div>
            <button
              disabled={Ratevalue < 0 ? true : false}
              className={`${Ratevalue
                ? "ratehisbg col-md-4  m-auto "
                : "ratehis col-md-2  m-auto"
                }`}
              onClick={() => handleSubmitRating(ContentData?._id)}
            >
              Rate
            </button>
          </Modal.Body>
        </Modal>
      </div>

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
      {Rating && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      )}
      <div className="row m-auto">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
