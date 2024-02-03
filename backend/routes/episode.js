// const express = require('express');
// const router = express.Router();
// const episode = require(process.env.PWD+"/controllers/episode")
// const multer  = require('multer');

// var storage = multer.diskStorage({
//   destination: function(req,file,callback) {
//     callback(null, process.env.PWD+'/upload');
//   },
//   filename: function(req,file,callback) {
//     callback(null,Date.now() + file.originalname,callback);
//   }
// })
// var upload = multer({ storage: storage });





// // console.log(1)
// router
// .route("/upload")
// .post(upload.single('file'), episode.fileUploader);
// router
// .route("/create")
// .post(episode.createEpisodes);
// router
// .route("/list")
// .post(episode.getEpisodes);
// router
// .route("/update")
// .post(episode.updateEpisodes);
// router
// .route("/changestatus")
// .post(episode.updateEpisodes);
// router
// .route("/trash")
// .post(episode.updateEpisodes);


// // router
// // .route("/changestatus")
// // .post(episode.changeStatusEpisodes);
// // router
// // .route("/trash")
// // .post(episode.trashEpisodes);

    
// module.exports = router; 




















const express = require("express");
const router = express.Router();
const episode = require("../controllers/episode");
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

router.post("/create", upload.single("thumbnail"), episode.createEpisode);
router.put(
  "/update/:Episodeidd",
  upload.single("thumbnail"),
  episode.updateEpisode
);

router.get("/getdata", episode.getEpisode);
router.post("/changestatus", episode.changeStatusEpisodes);
router.post("/trash/:iid", episode.deleteEpisode);


module.exports = router