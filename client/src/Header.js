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
export default function Header() {
  const location = useLocation();
  useEffect(() => {
    fetchData();
  }, []);
  let authResponseString = localStorage.getItem("auth_response");
  let getlocalStorage = JSON.parse(authResponseString);
  // console.log(getlocalStorage.username,"getlocalStorage")
  const [searchToggle, setSearchToggle] = useState(false);
  const [ProfleView, setProfleView] = useState(false);
  const [HandleSearch, setHandleSearch] = useState("");

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

  return (
    <Navbar className="row m-auto p-0" bg="dark">
      <Container>
        <>
          <Navbar.Brand className="text_White textsiz" href="/home">
            CND PLAY
          </Navbar.Brand>

          <Nav className="ms-3">
            <Navbar.Text className="col-md-5 text_White m-auto me-3 relativeP">
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
                        {Geners?.map((genr) => {
                          return <p className="cate">{genr.name}</p>;
                        })}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <h6 className="mt-3">Featured Collections</h6>
                        <div className=" langauge">
                          {LanguageData.map((ele) => {
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
            <Navbar.Text className="text_White m-auto fs_15 me-3">
              Musics
            </Navbar.Text>
          </Nav>
        </>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          <Navbar.Text className="text_White me-3">
            <TextField
              size="small"
              className={`searchicon-container ${searchToggle ? "active" : ""}`}
              onChange={() => setHandleSearch()}
              value={setHandleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <SearchIcon
                      className={`searchicon ${searchToggle ? "active" : ""}`}
                      onClick={() => setSearchToggle(!searchToggle)}
                    />
                  </InputAdornment>
                ),
              }}
            />
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
                      <h6 className="mt-3">Your accounts</h6>
                      <p className="cate">Help</p>

                      <p className="cate">Account & Settings</p>
                      <p className="cate">CND Benifits</p>
                      <a href="/LikedContent" className="cate">
                        Liked{" "}
                      </a>
                      <a href="/WishContent" className="cate">
                        Your Wishlist
                      </a>
                      <p className="cate">Sign out</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <h6 className="mt-3">Profiles</h6>
                      <div className="row">
                        <div className="col-md-10">
                          <p className="cate">
                            {" "}
                            <AccountCircleIcon className="iconss" />
                            {getlocalStorage?.username}
                          </p>

                          <p className="cate row ">
                            <div className="col-md-2   relativeP">
                              <span className="fs-5 addnew text-center addico ">
                                +
                              </span>
                            </div>
                            <span className="col-md-10">Add New</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      {/* {show ? (
        <div className="row ">
          <div className="col-md-9"></div>
          <div className={`row profilepage ${show ? "expanded" : ""}`}>
            
          </div>
        </div>
      ) : null} */}
    </Navbar>
  );
}
