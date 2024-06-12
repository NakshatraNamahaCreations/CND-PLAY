const express = require("express");
const router = express.Router();
const project = require("../controllers/project");
const multer = require("multer");

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

router.post("/create", upload.single("thumbnail"), project.createProject);

router.put(
  "/update/:projectid",
  upload.single("thumbnail"),
  project.updateProject
);
router.get("/list", project.list);
router.get("/getdata", project.getProject);
router.post("/trash/:iid", project.deleteProject);

router.post("/changestatus", project.changeStatusProject);

module.exports = router;
