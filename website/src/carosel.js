import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import ContentsPageService from "./DataApi/Api";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import Moment from "react-moment";
import RegisterPage from "./DataApi/Register";

export default function CaroselComponent({ data, handleAddToWishlist }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const [WishlistContent, setWishlistContent] = useState();
  const navigate = useNavigate();

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 >= data?.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 1 < 0 ? data?.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [USerData, setUSerData] = useState();

  const fetchData = async () => {
    let CheckPurchase = await RegisterPage.GetUserById(getlocalStorage?._id);
    let Wishlist = await ContentsPageService.getWishList(getlocalStorage?._id);
    setWishlistContent(Wishlist);
    setUSerData(CheckPurchase);
  };

  const handleNavigate = (item) => {
    const path = item?.section === "movie" ? "/viewdetails-about-movie" : "/viewdetails-about-series";
    navigate(path, { state: { id: item?._id } });
  };

  const handlePlay = (item) => {
    if (item?.section === "movie") {
      const path = "/Playlist";
      navigate(path, {
        state: { Item: item, contentType: item?.type, type: item?.section },
      });
      if (item?.section === "series") {
        navigate("/viewdetails-about-series", { state: { id: item?._id } });
      }
    }
  };

  const handleMore = (item) => {
    const path = item?.section === "movie" ? "/viewdetails-about-movie" : "/viewdetails-about-series";
    navigate(path, { state: { id: item?._id } });
  };

  return (
    <div className="row relativeP m-auto">
      <div className="mediaScreen">
        <div className="banner">
          {data
            ?.slice(startIndex, startIndex + itemsPerPage)
            ?.map((item, index) => {
              const isWishlist = WishlistContent?.some(
                (wishl) => wishl?.content_id === item?._id
              );
              let currentDate = new Date();

              const hasExpiredPlans = USerData?.plan?.some(
                (ele) =>
                  new Date(ele.expiryddate) > currentDate &&
                  ele.planType !== "Silver"
              );

              return (
                <div key={item?._id}>
                  <div className="mediaDiv">
                    <img
                      src={item?.banner}
                      alt={item?.name}
                      className="mediaImg"
                    />

                    <div className="displayhoverScreen">
                      <div className="hoverScreen" style={{ height: "280px" }}>
                        <img
                          className="mediaHoverImg"
                          src={item?.banner}
                          alt=""
                          style={{ cursor: "pointer" }}
                          onClick={() => handleNavigate(item)}
                        />

                        <div className="hoverData">
                          <div className="hoverHeading">
                            <p className="title mt-4">{item?.title}</p>
                          </div>
                          <div className="row">
                            <div className="col-md-2 text_White">
                              <div className="row">
                                <div className="col-md-6 m-auto">
                                  {USerData?.purchasedcontent?.some(
                                    (ele) =>
                                      (ele?.content_id === item?._id &&
                                        new Date(ele.expiryddate) >
                                          currentDate) ||
                                      hasExpiredPlans
                                  ) ? (
                                    <PlayCircleFilledWhiteIcon
                                      style={{ cursor: "pointer" }}
                                      className="fnt35 playicon1"
                                      onClick={() => handlePlay(item)}
                                    />
                                  ) : (
                                    <PlayCircleFilledWhiteIcon
                                      style={{ cursor: "pointer" }}
                                      className="fnt35 playicon1"
                                      onClick={() => handleNavigate(item)}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-2 text_White m-auto relativeP slidewatch">
                              {isWishlist ? (
                                <CheckIcon
                                  className="addicon"
                                  onClick={() => handleAddToWishlist(item?._id)}
                                />
                              ) : (
                                <AddIcon
                                  className="addicon"
                                  onClick={() => handleAddToWishlist(item?._id)}
                                />
                              )}
                              <button className="p-1 mt-1 fnt12 sliderwatch1 textbold">
                                watchlist
                              </button>
                            </div>

                            <div className="col-md-2 text_White m-auto relativeP viewmore">
                              <MoreVertIcon
                                style={{ cursor: "pointer" }}
                                className="addicon"
                                onClick={() => handleMore(item)}
                              />
                              <button className="col-md-3 p-1 mt-1 fnt12 slidemore textbold">
                                More
                              </button>
                            </div>
                          </div>

                          <div className="footerScreen row">
                            <p className="row">
                              <span className="col-md-2 dicription">
                                <Moment format="YYYY">{item?.publish}</Moment>
                              </span>
                              <span className="col-md-6 dicription">
                                {item?.duration}
                              </span>

                              <span
                                style={{
                                  width: "fitContent",
                                  backgroundColor: "#33373d",
                                  borderRadius: "10px",
                                }}
                                className="col-md-4 p-0 text-center"
                              >
                                {item?.rating}
                              </span>
                            </p>
                            <p className="dicription row">
                              {`${item?.subtitle}-${item?.storyline}`.slice(
                                0,
                                90
                              )}
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
      {data?.length >= 4 && (
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
            disabled={startIndex + itemsPerPage >= data?.length}
            className="slidebtn2 text-white"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
}
