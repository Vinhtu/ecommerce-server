const express = require("express");
const router = express.Router();

const typeshellController = require("../../controllers/utils/typeshell");

router.get("/:code", typeshellController.get_typeshell);
router.get("/", typeshellController.get_typeshells);
router.post("/", typeshellController.post_typeshell);
router.put("/:code",  typeshellController.put_typeshell);
router.delete(
  "/:code",
  typeshellController.delete_typeshell
);

module.exports = router;
