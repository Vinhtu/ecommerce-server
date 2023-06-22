const express = require("express");
const router = express.Router();

const eventitemController = require("../controllers/eventitem");

router.get("/:code", eventitemController.get_eventitem);
router.get("/account/:code", eventitemController.get_eventitem_account);
router.get("/", eventitemController.get_eventitems);
router.post("/", eventitemController.post_eventitem);
router.put("/:code", eventitemController.put_eventitem);
router.delete("/:code", eventitemController.delete_eventitem);

module.exports = router;
