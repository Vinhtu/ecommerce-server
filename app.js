require("dotenv").config();

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser"); //Doc cac thong tin nguoi dung gui du lieu len server cho chung ta
var morgan = require("morgan"); //log cac request den
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var config = require("./config");
const multer = require("multer");

var app = express();
var port = process.env.PORT || 8080; //xet port thong qua 1 bien moi truong

//setup Controller API
var userControllers = require("./api/controllers/userControllers");
var resApiUserControllers = require("./api/controllers/resApiUserControllers");
var accountControllers = require("./api/controllers/accountControllers");
var sessionMiddleware = require("./session.middleware");
var productControllers = require("./api/controllers/productControllers");
var jobControllers = require("./api/controllers/jobControllers");

app.use("/assets", express.static(__dirname + "/public")); //de cho nguoi dung truy cam vao tai nguyen tinh
app.use(bodyParser.json());
app.use(bodyParser.json()); // doc kieu du lieu tu nguoi dung gui len la json
app.use(bodyParser.urlencoded({ extended: true })); // chap nhan tat ca kieu du lieu post len server, khong chi co key value
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(morgan("dev")); //log moi cau hinh resq ra console
app.use(cors());

app.set("view engine", "ejs");
const fileupload = require("express-fileupload");
app.use(fileupload());
app.use(require("skipper")());

//ket noi vs co so du lieu
mongoose
  .connect(config.getDBConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("dat ket noi thanh cong");
    },
    (err) => {
      console.log("Error");
    }
  );






  //Ham promise doc file

// const fs = require("fs");
// const csv = require("csv-parser");
// const { resolve } = require("path");
// const { rejects } = require("assert");
// var partnerCode = "MOMO";
// var accessKey = "F8BBA842ECF85";
// var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
// var requestId = partnerCode + new Date().getTime();
// var orderId = requestId;
// var orderInfo = "pay with MoMo";
// var redirectUrl = "https://momo.vn/return";
// var ipnUrl = "https://callback.url/notify";
// // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
// var amount = "50000";
// var requestType = "captureWallet"
// var extraData = ""; //pass empty value if your merchant does not have stores

// //before sign HMAC SHA256 with format
// //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
// var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
// //puts raw signature
// console.log("--------------------RAW SIGNATURE----------------")
// console.log(rawSignature)
// //signature
// const crypto = require('crypto');
// var signature = crypto.createHmac('sha256', secretkey)
//     .update(rawSignature)
//     .digest('hex');
// console.log("--------------------SIGNATURE----------------")
// console.log(signature)

// //json object send to MoMo endpoint
// const requestBody = JSON.stringify({
//     partnerCode : partnerCode,
//     accessKey : accessKey,
//     requestId : requestId,
//     amount : amount,
//     orderId : orderId,
//     orderInfo : orderInfo,
//     redirectUrl : redirectUrl,
//     ipnUrl : ipnUrl,
//     extraData : extraData,
//     requestType : requestType,
//     signature : signature,
//     lang: 'en'
// });
// //Create the HTTPS objects
// const https = require('https');
// const options = {
//     hostname: 'test-payment.momo.vn',
//     port: 443,
//     path: '/v2/gateway/api/create',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(requestBody)
//     }
// }
// //Send the request and get the response
// const req = https.request(options, res => {
//     console.log(`Status: ${res.statusCode}`);
//     console.log(`Headers: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     res.on('data', (body) => {
//         console.log('Body: ');
//         console.log(body);
//         console.log('payUrl: ');
//         console.log(JSON.parse(body).payUrl);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     });
// })

// req.on('error', (e) => {
//     console.log(`problem with request: ${e.message}`);
// });
// // write data to request body
// console.log("Sending....")
// req.write(requestBody);
// req.end();

app.use("/", require("./routers/index"));

//cau hinh cac dinh tuyen
// app.get("/", function (req, res) {
//   res.render("index");
// });

app.listen(port, function () {
  console.log("server is running", port);
});

console.log(process.env.SESSION_SECRET, "env");
