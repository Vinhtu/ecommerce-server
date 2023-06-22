const express = require("express");
const router = express.Router();

const bannerController = require("../controllers/banner");

router.get("/:code", bannerController.get_banner);
router.get("/", bannerController.get_banners);
router.post("/", bannerController.post_banner);
router.put("/:code", bannerController.put_banner);
router.delete("/:code", bannerController.delete_banner);

module.exports = router;
