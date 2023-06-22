const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

const validateToken = require('../utils/validateToken')


router.get("/recommendersystem/:code", productController.recommender_system);

router.get("/:code", productController.get_product);
router.get("/", productController.get_products);
router.put("/comment/:code", productController.put_product_comment);
router.get("/topSale", productController.get_product_top_sale);
router.get("/code/:code", productController.get_product_code);
router.get("/category/:code", productController.get_product_category);
router.post("/", productController.post_product);
router.post("/category", productController.post_get_product_category_feilter);
router.put("/all/:code",validateToken.ValidateToken, productController.put_product_all);
router.put("/:code",validateToken.ValidateToken, productController.put_product);
router.delete("/:code", validateToken.ValidateToken,productController.delete_product);

module.exports = router;
