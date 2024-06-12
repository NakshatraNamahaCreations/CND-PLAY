const express = require("express");
const router = express.Router();
const series = require("../controllers/series");
const multer = require("multer");

// Seriesid

const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/project"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("thumbnail"), series.createSeries);
router.put(
  "/update/:Seriesid",
  upload.single("thumbnail"),
  series.updateSeries
);

router.get("/getdata", series.getSeries);
router.post("/changestatus", series.changeStatusSeries);
router.post("/trash/:iid", series.deleteSeries);

module.exports = router;
