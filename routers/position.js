const express = require("express");
const router = express.Router();

const positionController = require("../controllers/position");

router.get("/:code", positionController.get_position);
router.get("/", positionController.get_positions);
router.post("/", positionController.post_position);
router.put("/:code", positionController.put_position);
router.delete("/:code", positionController.delete_position);

module.exports = router;
