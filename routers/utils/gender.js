const express = require("express");
const router = express.Router();

const genderController = require("../../controllers/utils/gender");

router.get("/:code", genderController.get_gender);
router.get("/", genderController.get_genders);
router.post("/", genderController.post_gender);
router.put("/:code",  genderController.put_gender);
router.delete(
  "/:code",
  genderController.delete_gender
);

module.exports = router;
