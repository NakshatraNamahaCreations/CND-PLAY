const express = require("express");
const router = express.Router();
const contents = require("../../controllers/firebase/contents");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.env.PWD + "/upload");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname, callback);
  },
});
var upload = multer({ storage: storage });

router.post("/create", contents.create);
router.get("/list", contents.list);
router.get("/getdata", contents.getdata);
router.put("/update/:idd", contents.update);
router.post("/trash/:iid", contents.deleteContent);
router.post("/changestatus", contents.changestatus);
router.post("/incrementViews/:id", contents.PostMoviesview);
router.get("/mostViewedMovies", contents.getMostWatchedMovies);
router.get("/banersdata", contents.getBannersdata);
router.post("/countlikes/:id", contents.PostLikes);
router.post("/countratings/:id", contents.PostRatings);
router.get("/latestreleased", contents.LatestReleased);
router.get("/getbycontentid/:idd", contents.getbyContentId);
router.get("/getindiamov", contents.getIndiaMovies);
router.get("/getupcomingamov", contents.getUpcomingMovies);
router.get("/gettrendingamov", contents.getTrendingMovies);
router.get("/getindiamov", contents.getIndiaMovies);
router.get("/getupcomingamov", contents.getUpcomingMovies);
router.get("/gettrendingamov", contents.getTrendingMovies);
module.exports = router;
