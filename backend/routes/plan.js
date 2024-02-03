const express = require("express");
const router = express.Router();
const PlanController = require("../controllers/firebase/Plan");

router.post("/create", PlanController.createPlan);

router.put("/update/:Planid", PlanController.updatePlan);
router.get("/getdata", PlanController.getPlan);

router.post("/trash/:iid", PlanController.deletePlan);

router.post("/changestatus", PlanController.changestatus);

module.exports = router;
