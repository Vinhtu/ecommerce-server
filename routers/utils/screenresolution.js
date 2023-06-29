const express = require("express");
const router = express.Router();

const screenresolutionController = require("../../controllers/utils/screenresolution");

router.get("/:code", screenresolutionController.get_screenresolution);
router.get("/", screenresolutionController.get_screenresolutions);
router.post("/", screenresolutionController.post_screenresolution);
router.put("/:code",  screenresolutionController.put_screenresolution);
router.delete(
  "/:code",
  screenresolutionController.delete_screenresolution
);

module.exports = router;
