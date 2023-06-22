const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");




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


// router.get("/:code", orderController.get_order);
// router.get("/account/:code", authenToken, orderController.get_order_account);
// router.get("/", orderController.get_orders);
// router.post("/", authenToken, orderController.post_order);
// router.put("/:code", authenToken, orderController.put_order);
// router.put("/cancel/:code", authenToken, orderController.put_cancel_order);

// router.delete("/:code", authenToken, orderController.delete_order);



router.get("/:code", orderController.get_order);
router.get("/account/:code", orderController.get_order_account);
router.get("/", orderController.get_orders);
router.post("/", orderController.post_order);
router.put("/:code", orderController.put_order);
router.put("/cancel/:code", orderController.put_cancel_order);

router.delete("/:code", orderController.delete_order);

module.exports = router;
