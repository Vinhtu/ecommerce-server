const express = require("express");
const router = express.Router();
const ValidateToken = require('../utils/validateToken')
const categoryController = require("../controllers/category");

router.get("/:code", categoryController.get_category);
router.get("/", categoryController.get_categorys);
router.post("/",ValidateToken.ValidateToken, categoryController.post_category);
router.put("/:code", ValidateToken.ValidateToken,categoryController.put_category);
router.delete("/:code", ValidateToken.ValidateToken,categoryController.delete_category);

module.exports = router;
