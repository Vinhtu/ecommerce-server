const express = require("express");
const router = express.Router();

const deliverymethodadminController = require("../controllers/deliverymethod");
const validateToken = require("../utils/validateToken");

router.get("/:code", deliverymethodadminController.get_deliverymethod);
router.get("/", deliverymethodadminController.get_deliverymethods);
router.post("/", validateToken.ValidateToken, deliverymethodadminController.post_deliverymethod);
router.put("/:code", validateToken.ValidateToken, deliverymethodadminController.put_deliverymethod);
router.delete(
  "/:code",
  validateToken.ValidateToken,
  deliverymethodadminController.delete_deliverymethod
);

module.exports = router;
