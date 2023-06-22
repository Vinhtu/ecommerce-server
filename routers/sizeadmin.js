const express = require("express");
const router = express.Router();

const sizeadminController = require("../controllers/sizeadmin");
const validateToken = require("../utils/validateToken");

router.get("/:code", sizeadminController.get_sizeadmin);
router.get("/", sizeadminController.get_sizeadmins);
router.post("/", validateToken.ValidateToken, sizeadminController.post_sizeadmin);
router.put("/:code", validateToken.ValidateToken, sizeadminController.put_sizeadmin);
router.delete(
  "/:code",
  validateToken.ValidateToken,
  sizeadminController.delete_sizeadmin
);

module.exports = router;
