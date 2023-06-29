const express = require("express");
const router = express.Router();

const screenController = require("../../controllers/utils/screen");

router.get("/:code", screenController.get_screen);
router.get("/", screenController.get_screens);
router.post("/", screenController.post_screen);
router.put("/:code",  screenController.put_screen);
router.delete(
  "/:code",
  screenController.delete_screen
);

module.exports = router;
