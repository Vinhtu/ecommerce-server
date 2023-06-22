const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment");

const validateToken = require('../utils/validateToken')


router.get("/:code", commentController.get_comment);
router.put("/like/:code", commentController.put_like_comment);
router.put("/reply/:code", commentController.put_reply_comment);
router.get("/", commentController.get_comments);
router.post("/",validateToken.ValidateToken, commentController.post_comment);
router.put("/:code", validateToken.ValidateToken, commentController.put_comment);
router.put("/body/:code",validateToken.ValidateToken, commentController.put_body_comment);
router.delete("/:code",validateToken.ValidateToken, commentController.delete_comment);

module.exports = router;
