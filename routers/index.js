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
const thumbnailchildren = require("./thumbnailchildren");
const voucher = require("./voucher");
const team = require("./team");
const position = require("./position");
const cartitem = require("./cartitem");
const banner = require("./banner");
const event = require("./event");
const eventitem = require("./eventitem");
const reportcomment = require("./reportcomment");
const conversation = require("./conversation");
const message = require("./message");
const payment = require("./payment");
const sizeadmin = require("./sizeadmin");
const coloradmin = require("./coloradmin");
const search = require("./search");
const usagestatus = require("./usagestatus");
const deliverymethod = require("./deliverymethod");
const feature = require("./utils/feature");
const gender = require("./utils/gender");
const material = require("./utils/material");
const modelproduct = require("./utils/modelproduct");
const numberpart = require("./utils/numberpart");
const operatingsystem = require("./utils/operatingsystem");
const origin = require("./utils/origin");
const processor = require("./utils/processor");
const ram = require("./utils/ram");
const rom = require("./utils/rom");
const screenresolution = require("./utils/screenresolution");
const screen = require("./utils/screen");
const skintype = require("./utils/skintype");
const stickerstyle = require("./utils/stickerstyle");
const storagecapacity = require("./utils/storagecapacity");
const typedevice = require("./utils/typedevice");
const typelock = require("./utils/typelock");
const typeshell = require("./utils/typeshell");
const typewarranty = require("./utils/typewarranty");
const warrantyperiod = require("./utils/warrantyperiod");
const season = require("./utils/season");
const sample = require("./utils/sample");
const style = require("./utils/style");

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
router.use("/api/thumbnailchildren", thumbnailchildren);
router.use("/api/voucher", voucher);
router.use("/api/team", team);
router.use("/api/position", position);
router.use("/api/cartitem", cartitem);
router.use("/api/banner", banner);
router.use("/api/event", event);
router.use("/api/eventitem", eventitem);
router.use("/api/reportcomment", reportcomment);
router.use("/api/conversation", conversation);
router.use("/api/message", message);
router.use("/api/payment", payment);
router.use("/api/sizeadmin", sizeadmin);
router.use("/api/coloradmin", coloradmin);
router.use("/api/search", search);
router.use("/api/usagestatus", usagestatus);
router.use("/api/deliverymethod", deliverymethod);

router.use("/api/feature", feature);
router.use("/api/gender", gender);
router.use("/api/material", material);
router.use("/api/modelproduct", modelproduct);
router.use("/api/numberpart", numberpart);
router.use("/api/operatingsystem", operatingsystem);
router.use("/api/origin", origin);
router.use("/api/processor", processor);
router.use("/api/ram", ram);
router.use("/api/rom", rom);
router.use("/api/screenresolution", screenresolution);
router.use("/api/screen", screen);
router.use("/api/skintype", skintype);
router.use("/api/stickerstyle", stickerstyle);
router.use("/api/storagecapacity", storagecapacity);
router.use("/api/typedevice", typedevice);
router.use("/api/typelock", typelock);
router.use("/api/typeshell", typeshell);
router.use("/api/typewarranty", typewarranty);
router.use("/api/warrantyperiod", warrantyperiod);
router.use("/api/season", season);
router.use("/api/sample", sample);
router.use("/api/style", style);

module.exports = router;
