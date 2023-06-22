const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event");
const validateToken = require("../utils/validateToken");

router.get("/:code", eventController.get_event);
router.get("/date/:code", eventController.get_event_date);
router.get("/account/:code", eventController.get_event_account);
router.get("/", eventController.get_events);
router.post("/", validateToken.ValidateToken, eventController.post_event);
router.put("/:code", validateToken.ValidateToken, eventController.put_event);
router.delete(
  "/:code",
  validateToken.ValidateToken,
  eventController.delete_event
);

module.exports = router;
