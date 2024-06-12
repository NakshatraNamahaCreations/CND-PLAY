const express = require("express");
const router = express.Router();
const terms_conditions = require(
  "../controllers/terms_conditions");

router.route("/create").post(terms_conditions.getTermsConditions);
router.route("/list").post(terms_conditions.getTermsConditions);
router.route("/changestatus").post(terms_conditions.getTermsConditions);
router.route("/trash").post(terms_conditions.getTermsConditions);

module.exports = router;
