const { rejects } = require("assert");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { resolve } = require("path");
const moment = require("moment")

const Payment = require("../models/payment");


const experss = require("express");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRI)


exports.post_create_stripe_checkout_session = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
      });
    


      console.log(session.url,'sesstion')

      // res.redirect(303, session.url);
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};




exports.post_momo = async (reqs, result) => {
  
  const errors = validationResult(reqs);
  if (!errors.isEmpty()) {
    return result.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      console.log(reqs.body,"aaaaa----------------a");

      var partnerCode = "MOMO";
      var accessKey = "F8BBA842ECF85";
      var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      var requestId = partnerCode + new Date().getTime();
      var orderId = requestId;
      var orderInfo = "pay with MoMo";
      var redirectUrl = "http://localhost:3000/checkout";
      var ipnUrl = "https://callback.url/notify";
      // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
      var amount =  String(reqs.body.price)
      var requestType = "captureWallet";
      var extraData = ""; //pass empty value if your merchant does not have stores

      //before sign HMAC SHA256 with format
      //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
      var rawSignature =
        "accessKey=" +
        accessKey +
        "&amount=" +
        amount +
        "&extraData=" +
        extraData +
        "&ipnUrl=" +
        ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&partnerCode=" +
        partnerCode +
        "&redirectUrl=" +
        redirectUrl +
        "&requestId=" +
        requestId +
        "&requestType=" +
        requestType;
      //puts raw signature
      // console.log("--------------------RAW SIGNATURE----------------");
      console.log(rawSignature);
      //signature
      const crypto = require("crypto");
      var signature = crypto
        .createHmac("sha256", secretkey)
        .update(rawSignature)
        .digest("hex");
      // console.log("--------------------SIGNATURE----------------");
      // console.log(signature);

      //json object send to MoMo endpoint
      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: "en",
      });
      //Create the HTTPS objects
      const https = require("https");
      const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      };
      //Send the request and get the response

      // const x = (options) => {
      //   return new Promise((resolve,rejects) => {
      //     const req = https.request(options, (res) => {
      //       console.log(`Status: ${res.statusCode}`);
      //       console.log(`Headers: ${JSON.stringify(res.headers)}`);
      //       res.setEncoding("utf8");
      //       res.on("data", (body) => {
      //        resolve( JSON.parse(body).payUrl)
    
      //         // console.log("Body: ");
      //         // console.log(body);
      //         // console.log("payUrl: ");
      //         // console.log(JSON.parse(body).payUrl);
      //       });
      //       res.on("end", () => {
      //         console.log("No more data in response.");
      //       });
      //     });
    
      //     req.on("error", (e) => {
      //       console.log(`problem with request: ${e.message}`);
      //     });
      //     // write data to request body
      //     // console.log("Sending....");



      //     req.write(requestBody);
      //     req.end();
      //     console.log(url,'url')}
          
      //   )
      // }

      const req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding("utf8");
        res.on("data", (body) => {
         result.status(200).send( JSON.parse(body).payUrl)
          // console.log("Body: ");
          // console.log(body);
          // console.log("payUrl: ");
          // console.log(JSON.parse(body).payUrl);
        });
        res.on("end", () => {
          console.log("quet thanh công");
        });
      });

      req.on("error", (e) => {
        console.log(`problem with request: ${e.message}`);
      });
      // write data to request body
      // console.log("Sending....");



      req.write(requestBody);
      req.end();

     
    

      // return res.status(201).send(await x(options));
    } catch (error) {
      result.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};



exports.post_vnpay = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      console.log(req.body.price,'price')
   
      process.env.TZ = 'Asia/Ho_Chi_Minh';
    



      let date = new Date();
      let createDate = moment(date).format('YYYYMMDDHHmmss');
      
      let ipAddr = "13.16.92.202"
          // req.connection.remoteAddress ||
          // req.socket.remoteAddress ||
          // req.connection.socket.remoteAddress;
  
      // let config = require('config');
      
      let tmnCode = "E012G2GF";
      let secretKey = "LYLKXSDQOWNXEMAHSPJBQHYCLNKHPGCM"
      let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
      let returnUrl = "https://localhost:3000"
      let orderId = "12345";
      let amount = "50000";
      let bankCode = "NCB";
      
      let locale = "vn";
      // if(locale === null || locale === ''){
      //     locale = 'vn';
      // }
      let currCode = 'VND';
      let vnp_Params = {};
      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = tmnCode;
      vnp_Params['vnp_Locale'] = locale;
      vnp_Params['vnp_CurrCode'] = currCode;
      vnp_Params['vnp_TxnRef'] = orderId;
      vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
      vnp_Params['vnp_OrderType'] = 'billpayment';
      vnp_Params['vnp_Amount'] = amount * 100;
      vnp_Params['vnp_ReturnUrl'] = returnUrl;
      vnp_Params['vnp_IpAddr'] = ipAddr;
      vnp_Params['vnp_CreateDate'] = createDate;
      if(bankCode !== null && bankCode !== ''){
          vnp_Params['vnp_BankCode'] = bankCode;
      }
  
      // vnp_Params = sortOxbject(vnp_Params);
  
      let querystring = require('qs');
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");     
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex"); 
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
  

      console.log(vnpUrl,'vnpUrl')

        // res.status(200).send(vnpUrl);
        // res.redirect(vnpUrl)
 
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};


exports.post_payment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let payment = new Payment();
      payment.name = req.body.name;
      payment.create_date = req.body.create_date;

      payment.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add Payment.",
          });
        } else {
          return res.status(201).send({
            message: "Payment register successfully.",
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.post_payment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let payment = new Payment();
      payment.name = req.body.name;
      payment.create_date = req.body.create_date;

      payment.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add Payment.",
          });
        } else {
          return res.status(201).send({
            message: "Payment register successfully.",
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.get_payment = async (req, res) => {
  Payment.find(
    {
      _id: req.params.code,
    },
    function (err, result) {
      if (err) {
        throw err;
      } else {
        res.json({
          data: result,
        });
      }
    }
  );
};

exports.get_payments = async (req, res) => {
  Payment.find(function (err, results) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({
        data: {
          results,
        },
      });
    }
  });
};

exports.put_payment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Payment.update(
        {
          _id: req.params.code,
        },
        {
          name: req.body.name,
          create_date: req.body.create_date,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Payment update failed",
            });
          } else {
            return res.status(201).send({
              message: "Accont update successfully.",
            });
          }
        }
      );
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.delete_payment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Payment.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "Payment delete successfully.",
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};
