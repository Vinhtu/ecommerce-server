const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");

router.get("/:code", paymentController.get_payment);
router.get("/", paymentController.get_payments);
router.post("/momo", paymentController.post_momo);
router.post("/vnpay", paymentController.post_vnpay);
router.post("/", paymentController.post_payment);
router.put("/:code", paymentController.put_payment);
router.delete("/:code", paymentController.delete_payment);

module.exports = router;
