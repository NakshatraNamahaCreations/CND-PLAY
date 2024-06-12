import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, Form } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocation } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import ContentsPageService from "./DataApi/Api";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import RegisterPage from "./DataApi/Register";
import { Link } from "react-router-dom";

export default function Header({ searchValue, handleSearchChange }) {
  useEffect(() => {
    fetchData();
  }, []);
  let location = useLocation();
  let authResponseString = localStorage.getItem("cndplay_auth_response");
  let getlocalStorage = JSON.parse(authResponseString);

  const [searchToggle, setSearchToggle] = useState(false);
  const [ProfleView, setProfleView] = useState(false);

  let isHomePage = false;

  if (location.pathname === "/") {
    isHomePage = true;
  }
  if (location.pathname === "/Movie") {
    isHomePage = false;
  }
  if (location.pathname === "/Series") {
    isHomePage = false;
  }
  if (location.pathname === "/Musics") {
    isHomePage = false;
  }

  const [selectCategory, setSelectCategory] = useState(false);
  const [Geners, setGeners] = useState([]);
  const [LanguageData, setLanguageData] = useState([]);

  const fetchData = async () => {
    let Genresdata = await ContentsPageService.getgenersdata();
    let LanguageWise = await ContentsPageService.getLanguagedata();
    setGeners(Genresdata);
    setLanguageData(LanguageWise);
  };

  const handleLogout = () => {
    if (getlocalStorage?._id) {
      RegisterPage.Logout(getlocalStorage?._id)
        .then((response) => {
          alert("Logged out", response);
          localStorage.removeItem("cndplay_auth_response");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error updating user ", error);
        });
    }
  };
  const getLinkPath = () => {
    switch (location.pathname) {
      case "/":
        return "/categorywise";
      case "/Movie":
        return "/Movie";
      case "/Series":
        return "/Series";
      case "/Music":
        return "/Music";
      default:
        return "/";
    }
  };
  return (
    <Navbar className="row m-auto p-0relativeP " bg="dark">
      <Container>
        <>
          <Navbar.Brand className="text_White textsiz" href="/">
            CND PLAY
          </Navbar.Brand>

          <Nav className="ms-3">
            <Navbar.Text className="col-md-5 text_White m-auto me-3 ">
              <span onMouseEnter={() => setSelectCategory(true)}>
                Categories
              </span>
              {selectCategory ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
              {selectCategory && (
                <div
                  className="categorydropdown"
                  onMouseLeave={() => setSelectCategory(false)}
                >
                  <div className="row m-3">
                    <div className="col-md-6">
                      <div className="row">
                        <h6 className="mt-3">Genres</h6>
                        <div className="catecoulme">
                          {Geners?.map((genr) => (
                            <p key={genr.name} className="cate ">
                              <Link
                                to={getLinkPath()}
                                state={{ gener: genr.name }}
                              >
                                <span className="cate">{genr.name}</span>
                              </Link>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <h6 className="mt-3">Featured Collections</h6>
                        <div className="langauge">
                          {LanguageData?.map((ele) => {
                            return <p className="cate">{ele.lang}</p>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Navbar.Text>
            <Navbar.Text className=" m-auto fs_15 me-3">
              <a className="text_White" href="/Movie">
                Movies
              </a>
            </Navbar.Text>
            <Navbar.Text className="text_White m-auto fs_15 me-3">
              <a className="text_White" href="/Series">
                Series
              </a>
            </Navbar.Text>
            {/* <Navbar.Text className="text_White m-auto fs_15 me-3">
              <a className="text_White" href="/club">
                Club
              </a>
            </Navbar.Text> */}
          </Nav>
        </>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          <Navbar.Text className="text_White me-3 ">
            <div class="searchBox">
              <input
                onChange={(e) => handleSearchChange(e.target.value)}
                value={searchValue}
                class="searchInput"
                type="text"
                name=""
                placeholder="Search"
              />
              <button class="searchButton" href="#">
                <SearchIcon
                  onClick={() => {
                    setSearchToggle(!searchToggle);
                  }}
                />
              </button>
            </div>
          </Navbar.Text>

          <Navbar.Text className="text_White me-3 relativeP">
            <AccountCircleIcon
              className="iconss"
              onMouseEnter={() => setProfleView(true)}
            />

            {ProfleView && (
              <div
                className="profileviw"
                onMouseLeave={() => setProfleView(false)}
              >
                <div className="row m-3">
                  <div className="col-md-6">
                    <div className="row">


                      {getlocalStorage && (
                        <>
                          <h6 className="mt-3">Your account</h6>
                          <p className="cate">
                            <a href="/club">Offers</a>
                          </p>
                          <p className="cate">CND Benifits</p>
                          <a href="/LikedContent" className="cate">
                            <span className="cate">My Liked</span>
                          </a>
                          <a href="/Plan" className="cate">
                            <span className="cate">Plan</span>
                          </a>
                          <a href="/WishContent" className="cate">
                            <span className="cate"> My Wishlist</span>
                          </a>
                          <a href="/purchase-history" className="cate">
                            <span className="cate">Purchase History</span>
                          </a>
                          <a href="/Profile" className="cate">
                            <span className="cate">Edit Profile</span>
                          </a>

                          <p onClick={handleLogout} className="cate">
                            <span className="cate"> Sign out</span>
                          </p>
                        </>
                      )}
                      {!getlocalStorage && (
                        <p className="cate">
                          <a href="/login">Sign In</a>
                        </p>)}
                      {/* <p className="cate">Help</p> */}

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">


                      {getlocalStorage && (<>
                        <h6 className="mt-3">Profiles</h6>
                        <div className="row">
                          <div className="col-md-10">
                            <p className="">
                              <p className="">
                                {" "}
                                <AccountCircleIcon className="iconss " />
                              </p>
                              <span> {getlocalStorage?.username}</span>
                            </p>

                            {/* <p className="cate row ">
                            <div className="col-md-2   relativeP">
                              <span className="fs-5 addnew text-center addico ">
                                +
                              </span>
                            </div>
                            <span className="col-md-10">Add New</span>
                          </p> */}
                          </div>
                        </div></>)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
