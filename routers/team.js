const express = require("express");
const router = express.Router();

const teamController = require("../controllers/team");

router.get("/:code", teamController.get_team);
router.get("/", teamController.get_teams);
router.post("/", teamController.post_team);
router.put("/:code", teamController.put_team);
router.delete("/:code", teamController.delete_team);

module.exports = router;
