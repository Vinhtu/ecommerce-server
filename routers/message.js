const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");

router.get("/:conversationId", messageController.get_message);
router.get("/", messageController.get_messages);
router.post("/", messageController.post_message);
router.put("/:code", messageController.put_message);
router.delete("/:code", messageController.delete_message);

module.exports = router;
