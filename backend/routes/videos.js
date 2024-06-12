const express = require("express");
const router = express.Router();
const videos = require("../controllers/videos");
const multer = require("multer");

// Seriesid

const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../public/video");
    console.log("Destination:", dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    console.log("Filename:", uniqueFileName);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videofile", maxCount: 1 },
  ]),
  videos.createVideos
);

router.put(
  "/update/:videosid",
  upload.fields([{ name: "thumbnail" }, { name: "videofile" }]),
  videos.updateVideos
);
router.get("/getdata", videos.getVideos);
router.post("/trash/:idd", videos.deleteVideos);
router.post("/changestatus", videos.changeStatusvideos);
// router
// .route("/list")
// .post(videos.getVideos);
// router
// .route("/update")
// .post(videos.updateVideos);
// router
// .route("/changestatus")
// .post(videos.updateVideos);
// router
// .route("/trash")
// .post(videos.updateVideos);

// router
// .route("/changestatus")
// .post(videos.changeStatusVideos);
// router
// .route("/trash")
// .post(videos.trashVideos);

module.exports = router;
