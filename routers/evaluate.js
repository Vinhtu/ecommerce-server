const express = require("express");
const router = express.Router();

const evaluateController = require("../controllers/evaluate");

router.get("/:code", evaluateController.get_evaluate);
router.get("/", evaluateController.get_evaluates);
router.post("/", evaluateController.post_evaluate);
router.put("/:code", evaluateController.put_evaluate);
router.delete("/:code", evaluateController.delete_evaluate);

module.exports = router;
