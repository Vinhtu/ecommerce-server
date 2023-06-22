const express = require("express");
const router = express.Router();

const cartitemController = require("../controllers/cartitem");

router.get("/:code", cartitemController.get_cartitem);
router.get("/", cartitemController.get_cartitems);
router.post("/", cartitemController.post_cartitem);
router.put("/:code", cartitemController.put_cartitem);
router.put("/changeamount/:code", cartitemController.put_cartitem_change_amount);
router.delete("/:code/:idcart", cartitemController.delete_cartitem);

module.exports = router;
