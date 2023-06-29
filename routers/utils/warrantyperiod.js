const express = require("express");
const router = express.Router();

const warrantyperiodController = require("../../controllers/utils/warrantyperiod");

router.get("/:code", warrantyperiodController.get_warrantyperiod);
router.get("/", warrantyperiodController.get_warrantyperiods);
router.post("/", warrantyperiodController.post_warrantyperiod);
router.put("/:code",  warrantyperiodController.put_warrantyperiod);
router.delete(
  "/:code",
  warrantyperiodController.delete_warrantyperiod
);

module.exports = router;
