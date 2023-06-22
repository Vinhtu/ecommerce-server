const express = require("express");
const router = express.Router();

const descriptionController = require("../controllers/description");

router.get("/:code", descriptionController.get_description);
router.get("/", descriptionController.get_descriptions);
router.post("/", descriptionController.post_description);
router.put("/:code", descriptionController.put_description);
router.delete("/:code", descriptionController.delete_description);

module.exports = router;
