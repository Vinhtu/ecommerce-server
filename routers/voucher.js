const express = require("express");
const router = express.Router();

const voucherController = require("../controllers/voucher");
const validateToken = require("../utils/validateToken");

router.get("/:code", voucherController.get_voucher);
router.get("/", voucherController.get_vouchers);
router.post("/", validateToken.ValidateToken, voucherController.post_voucher);
router.put(
  "/:code",
  validateToken.ValidateToken,
  voucherController.put_voucher
);
router.delete(
  "/:code",
  validateToken.ValidateToken,
  voucherController.delete_voucher
);

module.exports = router;
