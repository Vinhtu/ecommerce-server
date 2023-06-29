const express = require("express");
const router = express.Router();

const sampleController = require("../../controllers/utils/sample");

router.get("/:code", sampleController.get_sample);
router.get("/", sampleController.get_samples);
router.post("/", sampleController.post_sample);
router.put("/:code",  sampleController.put_sample);
router.delete(
  "/:code",
  sampleController.delete_sample
);

module.exports = router;
