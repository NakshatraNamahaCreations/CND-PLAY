const express = require("express"); //import express
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// app.use('/assets', express.static(path.join(__dirname, 'assets')))

// *******************************************************************************
// ************************************ MySQL ************************************
// *******************************************************************************

// const bannerSettingRoute = require("./routes/banner_setting");
const basicSettingsRoute = require("./routes/basic_settings");
const episodeRoute = require("./routes/episode");
// const mMenuRoute = require("./routes/m_menu");
// const mSectionRoute = require("./routes/m_section");
const projectRoute = require("./routes/project");
// const projectFirebaseRoute = require("./routes/project_firebase");
// const sectionContentMapRoute = require("./routes/section_content_map");
const seriesRoute = require("./routes/series");
// const termsConditionsRoute = require("./routes/terms_conditions");
const videosRoute = require("./routes/videos");

const authenticateRoute = require("./routes/authenticate");

// const payRoute = require("./routes/pay");

// **********************************************************************************
// ************************************ Firebase ************************************
// **********************************************************************************

// const contentDataRoute = require("./routes/firebase/contentdata");jan 3
const contentsRoute = require("./routes/firebase/contents");
const districtsRoute = require("./routes/firebase/districts");
// const generalRoute = require("./routes/firebase/general");jan 3
const LangaugesRoute = require("./routes/firebase/language")
const genresFirebaseRoute = require("./routes/firebase/genres");
const indieMovieFirebaseRoute = require("./routes/firebase/indiemovie");
const OrganizationRoute = require("./routes/firebase/organization");
// const moviesFirebaseRoute = require("./routes/firebase/movies");
// const musicsFirebaseRoute = require("./routes/firebase/musics");
const seriesFirebaseRoute = require("./routes/series");

const trendingFirebaseRoute = require("./routes/firebase/trending");
const upcomingFirebaseRoute = require("./routes/firebase/upcoming");
const usersFirebaseRoute = require("./routes/firebase/users");

// const payRoute = require("./routes/pay");jan 3
// const paymentgatewaysettingRoute = require("./routes/paymentgatewaysetting");
const paymentcredentialsetupRoute = require("./routes/paymentgatewaysetting");
const PlanCreate = require("./routes/plan");
// app.use("/api/admin/paymentgatewaysetting", paymentgatewaysettingRoute);

// app.use("/pay", payRoute);jan 3

// *******************************************************************************
// ************************************ MySQL ************************************
// *******************************************************************************

// app.use("/banner", bannerSettingRoute);
app.use("/api/basic_settings", basicSettingsRoute);
app.use("/api/episodes", episodeRoute);
// app.use("/pages", mMenuRoute);
// app.use("/section", mSectionRoute);
app.use("/api/project", projectRoute);
app.use("/api/plans", PlanCreate);
// app.use("/series", seriesRoute);
// app.use("/terms_conditions", termsConditionsRoute);
app.use("/api/videos", videosRoute);

app.use("/api/paymentcredentialsetup", paymentcredentialsetupRoute);
// app.use("/pay", payRoute);

app.use("/api/authenticateRoute", authenticateRoute);

// **********************************************************************************
// ************************************ Firebase ************************************
// **********************************************************************************

// app.use("/contentData", contentDataRoute); jan 3
app.use("/api/contents", contentsRoute);
app.use("/api/districts", districtsRoute);
// app.use("/general", generalRoute);jan 3
app.use("/api/language", LangaugesRoute);
app.use("/api/genres", genresFirebaseRoute);
app.use("/api/indiemovie", indieMovieFirebaseRoute);

// app.use("/movies", moviesFirebaseRoute);
// app.use("/musics", musicsFirebaseRoute);
app.use("/api/series", seriesFirebaseRoute);
app.use("/api/trending", trendingFirebaseRoute);
app.use("/api/upcoming", upcomingFirebaseRoute);
app.use("/api/userManagement", usersFirebaseRoute);
app.use("/api/organization", OrganizationRoute);
// app.use("/videos", videosRoute);

// app.post("/products", (req, res) => {
//     const q = `insert into product(productId, productTitle, productDescription, productPrice, availableQuantity, productThumbnail)
//       values(?)`;
//     const values = [...Object.values(req.body)];
//     console.log("insert", values);
//     db.query(q, [values], (err, data) => {
//       console.log(err, data);
//       if (err) return res.json({ error: err.sqlMessage });
//       else return res.json({ data });
//     });
// });

// app.get("/products/:productId", (req, res) => {
//     const id = req.params.productId;
//     const q = "SELECT * FROM product where productId=?";
//     db.query(q, [id], (err, data) => {
//       console.log(err, data);
//       if (err) return res.json({ error: err.sqlMessage });
//       else return res.json({ data });
//     });
// });

// app.put("/products/:productId", (req, res) => {
//     const id = req.params.productId;
//     console.log("updated " + req.body);
//     const data = req.body;
//     const q =
//       "update product set " +
//       Object.keys(data)
//         .map((k) => `${k} = ?`)
//         .join(",") +
//       " where productId='" +
//       id +
//       "'";
//     console.log(q);
//     db.query(q, [...Object.values(data)], (err, out) => {
//       console.log(err, out);
//       if (err) return res.json({ error: err.message });
//       else {
//         return res.json({ data: out });
//       }
//     });
// });

// app.delete("/products/:productId", (req, res) => {
//     const id = req.params.productId;
//     console.log("deleting " + id, req.body);
//     const { productThumbnail } = req.body;
//     console.log(req.body);
//     const q = `DELETE FROM product WHERE productId= ?`;
//     db.query(q, [id], (err, data) => {
//       console.log(err, data);
//       if (err) return res.json({ error: err.sqlMessage });
//       else res.json({data})
//     })
// });

const PORT = process.env.DB_PORT || 8081;
app.listen(PORT, () => {
  console.log("Listening Port " + PORT);
});
