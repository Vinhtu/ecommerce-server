const express = require("express");
const router = express.Router();

const coloradminController = require("../controllers/coloradmin");
const validateToken = require("../utils/validateToken");

router.get("/:code", coloradminController.get_coloradmin);
router.get("/", coloradminController.get_coloradmins);
router.post("/",validateToken.ValidateToken, coloradminController.post_coloradmin);
router.put("/:code",validateToken.ValidateToken, coloradminController.put_coloradmin);
router.delete("/:code",validateToken.ValidateToken, coloradminController.delete_coloradmin);

module.exports = router;
