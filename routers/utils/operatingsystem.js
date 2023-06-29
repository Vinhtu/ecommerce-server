const express = require("express");
const router = express.Router();

const operatingsystemController = require("../../controllers/utils/operatingsystem");

router.get("/:code", operatingsystemController.get_operatingsystem);
router.get("/", operatingsystemController.get_operatingsystems);
router.post("/", operatingsystemController.post_operatingsystem);
router.put("/:code",  operatingsystemController.put_operatingsystem);
router.delete(
  "/:code",
  operatingsystemController.delete_operatingsystem
);

module.exports = router;
