const express = require("express");
const router = express.Router();

const originController = require("../../controllers/utils/origin");

router.get("/:code", originController.get_origin);
router.get("/", originController.get_origins);
router.post("/", originController.post_origin);
router.put("/:code",  originController.put_origin);
router.delete(
  "/:code",
  originController.delete_origin
);

module.exports = router;
