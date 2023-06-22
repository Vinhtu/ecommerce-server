const express = require("express");
const router = express.Router();

const colorController = require("../controllers/color");
const validateToken = require("../utils/validateToken");

router.get("/:code", colorController.get_color);
router.get("/", colorController.get_colors);
router.post("/",validateToken.ValidateToken, colorController.post_color);
router.put("/:code",validateToken.ValidateToken, colorController.put_color);
router.delete("/:code",validateToken.ValidateToken, colorController.delete_color);

module.exports = router;
