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
import SingleComponent from "./demo";
import LikedContent from "./LikedContent";

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

        <Route path="/Playlist" element={<PlayList />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
