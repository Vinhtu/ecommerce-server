const express = require("express");
const router = express.Router();




const accountController = require("../controllers/account");


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
   //  if(err) res.sendStatus(403);
    next();
   })

}


router.get("/create", accountController.create);
router.post("/login", accountController.login);
router.post("/logout", accountController.logout);
router.post("/refreshtoken", accountController.refreshToken);
router.post("/register", accountController.register);
// router.get("/:code",authenToken, accountController.get_account);
// router.get("/",authenToken, accountController.get_accounts);
// router.post("/date/month", authenToken, accountController.post_account_date);
// router.put("/order/:code",authenToken, accountController.put_account_order);
// router.put("/:code",authenToken, accountController.put_account);
// router.put("/password/:code",authenToken, accountController.put_account_password);
// router.put("/give/voucher/:code", authenToken, accountController.put_account_give_voucher);
// router.delete("/:code", authenToken, accountController.delete_account);


router.get("/:code", accountController.get_account);
router.get("/", accountController.get_accounts);
router.post("/date/month", accountController.post_account_date);
router.put("/order/:code", accountController.put_account_order);
router.put("/:code", accountController.put_account);
router.put("/password/:code", accountController.put_account_password);
router.put("/give/voucher/:code", accountController.put_account_give_voucher);
router.delete("/:code", accountController.delete_account);

module.exports = router;
