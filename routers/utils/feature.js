const express = require("express");
const router = express.Router();

const featureController = require("../../controllers/utils/feature");

router.get("/:code", featureController.get_feature);
router.get("/", featureController.get_features);
router.post("/", featureController.post_feature);
router.put("/:code",  featureController.put_feature);
router.delete(
  "/:code",
  featureController.delete_feature
);

module.exports = router;
