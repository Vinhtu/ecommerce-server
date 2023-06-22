const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");



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


// router.get("/:code",authenToken, cartController.get_cart);
// router.get("/account/:code",authenToken, cartController.get_cart_account);
// router.get("/",authenToken, cartController.get_carts);
// router.post("/",authenToken, cartController.post_cart);
// router.put("/:code",authenToken, cartController.put_cart);
// router.delete("/:code",authenToken, cartController.delete_cart);


router.get("/:code", cartController.get_cart);
router.get("/account/:code", cartController.get_cart_account);
router.get("/", cartController.get_carts);
router.post("/", cartController.post_cart);
router.put("/:code", cartController.put_cart);
router.delete("/:code", cartController.delete_cart);

module.exports = router;
