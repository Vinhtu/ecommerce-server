const express = require("express");
const router = express.Router();

const typelockController = require("../../controllers/utils/typelock");

router.get("/:code", typelockController.get_typelock);
router.get("/", typelockController.get_typelocks);
router.post("/", typelockController.post_typelock);
router.put("/:code",  typelockController.put_typelock);
router.delete(
  "/:code",
  typelockController.delete_typelock
);

module.exports = router;
