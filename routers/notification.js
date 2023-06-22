const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notification");

const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
const authenToken = (req,res,next) => {
   //Beaer [token]

   const token = req.headers["authorization"].split(' ')[1];

   if(!token){
    res.status(401);
   }

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if(err) res.send(403);
    next();
   })

}

// router.get("/:code", authenToken, notificationController.get_notification);
// router.get("/account/:code", authenToken, notificationController.get_notification_account);
// router.get("/",authenToken, notificationController.get_notifications);
// router.get("/admin/all",authenToken, notificationController.get_notification_admin);
// router.get("/admin/account",authenToken, notificationController.get_notification_admin_account);
// router.post("/",authenToken ,notificationController.post_notification);
// router.put("/:code",authenToken, notificationController.put_notification);
// // router.delete("/:code",authenToken, notificationController.delete_notification);



router.get("/:code", notificationController.get_notification);
router.get("/account/:code", notificationController.get_notification_account);
router.get("/", notificationController.get_notifications);
router.get("/admin/all", notificationController.get_notification_admin);
router.get("/admin/account", notificationController.get_notification_admin_account);
router.post("/" ,notificationController.post_notification);
router.put("/:code", notificationController.put_notification);
// router.delete("/:code",authenToken, notificationController.delete_notification);

module.exports = router;
