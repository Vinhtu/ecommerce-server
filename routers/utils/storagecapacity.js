const express = require("express");
const router = express.Router();

const storagecapacityController = require("../../controllers/utils/storagecapacity");

router.get("/:code", storagecapacityController.get_storagecapacity);
router.get("/", storagecapacityController.get_storagecapacitys);
router.post("/", storagecapacityController.post_storagecapacity);
router.put("/:code",  storagecapacityController.put_storagecapacity);
router.delete(
  "/:code",
  storagecapacityController.delete_storagecapacity
);

module.exports = router;
