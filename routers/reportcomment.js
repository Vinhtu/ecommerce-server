const express = require("express");
const router = express.Router();

const reportcommentController = require("../controllers/reportcomment");
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


// router.get("/:code", reportcommentController.get_reportcomment);
// router.put("/like/:code", reportcommentController.put_like_reportcomment);
// router.put("/reply/:code", reportcommentController.put_reply_reportcomment);
// router.get("/", reportcommentController.get_reportcomments);
// router.post("/:code",authenToken, reportcommentController.post_reportcomment);
// router.put("/:code", reportcommentController.put_reportcomment);
// router.delete("/:code", reportcommentController.delete_reportcomment);


router.post("/:code", reportcommentController.post_reportcomment);

module.exports = router;
