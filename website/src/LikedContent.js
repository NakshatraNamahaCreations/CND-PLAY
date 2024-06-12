import React, { useEffect, useState } from "react";
import ContentsPageService from "./DataApi/Api";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";
import PurchaseContent from "./PurchaseContent";
import CaroselComponent from "./carosel";
import RegisterPage from "./DataApi/Register";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";

export default function LikedContent() {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [disliked, setdisliked] = useState(false);
  const [LikedContent, setLikedContent] = useState();
  const [Purchades, setPurchades] = useState(false);
  // const [purchaceContentData, setpurchaceContentData] = useState();
  const [purchaceContent, setPurchaceContent] = useState(false);
  const [purchaseid, setpurchaseid] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      let likedmovie = await ContentsPageService.getLikes(getlocalStorage?._id);

      let data = await Promise.all(
        likedmovie?.map(async (ele) => {
          return await ContentsPageService.getByContenId(ele?.content_id);
        })
      );
      let Wishlist = await ContentsPageService.getWishList(
        getlocalStorage?._id
      );
      setWishlistContent(Wishlist);

      setLikedContent(data);
    } catch (error) {
      console.error("Error fetching liked movies:", error);
    }
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
          setdisliked(true);
          toast(response.data.message);
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };
  const handlePurchaceContent = async (idd) => {
    setpurchaseid(idd);
    setPurchaceContent(true);
  };

  const handlePlanPurchase = async (platy) => {
    let initialPostData = { plan: platy };
    await RegisterPage.update(initialPostData, getlocalStorage?._id)
      .then((response) => {
        toast(`${platy}  Purchased`);
        setPurchades(true);
        window.location.reload("");
      })
      .catch((error) => { });
  };
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

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const [WishlistContent, setWishlistContent] = useState();
  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 >= LikedContent?.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 1 < 0 ? LikedContent?.length - 1 : prevIndex - 1
    );
  };

  const handleMore = (item) => {
    const path = item?.section === "movie" ? "/viewdetails-about-movie" : "/viewdetails-about-series";
    navigate(path, { state: { id: item?._id } });
  };
  return (
    <div className="col-md-12  bg-mg">
      {LikedContent?.length === 0 || !LikedContent ? (
        <div className="row m-auto" style={{ height: "50vh" }}>
          <h1 className="text-white text-center m-auto">
            No content has been liked yet.
          </h1>
        </div>
      ) : (
        <>
          <div className="row m-auto">
            <p className="text_White textbold mt-5 mb-5">Liked Contents</p>
          </div>

          <div className="row mt-3">
            {LikedContent?.length > 0 && (
              <>
                <CaroselComponent
                  data={LikedContent}
                  incrementViews={incrementViews}
                  handleAddToWishlist={handleAddToWishlist}
                />
              </>
            )}
          </div>
        </>
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
      <div className="row m-auto">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
