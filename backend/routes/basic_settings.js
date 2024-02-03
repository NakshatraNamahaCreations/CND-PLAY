const express = require("express");
const router = express.Router();
const basic_settings = require("../controllers/basic_settings");
const multer = require("multer");

const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/basicSetting"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  upload.single("chennel_logo"),
  basic_settings.createBasicSettings
);
router.get("/getdata", basic_settings.getBasicSettings);
router.get("/getfilter", basic_settings.getBasicStrictFilter);
router.put(
  "/update/:BasicSettingsid",
  upload.single("chennel_logo"),
  basic_settings.updateBasicSettings
);
router.post("/trash/:iid", basic_settings.deleteBasicSettings);
router.post("/changestatus", basic_settings.changeStatusBasicSettings);
// router
// .route("/update")
// .post(basic_settings.updateBasicSettings);
// router
// .route("/changestatus")
// .post(basic_settings.updateBasicSettings);
// router
// .route("/trash")
// .post(basic_settings.updateBasicSettings);

// router
// .route("/changestatus")
// .post(basic_settings.changeStatusBasicSettings);
// router
// .route("/trash")
// .post(basic_settings.trashBasicSettings);

module.exports = router;
