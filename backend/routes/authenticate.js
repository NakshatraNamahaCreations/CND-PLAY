const express = require("express");
const router = express.Router();
const authenticate = require("../controllers/authenticate");



router.post("/makelogin", authenticate.makelogin);
router.post("/makelogout", authenticate.makelogout);
router.post("/makeregister", authenticate.makeregister);
router.put("/update/:id", authenticate.update);
router.put("/postWishList/:id", authenticate.UpdateWishlist);
router.get("/getlikes/:id", authenticate.getLikesById);
router.get("/getwishlist/:id", authenticate.getWishlistById);
router.get("/getalluser", authenticate.getAlluser);
router.get("/getbyuserid/:idd", authenticate.getByUserId);
router.get("/getuserbyfirebaseid/:id", authenticate.getUserByFId);
module.exports = router;
