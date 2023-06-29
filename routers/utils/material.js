const express = require("express");
const router = express.Router();

const materialController = require("../../controllers/utils/material");

router.get("/:code", materialController.get_material);
router.get("/", materialController.get_materials);
router.post("/", materialController.post_material);
router.put("/:code",  materialController.put_material);
router.delete(
  "/:code",
  materialController.delete_material
);

module.exports = router;
