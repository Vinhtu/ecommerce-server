const express = require("express");
const router = express.Router();

//router
const account = require("./account");
const affilateshop = require("./affilateshop");
const brand = require("./brand");
const cart = require("./cart");
const category = require("./category");
const color = require("./color");
const comment = require("./comment");
const description = require("./description");
const evaluate = require("./evaluate");
const mail = require("./mail");
const notification = require("./notification");
const order = require("./order");
const product = require("./product");
const ship = require("./ship");
const size = require("./size");
const thumbnail = require("./thumbnail");
const voucher = require("./voucher");

router.use("/api/account", account);
router.use("/api/affilateshop", affilateshop);
router.use("/api/brand", brand);
router.use("/api/cart", cart);
router.use("/api/category", category);
router.use("/api/color", color);
router.use("/api/comment", comment);
router.use("/api/description", description);
router.use("/api/evaluate", evaluate);
router.use("/api/mail", mail);
router.use("/api/notification", notification);
router.use("/api/order", order);
router.use("/api/product", product);
router.use("/api/ship", ship);
router.use("/api/size", size);
router.use("/api/thumbnail", thumbnail);
router.use("/api/voucher", voucher);



module.exports = router;
