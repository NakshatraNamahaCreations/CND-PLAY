import React, { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./footer";
import SeriesPageService from "./DataApi/SeriesApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentsPageService from "./DataApi/Api";
import PurchaseContent from "./PurchaseContent";
import axios from "axios";
import CaroselComponent from "./carosel";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RegisterPage from "./DataApi/Register";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function Series() {
  const [LatestReleased, setLatestReleased] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [IndiaSeries, setIndiaSeries] = useState([]);
  const [UpcomingSeries, setUpcomingSeries] = useState([]);
  const [TrendingSeries, setTrendingSeries] = useState([]);
  const [GenersWise, setGenersWise] = useState([]);
  const [Loading, setLoading] = useState(false);
  const location = useLocation();
  const [categorgen, setCategorgen] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setCategorgen(location.state?.gener);
  }, [location.state]);

  const [purchaceContentData, setpurchaceContentData] = useState();
  const [purchaceContent, setPurchaceContent] = useState(false);
  const [purchaseid, setpurchaseid] = useState(null);
  const [Purchades, setPurchades] = useState(false);
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [disliked, setdisliked] = useState(false);
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
    let listOfMovie = await SeriesPageService.fetchContentsListSeries();
    let data = listOfMovie.filter((contele) => {
      return contele.genres.some((ele) => ele === categorgen);
    });

    setGenersWise(data);
  };
  const [WishlistContent, setWishlistContent] = useState();
  const fetchData = async () => {
    try {
      setLoading(true);
      let listOfMovie = await SeriesPageService.fetchContentsListSeries();
      let latestreleased = await SeriesPageService.getLatestreleasedSeries();
      let IndiaMovi = await SeriesPageService.fetchIndiaSeriesList();
      let Upcomingdata = await SeriesPageService.fetchUpcomingListSeries();
      let Trendingdata = await SeriesPageService.fetchTrendingListSeries();
      let Wishlist = await ContentsPageService.getWishList(
        getlocalStorage?._id
      );

      setWishlistContent(Wishlist);
      setLatestReleased(latestreleased);
      setIndiaSeries(IndiaMovi);
      setBanners(listOfMovie);
      setUpcomingSeries(Upcomingdata);
      setTrendingSeries(Trendingdata);
      setpurchaceContentData(listOfMovie);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  const incrementViews = async (Item) => {
    try {
      await ContentsPageService.postViews(Item);
      navigate("/viewdetails-about-series", { state: { id: Item } });
    } catch (error) {
      console.error(error);
    }
  };

  const notifyLikes = () => {
    setdisliked(true);
    toast("Content added in your watchlist");
  };

  const handleAddToWishlist = (idd) => {
    const updatedWishlist = { content_id: idd, userid: getlocalStorage?._id };
    let initialPostData = { wishlist: updatedWishlist };
    if (updatedWishlist.userid) {
      ContentsPageService.PostWishList(initialPostData, getlocalStorage?._id)
        .then((response) => {
          setdisliked(true)
          toast(response.data.message);
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

  useEffect(() => {
    fetchData();
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
                      Latest Released Series{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={LatestReleased}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}
                {IndiaSeries?.length > 0 && (
                  <>
                    <h4 className="row text_White m-auto mb-3 ">
                      Indie Series{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={IndiaSeries}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}
                {UpcomingSeries?.length > 0 && (
                  <>
                    <h4 className="row text_White m-auto mb-3 ">
                      Upcoming Series{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={UpcomingSeries}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}
                {TrendingSeries?.length > 0 && (
                  <>
                    <h4 className="row text_White m-auto mb-3 ">
                      Trending Series{" "}
                    </h4>{" "}
                    <CaroselComponent
                      data={TrendingSeries}
                      incrementViews={incrementViews}
                      handleAddToWishlist={handleAddToWishlist}
                      handlePurchaceContent={handlePurchaceContent}
                    />
                  </>
                )}

                {Banners?.length === 0 &&
                  LatestReleased === undefined &&
                  IndiaSeries?.length === 0 &&
                  UpcomingSeries?.length === 0 &&
                  TrendingSeries?.length === 0 && (
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
                        Series Not Found
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
