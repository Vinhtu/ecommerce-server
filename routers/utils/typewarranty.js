const express = require("express");
const router = express.Router();

const typewarrantyController = require("../../controllers/utils/typewarranty");

router.get("/:code", typewarrantyController.get_typewarranty);
router.get("/", typewarrantyController.get_typewarrantys);
router.post("/", typewarrantyController.post_typewarranty);
router.put("/:code",  typewarrantyController.put_typewarranty);
router.delete(
  "/:code",
  typewarrantyController.delete_typewarranty
);

module.exports = router;
