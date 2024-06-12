const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());
mongoose
  .connect(process.env.DataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((message) => {
    console.log("database successfully connected");
  })
  .catch((err) => console.log(err, "database not connected"));
app.use(express.static("public"));
app.use("/upload", express.static("upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const basicSettingsRoute = require("./routes/basic_settings");
const episodeRoute = require("./routes/episode");
const projectRoute = require("./routes/project");
const seriesRoute = require("./routes/series");
const videosRoute = require("./routes/videos");
const authenticateRoute = require("./routes/authenticate");
const user = require("./routes/firebase/users");
const contentsRoute = require("./routes/firebase/contents");
const districtsRoute = require("./routes/firebase/districts");
const LangaugesRoute = require("./routes/firebase/language");
const genresFirebaseRoute = require("./routes/firebase/genres");
const indieMovieFirebaseRoute = require("./routes/firebase/indiemovie");
const OrganizationRoute = require("./routes/firebase/organization");
const seriesFirebaseRoute = require("./routes/series");
const trendingFirebaseRoute = require("./routes/firebase/trending");
const upcomingFirebaseRoute = require("./routes/firebase/upcoming");
const usersFirebaseRoute = require("./routes/firebase/users");
const payment = require("./routes/firebase/Payment/payment");
const PlanRoute = require("./routes/plan");
const OfferRoute = require("./routes/offer");

app.use("/api/basic_settings", basicSettingsRoute);
app.use("/api/episodes", episodeRoute);
app.use("/api/project", projectRoute);
app.use("/api/plans", PlanRoute);
app.use("/api/offer", OfferRoute);
app.use("/api/videos", videosRoute);
app.use("/api/payu", payment);
app.use("/api/authenticateRoute", authenticateRoute);
app.use("/api/user", user);
app.use("/api/contents", contentsRoute);
app.use("/api/districts", districtsRoute);
app.use("/api/language", LangaugesRoute);
app.use("/api/genres", genresFirebaseRoute);
app.use("/api/indiemovie", indieMovieFirebaseRoute);
app.use("/api/series", seriesFirebaseRoute);
app.use("/api/trending", trendingFirebaseRoute);
app.use("/api/upcoming", upcomingFirebaseRoute);
app.use("/api/userManagement", usersFirebaseRoute);
app.use("/api/organization", OrganizationRoute);
// payment intigraiton

const paymentRoute = require("./routes/firebase/Payment/payment");
app.use("/api", paymentRoute);

const PORT = process.env.DB_PORT || 8800;
app.listen(PORT, () => {
  console.log("Listening Port " + PORT);
});
