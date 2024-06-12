const express = require("express");
const router = express.Router();
const episode = require("../controllers/episode");
const multer = require("multer");

// Seriesid

const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/Episodes"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("thumbnail"), episode.createEpisode);
router.put(
  "/update/:Episodeidd",
  upload.single("thumbnail"),
  episode.updateEpisode
);

router.get("/getdata", episode.getEpisode);
router.get("/list", episode.list);
router.post("/changestatus", episode.changeStatusEpisodes);
router.post("/trash/:iid", episode.deleteEpisode);

module.exports = router;
