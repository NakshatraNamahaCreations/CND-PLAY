import React, { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContentsPageService from "./DataApi/Api";
import Footer from "./footer";
import musicsPageService from "./DataApi/MusicApi";
import { useLocation, useNavigate } from "react-router-dom";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RegisterPage from "./DataApi/Register";
import { ToastContainer, toast } from "react-toastify";
import PurchaseContent from "./PurchaseContent";
import axios from "axios";
import CaroselComponent from "./carosel";
import { RotatingLines } from "react-loader-spinner";

export default function MusicComponent() {
  const [LatestReleased, setLatestReleased] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [IndiaMusic, setIndiaMusic] = useState([]);
  const [UpcomingMusic, setUpcomingMusic] = useState([]);
  const [TrendingMusic, setTrendingMusic] = useState([]);
  const [Loading, setLoading] = useState(false);
  const location = useLocation();
  const [GenersWise, setGenersWise] = useState([]);
  const categorgen = location.state ? location.state.gener : null;

  const [Purchades, setPurchades] = useState(false);
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [disliked, setdisliked] = useState(false);

  const navigate = useNavigate();

  const [purchaceContentData, setpurchaceContentData] = useState();
  const [purchaceContent, setPurchaceContent] = useState(false);
  const [purchaseid, setpurchaseid] = useState(null);

  const handlePurchaseContenet = async (id, validity) => {
    try {
      const currentDate = new Date();
      const validityInHours = validity * 24;
      const expirationDate = new Date(
        currentDate.getTime() + validityInHours * 60 * 60 * 1000
      );

      const initialPostData = {
        purchasedcontent: {
          Active: [
            {
              purchaseddate: currentDate,
              expiryddate: expirationDate,
              content_id: purchaseid,
            },
          ],
          PurchasedHistory: [
            {
              purchaseddate: currentDate,
              expiryddate: expirationDate,
              content_id: purchaseid,
            },
          ],
        },
      };

      // console.log(initialPostData, "initialPostData");

      let congfig = {
        url: `https://api.cndplay.com/api/authenticateRoute/purchasecontent/${getlocalStorage?._id}`,
        method: "put",
        data: initialPostData,
      };
      let res = await axios(congfig);
      if (res.status === 200) {
        alert("updated");
      }
    } catch (err) {
      // console.log(err, "error");
    }
  };
  const handlePurchaceContent = async (idd) => {
    setpurchaseid(idd);
    setPurchaceContent(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchFiltereddata();
  }, [categorgen]);

  const fetchFiltereddata = async () => {
    let listOfMusic = await musicsPageService.fetchContentsListmusics();
    let data = listOfMusic?.filter((contele) => {
      return contele.genres.some((ele) => ele === categorgen);
    });

    setGenersWise(data);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let listOfMusic = await musicsPageService.fetchContentsListmusics();
      let latestreleased = await musicsPageService.getLatestreleasedmusics();
      let IndiaMovi = await musicsPageService.fetchIndiamusicsList();
      let Upcomingdata = await musicsPageService.fetchUpcomingListmusics();
      let Trendingdata = await musicsPageService.fetchTrendingListmusics();

      setLatestReleased(latestreleased);
      setIndiaMusic(IndiaMovi);
      setBanners(listOfMusic);
      setUpcomingMusic(Upcomingdata);
      setTrendingMusic(Trendingdata);
      setpurchaceContentData(listOfMusic);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const notifyLikes = () => {
    setdisliked(true);
    toast("Content added in your watchlist");
  };
  const incrementViews = async (Item) => {
    try {
      await ContentsPageService.postViews(Item);
      navigate("/viewdetails-about-movie", { state: { id: Item } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToWishlist = (idd) => {
    const updatedWishlist = { content_id: idd, userid: getlocalStorage?._id };
    let initialPostData = { wishlist: updatedWishlist };
    if (updatedWishlist.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage?._id)
        .then((response) => {
          notifyLikes();
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const carouselRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        if (carouselRef.current) {
          carouselRef.current.goToSlide(
            carouselRef.current.state.currentSlide - 1
          );
        }
      } else if (event.key === "ArrowRight") {
        if (carouselRef.current) {
          carouselRef.current.goToSlide(
            carouselRef.current.state.currentSlide + 1
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      {Loading ? (
        <div
          className="row m-auto bg-mg text-center"
          style={{ height: "100vh" }}
        >
          <div className="col-md-2 m-auto">
            <RotatingLines
              visible={true}
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : (
        <div className="col-md-12 m-auto bg-mg">
          {!categorgen ? (
            <div className="col-md-12">
              <div className="row m-auto">
                {Banners?.length > 0 && (
                  <div className="row m-auto ">
                    <MultiCarousel
                      responsive={responsive}
                      autoPlay
                      ref={carouselRef}
                      showDots={true}
                      keyBoardControl={false}
                      transitionDuration={500}
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                      {Banners?.map((ele, inneindex) => (
                        <>
                          <div className="col-md-4 ">
                            <img
                              className="m-auto"
                              width={400}
                              onClick={() => incrementViews(ele?._id)}
                              height={250}
                              key={ele?._id}
                              src={ele?.banner}
                              alt=""
                            />{" "}
                          </div>
                        </>
                      ))}
                    </MultiCarousel>
                  </div>
                )}
              </div>

              <div className="row m-auto mt-3 ">
                {LatestReleased?.length > 0 && (
                  <>
                    <h4 className="row text_White m-auto mb-3 ">
                      Latest Released Music{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={LatestReleased}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}

                {IndiaMusic?.length > 0 && (
                  <>
                    <h4 className="row text_White m-auto mb-3 ">
                      Indie Music{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={IndiaMusic}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}

                {UpcomingMusic?.length > 0 && (
                  <>
                    <h4 className="row text_White m-auto mb-3 ">
                      Upcoming Music{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={UpcomingMusic}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}
                {TrendingMusic?.length > 0 && (
                  <>
                    <h4 className="row text_White m-auto mb-3 ">
                      Trending Music{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={TrendingMusic}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}

                {Banners?.length === 0 &&
                  LatestReleased === undefined &&
                  IndiaMusic?.length === 0 &&
                  UpcomingMusic?.length === 0 &&
                  TrendingMusic?.length === 0 && (
                    <div
                      className="col-md-12 m-auto"
                      style={{ height: "50vh" }}
                    >
                      <h3
                        className="text-white text-center m-auto"
                        style={{
                          position: "absolute",
                          left: "45%",
                          top: "50%",
                        }}
                      >
                        {" "}
                        Music Not Found
                      </h3>
                    </div>
                  )}
                <Footer />
              </div>
            </div>
          ) : (
            <div className="row  mb-3 m-auto" style={{ height: "100vh" }}>
              <div className="row">
                <h3 className="text-white mt-3">{categorgen} </h3>
              </div>

              <CaroselComponent
                data={GenersWise}
                incrementViews={incrementViews}
                handleAddToWishlist={handleAddToWishlist}
                handlePurchaceContent={handlePurchaceContent}
              />

              <Footer />
            </div>
          )}

          <PurchaseContent
            purchaceContent={purchaceContent}
            setPurchaceContent={setPurchaceContent}
            purchaceContentData={purchaceContentData}
            purchaseid={purchaseid}
            handlePurchaseContenet={handlePurchaseContenet}
            handlePlanPurchase={handlePlanPurchase}
          />
          {disliked ||
            (Purchades && (
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
            ))}
        </div>
      )}
    </>
  );
}
