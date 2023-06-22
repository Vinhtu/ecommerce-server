const express = require("express");
const router = express.Router();

const affilateshopController = require("../controllers/affilateshop");
const validateToken = require("../utils/validateToken");

router.get("/create", affilateshopController.create);
router.get("/:code", affilateshopController.get_affilateshop);
router.get("/", affilateshopController.get_affilateshops);
router.post(
  "/",
  validateToken.ValidateToken,
  affilateshopController.post_affilateshop
);
router.put(
  "/:code",
  validateToken.ValidateToken,
  affilateshopController.put_affilateshop
);
router.delete(
  "/:code",
  validateToken.ValidateToken,
  affilateshopController.delete_affilateshop
);

module.exports = router;
