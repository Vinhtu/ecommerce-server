const express = require("express");
const router = express.Router();

const typedeviceController = require("../../controllers/utils/typedevice");

router.get("/:code", typedeviceController.get_typedevice);
router.get("/", typedeviceController.get_typedevices);
router.post("/", typedeviceController.post_typedevice);
router.put("/:code",  typedeviceController.put_typedevice);
router.delete(
  "/:code",
  typedeviceController.delete_typedevice
);

module.exports = router;
