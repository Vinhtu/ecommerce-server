const express = require("express");
const router = express.Router();

const conversationController = require("../controllers/conversation");

router.get("/:userId", conversationController.get_conversation);
router.get("/", conversationController.get_conversations);
router.post("/", conversationController.post_conversation);
router.put("/:code", conversationController.put_conversation);
router.delete("/:code", conversationController.delete_conversation);

module.exports = router;
