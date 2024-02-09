import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Movies from "./Movie";
import WatchVideoMode from "./WatchVideoMode";
import PlayList from "./Playlist";
import Series from "./Series";
import Register from "./Register";
import Login from "./Login";

import LikedContent from "./LikedContent";
import WishListCon from "./WishContent";
import Profile from "./Profile";
import MusicComponent from "./Music";
import Plan from "./Plan";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <Layout
              Children={
                <>
                  <Home />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/Movie"
          element={
            <Layout
              Children={
                <>
                  <Movies />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/Series"
          element={
            <Layout
              Children={
                <>
                  <Series />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/WatchVideoMode"
          element={
            <Layout
              Children={
                <>
                  <WatchVideoMode />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/LikedContent"
          element={
            <Layout
              Children={
                <>
                  <LikedContent />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/WishContent"
          element={
            <Layout
              Children={
                <>
                  <WishListCon />
                </>
              }
            />
          }
        />{" "}
        <Route
          exact
          path="/Profile"
          element={
            <Layout
              Children={
                <>
                  <Profile />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/Music"
          element={
            <Layout
              Children={
                <>
                  <MusicComponent />
                </>
              }
            />
          }
        />
        <Route
          exact
          path="/Plan"
          element={
            <Layout
              Children={
                <>
                  <Plan />
                </>
              }
            />
          }
        />
        <Route path="/Playlist" element={<PlayList />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
