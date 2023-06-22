const express = require("express");
const router = express.Router();

const shipController = require("../controllers/ship");

router.get("/:code", shipController.get_ship);
router.get("/", shipController.get_ships);
router.post("/", shipController.post_ship);
router.put("/:code", shipController.put_ship);
router.delete("/:code", shipController.delete_ship);

module.exports = router;
