const express = require("express");
const router = express.Router();

const modelproductController = require("../../controllers/utils/modelproduct");

router.get("/:code", modelproductController.get_modelproduct);
router.get("/", modelproductController.get_modelproducts);
router.post("/", modelproductController.post_modelproduct);
router.put("/:code",  modelproductController.put_modelproduct);
router.delete(
  "/:code",
  modelproductController.delete_modelproduct
);

module.exports = router;
