const express = require("express");
const router = express.Router();

const stickerstyleController = require("../../controllers/utils/stickerstyle");

router.get("/:code", stickerstyleController.get_stickerstyle);
router.get("/", stickerstyleController.get_stickerstyles);
router.post("/", stickerstyleController.post_stickerstyle);
router.put("/:code",  stickerstyleController.put_stickerstyle);
router.delete(
  "/:code",
  stickerstyleController.delete_stickerstyle
);

module.exports = router;
