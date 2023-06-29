const express = require("express");
const router = express.Router();

const usagestatusadminController = require("../controllers/usagestatus");
const validateToken = require("../utils/validateToken");

router.get("/:code", usagestatusadminController.get_usagestatus);
router.get("/", usagestatusadminController.get_usagestatuss);
router.post("/", validateToken.ValidateToken, usagestatusadminController.post_usagestatus);
router.put("/:code", validateToken.ValidateToken, usagestatusadminController.put_usagestatus);
router.delete(
  "/:code",
  validateToken.ValidateToken,
  usagestatusadminController.delete_usagestatus
);

module.exports = router;
