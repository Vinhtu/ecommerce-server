const express = require("express");
const router = express.Router();

const seasonController = require("../../controllers/utils/season");

router.get("/:code", seasonController.get_season);
router.get("/", seasonController.get_seasons);
router.post("/", seasonController.post_season);
router.put("/:code",  seasonController.put_season);
router.delete(
  "/:code",
  seasonController.delete_season
);

module.exports = router;
