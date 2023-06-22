const express = require("express");
const router = express.Router();

const mailController = require("../controllers/mail");

router.get("/:code", mailController.get_mail);
router.get("/", mailController.get_mails);
router.post("/", mailController.post_mail);
router.put("/:code", mailController.put_mail);
router.delete("/:code", mailController.delete_mail);

module.exports = router;
