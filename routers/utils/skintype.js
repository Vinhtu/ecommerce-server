const express = require("express");
const router = express.Router();

const skintypeController = require("../../controllers/utils/skintype");

router.get("/:code", skintypeController.get_skintype);
router.get("/", skintypeController.get_skintypes);
router.post("/", skintypeController.post_skintype);
router.put("/:code",  skintypeController.put_skintype);
router.delete(
  "/:code",
  skintypeController.delete_skintype
);

module.exports = router;
