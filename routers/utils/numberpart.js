const express = require("express");
const router = express.Router();

const numberpartController = require("../../controllers/utils/numberpart");

router.get("/:code", numberpartController.get_numberpart);
router.get("/", numberpartController.get_numberparts);
router.post("/", numberpartController.post_numberpart);
router.put("/:code",  numberpartController.put_numberpart);
router.delete(
  "/:code",
  numberpartController.delete_numberpart
);

module.exports = router;
