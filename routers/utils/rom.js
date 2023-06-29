const express = require("express");
const router = express.Router();

const romController = require("../../controllers/utils/rom");

router.get("/:code", romController.get_rom);
router.get("/", romController.get_roms);
router.post("/", romController.post_rom);
router.put("/:code",  romController.put_rom);
router.delete(
  "/:code",
  romController.delete_rom
);

module.exports = router;
