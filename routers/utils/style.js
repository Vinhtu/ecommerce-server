const express = require("express");
const router = express.Router();

const styleController = require("../../controllers/utils/style");

router.get("/:code", styleController.get_style);
router.get("/", styleController.get_styles);
router.post("/", styleController.post_style);
router.put("/:code",  styleController.put_style);
router.delete(
  "/:code",
  styleController.delete_style
);

module.exports = router;
