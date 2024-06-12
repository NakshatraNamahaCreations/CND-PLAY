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

export default function WishListCon() {
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  const [disliked, setdisliked] = useState(false);
  const [LikedContent, setLikedContent] = useState();
  const [Purchades, setPurchades] = useState(false);
  const [purchaceContent, setPurchaceContent] = useState(false);
  const [purchaseid, setpurchaseid] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      let Wishlist = await ContentsPageService.getWishList(
        getlocalStorage?._id
      );

      let data = await Promise.all(
        Wishlist?.map(async (ele) => {
          return await ContentsPageService.getByContenId(ele?.content_id);
        })
      );

      setWishlistContent(data);
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
      .catch((error) => {
        // console.log("Error updating user ");
      });
  };
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
      // console.error("Error:", err);
      alert("An error occurred while processing your request.");
    }
  };

  const [Wishlist, setWishlist] = useState(0);
  const itemsPerPage = 4;
  const [WishlistContent, setWishlistContent] = useState();

  const handleAddToWishlist = (idd) => {
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

  return (
    <div className="col-md-12  bg-mg">
      {WishlistContent?.length === 0 || !WishlistContent ? (
        <div className="row m-auto" style={{ height: "50vh" }}>
          <h1 className="text-white text-center m-auto">
            You haven't added any items to your wishlist yet.
          </h1>
        </div>
      ) : (
        <>
          <div className="row m-auto">
            <p className="text_White textbold mt-5 mb-5">Your Wishlist</p>
          </div>
          {WishlistContent?.length > 0 && (
            <>
              <CaroselComponent
                data={WishlistContent}
                incrementViews={incrementViews}
                handleAddToWishlist={handleAddToWishlist}
              />
            </>
          )}
        </>
      )}

      {Wishlist && (
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
      <div className="row m-auto">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
