
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();


exports.ValidateToken  = (req,res,next) => {
   //Beaer [token]

   // const token = req.headers["authorization"].split(' ')[1];
   // console.log(req.headers["authorization"], token,'token')

   // if(!token){
   //  res.status(401);
   // }

   // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
   //  if(err) res.send(403);
   //  next();
   // })

   next();

}