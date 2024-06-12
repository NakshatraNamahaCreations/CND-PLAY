import React, { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContentsPageService from "./DataApi/Api";
import Footer from "./footer";
import IndiaMoviePageService from "./DataApi/indiaMovieApi";
import { useNavigate, useLocation } from "react-router-dom";
import CaroselComponent from "./carosel";
import RegisterPage from "./DataApi/Register";
import { ToastContainer, toast } from "react-toastify";
import PurchaseContent from "./PurchaseContent";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function MoviComponent() {
  const [Purchades, setPurchades] = useState(false);
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [disliked, setdisliked] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [LatestReleased, setLatestReleased] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [IndiaMovies, setIndiaMovies] = useState([]);
  const [UpcomingMovies, setUpcomingMovies] = useState([]);
  const [TrendingMovies, setTrendingMovies] = useState([]);

  const location = useLocation();
  const [GenersWise, setGenersWise] = useState([]);
  const [categorgen, setCategorgen] = useState(null);

  useEffect(() => {
    setCategorgen(location.state?.gener);
  }, [location.state]);

  const [purchaceContentData, setpurchaceContentData] = useState([]);
  const [purchaceContent, setPurchaceContent] = useState(false);
  const [purchaseid, setpurchaseid] = useState(null);

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
      if (response.status === 200) {
        alert("You have purchased successfully.");
        window.location.reload("");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while processing your request.");
    }
  };

  const handlePurchaceContent = async (idd) => {
    setpurchaseid(idd);
    setPurchaceContent(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchFiltereddata();
  }, [categorgen]);

  const fetchFiltereddata = async () => {
    let listOfMovie = await ContentsPageService.fetchContentsList();
    let data = await listOfMovie.filter((contele) => {
      return contele.genres.some((ele) => ele === categorgen);
    });

    setGenersWise(data);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      let listOfMovie = await ContentsPageService.fetchContentsList();
      let latestreleased = await ContentsPageService.getLatestreleased();
      let IndiaMovi = await IndiaMoviePageService.fetchIndiaMoviesList();
      let Upcomingdata = await IndiaMoviePageService.fetchUpcomingList();
      let Trendingdata = await IndiaMoviePageService.fetchTrendingList();

      setLatestReleased(latestreleased);
      setIndiaMovies(IndiaMovi);
      setBanners(listOfMovie);
      setUpcomingMovies(Upcomingdata);
      setTrendingMovies(Trendingdata);
      // console.log(listOfMovie, "listOfMovie");
      setpurchaceContentData(listOfMovie);
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
          <div className="col-md-12">
            {!categorgen ? (
              <>
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
                <div className="row m-auto mt-3 ">
                  {LatestReleased?.length > 0 && (
                    <>
                      <h4 className="row text_White m-auto mb-3 ">
                        Latest Released Movies{" "}
                      </h4>{" "}
                      <CaroselComponent
                        data={LatestReleased}
                        incrementViews={incrementViews}
                        handleAddToWishlist={handleAddToWishlist}
                        handlePurchaceContent={handlePurchaceContent}
                      />
                    </>
                  )}
                  {IndiaMovies?.length > 0 && (
                    <div className="row">
                      <>
                        <h4 className="row text_White m-auto mb-3 ">
                          Indie Movies{" "}
                        </h4>{" "}
                        <CaroselComponent
                          data={IndiaMovies}
                          incrementViews={incrementViews}
                          handleAddToWishlist={handleAddToWishlist}
                          handlePurchaceContent={handlePurchaceContent}
                        />
                      </>
                    </div>
                  )}
                  {UpcomingMovies?.length > 0 && (
                    <div className="row">
                      <div className="row m-auto mt-3 ">
                        <h4 className="row text_White m-auto mb-3 ">
                          Upcoming Movies{" "}
                        </h4>{" "}
                        <CaroselComponent
                          data={UpcomingMovies}
                          incrementViews={incrementViews}
                          handleAddToWishlist={handleAddToWishlist}
                          handlePurchaceContent={handlePurchaceContent}
                        />
                      </div>
                    </div>
                  )}
                  {TrendingMovies?.length > 0 && (
                    <div className="row">
                      <div className="row m-auto mt-3 ">
                        <h4 className="row text_White m-auto mb-3 ">
                          Trending Movies{" "}
                        </h4>{" "}
                        <CaroselComponent
                          data={TrendingMovies}
                          incrementViews={incrementViews}
                          handleAddToWishlist={handleAddToWishlist}
                          handlePurchaceContent={handlePurchaceContent}
                        />
                      </div>
                    </div>
                  )}

                  {Banners?.length === 0 &&
                    LatestReleased === undefined &&
                    IndiaMovies?.length === 0 &&
                    UpcomingMovies?.length === 0 &&
                    TrendingMovies?.length === 0 && (
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
                          Movies Not Found
                        </h3>
                      </div>
                    )}
                  <Footer />
                </div>

                <PurchaseContent
                  purchaceContent={purchaceContent}
                  setPurchaceContent={setPurchaceContent}
                  purchaceContentData={purchaceContentData}
                  purchaseid={purchaseid}
                  handlePurchaseContenet={handlePurchaseContenet}
                  handlePlanPurchase={handlePlanPurchase}
                />
              </>
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
        </div>
      )}
    </>
  );
}
