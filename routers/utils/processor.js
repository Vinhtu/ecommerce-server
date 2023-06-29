const express = require("express");
const router = express.Router();

const processorController = require("../../controllers/utils/processor");

router.get("/:code", processorController.get_processor);
router.get("/", processorController.get_processors);
router.post("/", processorController.post_processor);
router.put("/:code",  processorController.put_processor);
router.delete(
  "/:code",
  processorController.delete_processor
);

module.exports = router;
