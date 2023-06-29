const express = require("express");
const router = express.Router();

const ramController = require("../../controllers/utils/ram");

router.get("/:code", ramController.get_ram);
router.get("/", ramController.get_rams);
router.post("/", ramController.post_ram);
router.put("/:code",  ramController.put_ram);
router.delete(
  "/:code",
  ramController.delete_ram
);

module.exports = router;
