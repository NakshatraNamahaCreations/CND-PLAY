import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import WatchVideoMode from "./WatchVideoMode";
import PlayList from "./Playlist";
import Series from "./Series";
import Register from "./Register";
import Login from "./Login";
import LikedContent from "./LikedContent";
import WishListCon from "./WishContent";
import Profile from "./Profile";
import Plan from "./Plan";
import CategoryWise from "./CategoryWise";
import CaroselCpmonnet from "./carosel";
import Episode from "./Episodes";
import EpisodesList from "./PlayEpisode";
import Contactus from "./Contactus";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import Refund from "./Refund";
import MoviComponent from "./Movie";
import Club from "./Club";
import PaymentComponent from "./PayUMoneyForm";
import FailurePage from "./PaymentFail";
import PaymentSuccess from "./PaymentSucces";
import MyHistory from "./history";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/Playlist"
          element={
            <Layout>
              <PlayList />
            </Layout>
          }
        />
        <Route
          exact
          path="/viewdetails-about-series"
          element={
            <Layout>
              <Episode />
            </Layout>
          }
        />
        <Route
          exact
          path="/EPlaylist"
          element={
            <Layout>
              <EpisodesList />
            </Layout>
          }
        />
        <Route
          exact
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          exact
          path="/Movie"
          element={
            <Layout>
              {" "}
              <MoviComponent />
            </Layout>
          }
        />
        <Route
          exact
          path="/Series"
          element={
            <Layout>
              <Series />
            </Layout>
          }
        />
        <Route
          exact
          path="/viewdetails-about-movie"
          element={
            <Layout>
              <WatchVideoMode />
            </Layout>
          }
        />
        <Route
          exact
          path="/LikedContent"
          element={
            <Layout>
              <LikedContent />
            </Layout>
          }
        />
        <Route
          exact
          path="/WishContent"
          element={
            <Layout>
              <WishListCon />
            </Layout>
          }
        />{" "}
        <Route
          exact
          path="/Profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        {/* <Route
          exact
          path="/Music"
          element={
            <Layout>
              <MusicComponent />
            </Layout>
          }
        /> */}
        <Route
          exact
          path="/Plan"
          element={
            <Layout>
              <Plan />
            </Layout>
          }
        />
        <Route
          exact
          path="/CategoryWise"
          element={
            <Layout>
              <CategoryWise />
            </Layout>
          }
        />
        <Route path="/carosel" element={<CaroselCpmonnet />} />
        <Route path="/Playlist" element={<PlayList />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          exact
          path="/cnd-play/contact-us"
          element={
            <Layout>
              <Contactus />
            </Layout>
          }
        />
        <Route
          exact
          path="/cnd-play/privacy-policy"
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
        <Route
          exact
          path="/cnd-play/terms-of-use"
          element={
            <Layout>
              <TermsOfUse />
            </Layout>
          }
        />
        <Route
          exact
          path="/cnd-play/refund-return-cancellation"
          element={
            <Layout>
              <Refund />
            </Layout>
          }
        />
        <Route
          exact
          path="/club"
          element={
            <Layout>
              <Club />
            </Layout>
          }
        />
        <Route
          path="/demod"
          element={
            <Layout>
              <PaymentComponent />
            </Layout>
          }
        />
        <Route
          path="/purchase-history"
          element={
            <Layout>
              <MyHistory />
            </Layout>
          }
        />

        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/failure" element={<FailurePage />} />
      </Routes>
    </>
  );
}

export default App;
