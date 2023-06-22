const express = require("express");
const router = express.Router();

const thumbnailController = require("../controllers/thumbnailchildren");

router.get("/:code", thumbnailController.get_thumbnail);
router.get("/", thumbnailController.get_thumbnails);
router.post("/", thumbnailController.post_thumbnail);
router.put("/:code", thumbnailController.put_thumbnail);
router.delete("/:code", thumbnailController.delete_thumbnail);

module.exports = router;
