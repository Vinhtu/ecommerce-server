const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brand");
const validateToken = require("../utils/validateToken");

router.get("/:code", brandController.get_brand);
router.get("/", brandController.get_brands);
router.post("/", validateToken.ValidateToken, brandController.post_brand);
router.put("/:code", validateToken.ValidateToken, brandController.put_brand);
router.delete(
  "/:code",
  validateToken.ValidateToken,
  brandController.delete_brand
);

module.exports = router;
