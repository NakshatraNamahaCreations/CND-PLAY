import React, { useEffect, useState, useRef } from "react";
import ContentsPageService from "./DataApi/Api";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";

export default function CategoryWise() {
  const location = useLocation();
  const categorgen = location.state ? location.state.gener : null;
  const [GenersWise, setGenersWise] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const handelnextSlider = (index) => {
    if (index === 0) {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % (GenersWise?.length - 5)
      );
    }
  };

  const handelprevSlider = (index) => {
    if (index === 0) {
      setCurrentSlide((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : GenersWise?.length - 5
      );
    }
  };

  const fetchData = async () => {
    let GenersWise = await ContentsPageService.fetchContentsAllList();
    let data = GenersWise?.filter((contele) => {
      return contele.genres.some((ele) => ele === categorgen);
    });
    setGenersWise(data);
  };

  return (
    <div className="col-md-12  bg-mg">
      <div className="row  m-auto">
        <div className="row">
          <h3 className="text-white mt-3">{categorgen} </h3>
        </div>
        {GenersWise.length > 0 && (
          <div className="row m-auto mt-5  relativeP">
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

            {GenersWise.length > 0 && GenersWise?.slice(currentSlide, currentSlide + 4)?.map((ele) => (
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
          </div>)}
      </div>
      {GenersWise.length === 0 && (
        <div className="row text-white m-auto text-center" style={{ height: "80vh" }}>
          <h1 className="text-white m-auto">  Data Not Found Related to {categorgen}</h1>
        </div>)}
      <div className="row m-auto">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
