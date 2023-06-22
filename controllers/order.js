const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Notification = require("../models/notification");
const nodemailer = require("nodemailer");
const transporter = require("../config/mail");
const Order = require("../models/order");
const OrderItem = require("../models/orderitem");
const mailer = require("../utils/mailer");
const mailContent = require("../utils/mailcontent");
var paypal = require("paypal-rest-sdk");
const Account = require("../models/account");
const Voucher = require("../models/voucher");
const Size = require("../models/size");
const Product = require("../models/product");
const OrderSuccess = require("../utils/MailContent/OrderSuccess");
const OrderFail = require("../utils/MailContent/OrderFail");
const CancelOrder = require("../utils/MailContent/CancelOrder");
const OrderRunning = require("../utils/MailContent/OrderRunning");
const OrderComplete = require("../utils/MailContent/OrderComplete");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AXWrwDeP7g67oqX4Chgl-73CB8eAFK9pK1zawRMyK5RpMd6Yra3kHBawX5TbbDnDI-FyK8Z-YeeyLWix",
  client_secret:
    "EL9NSA--mJjdF6PEVFwNYPdmFwHkr6G6B9mUB-4bi-YtjZ5Za06cVQpH2vg4K7ZYvcuRtykU8kCsJ2ko",
});

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}


exports.post_order = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {

      let order = new Order();

      order.code = req.body.code;
      order.account = req.body.cartList.data[0].account;
      order.t_price =
        parseInt(req.body.cartList.data[0].t_price) +
        parseInt(req.body.cartList.data[0].t_ship) -
        parseInt(req.body.voucher.p_price ? req.body.voucher.p_price : 0);

      order.t_product_price = req.body.cartList.data[0].t_price;
      order.amount = req.body.cartList.data[0].amount;
      order.t_ship = req.body.cartList.data[0].t_ship;
      order.create_date = new Date();
      order.status = req.body.status ? req.body.status : "Pending" 
      order.type_pay = req.body.typePay;
      order.status_pay = req.body.statusPay;

      //su ly sau
      // order.p_price = req.body.cartList.data[0].t_price;
      // order.voucher = req.body.voucher;

      Account.find({ _id: req.body.cartList.data[0].account }).exec(
        (err, resultAccount) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add comment.",
            });
          } else {
            order.streetAddress = resultAccount[0].streetAddress;
            order.wardCommunedistrictAddress =
              resultAccount[0].wardCommunedistrictAddress;
            order.cityAddress = resultAccount[0].cityAddress;
            order.zipAddress = resultAccount[0].zipAddress;

            if (req.body.voucher?.code) {
              Voucher.find({ code: req.body.voucher.code }).exec(
                (err, resultVoucher) => {
                  if (err) {
                    return res.status(400).send({
                      message: "Failed to add comment.",
                    });
                  } else {
                    resultAccount[0].voucher = resultAccount[0].voucher;

                    removeElement(
                      resultAccount[0].voucher,
                      resultVoucher[0]._id
                    );

                    resultAccount[0].save((err, doc) => {
                      if (err) {
                        return res.status(400).send({
                          message: "Failed to add comment.",
                        });
                      } else {
                      }
                    });
                  }
                }
              );

              order.voucher = req.body.voucher._id;
              order.p_price = req.body.voucher.p_price;
            }

            order.save((err, resultOrder) => {
              if (err) {
                return res.status(400).send({
                  message: "Failed to add comment.",
                });
              } else {
                for (
                  let i = 0;
                  i < req.body.cartList.data[0].cartitem.length;
                  i += 1
                ) {
                  let orderitem = new OrderItem();
                  orderitem.product =
                    req.body.cartList.data[0].cartitem[i].product._id;

                  orderitem.color = req.body.cartList.data[0].cartitem[i].color;
                  orderitem.size = req.body.cartList.data[0].cartitem[i].size;
                  orderitem.price = req.body.cartList.data[0].cartitem[i].price;
                  orderitem.amount =
                    req.body.cartList.data[0].cartitem[i].amount;
                  orderitem.note = req.body.cartList.data[0].cartitem[i].note;
                  orderitem.ship = req.body.cartList.data[0].cartitem[i].ship;
                  orderitem.ship_start =
                    req.body.cartList.data[0].cartitem[i].ship_start;
                  orderitem.ship_end =
                    req.body.cartList.data[0].cartitem[i].ship_end;

                  // mailer.sendMail(
                  //   resultAccount[0].username,
                  //   "Order Succes",
                  //   mailContent.OrderFailMail()
                  // );
                  orderitem.save((err, resultOrderItem) => {
                    if (err) {
                      return res.status(400).send({
                        message: "Failed to add comment.",
                      });
                    } else {
                      resultOrder.orderitem.push(resultOrderItem._id);

                      if (i === req.body.cartList.data[0].cartitem.length - 1) {
                        resultOrder.save((err, doc) => {
                          if (err) {
                            return res.status(400).send({
                              message: "Failed to add comment.",
                            });
                          } else {
                            let notification = new Notification();

                            notification.code = req.body.code;
                            notification.account_send = req.body.accountId;
                            notification.account_receive = req.body.accountId;
                            notification.title = "Đặt hàng thành công";
                            notification.sub_title = "Đặt hàng thành công";
                            notification.body =
                              "Đơn hàng của bạn đang được xem xét";
                            notification.status = "Pending";
                            notification.role = "Order";

                            notification.save((err, resultNotification) => {
                              if (err) {
                                return res.status(400).send("fail");
                              } else {
                                Order.find({ _id: doc._id })
                                  .populate({
                                    path: "orderitem",
                                    populate: [
                                      {
                                        path: "product",
                                        populate: [
                                          {
                                            path: "color",
                                            populate: [{ path: "size" }],
                                          },
                                          { path: "thumbnail_children" },
                                          { path: "description" },
                                        ],
                                      },
                                    ],
                                  })
                                  .populate("account")
                                  .populate("voucher")
                                  .exec((err, data) => {
                                    if (err) {
                                      return res.status(400).send({
                                        message: err,
                                      });
                                    } else {
                                      mailer.sendMail(
                                        resultAccount[0].username,
                                        "Order Succes",
                                        OrderSuccess.OrderSuccess(data[0])
                                      );

                                      for (
                                        let i = 0;
                                        i <
                                        req.body.cartList.data[0].cartitem
                                          .length;
                                        i += 1
                                      ) {
                                        Product.find({
                                          _id: req.body.cartList.data[0]
                                            .cartitem[i].product._id,
                                        })
                                          .populate("thumbnail_children")
                                          .populate("color")
                                          .populate("description")
                                          .populate({
                                            path: "comment",
                                            populate: [
                                              {
                                                path: "account",
                                              },
                                            ],
                                            populate: [
                                              {
                                                path: "likecomment",
                                                populate: [{ path: "account" }],
                                              },
                                            ],
                                            populate: [
                                              {
                                                path: "replycomment",
                                                populate: [{ path: "account" }],
                                              },
                                            ],
                                          })
                                          .populate({
                                            path: "color",
                                            populate: [{ path: "size" }],
                                          })
                                          .exec((err, productCurrentChange) => {
                                            if (err) {
                                              return res.status(400).send({
                                                message:
                                                  err +
                                                  "Get list product failed",
                                              });
                                            } else {
                                          

                                              for (
                                                let c = 0;
                                                c <
                                                productCurrentChange[0].color
                                                  .length;
                                                c += 1
                                              ) {
                                                if (
                                                  productCurrentChange[0].color[
                                                    c
                                                  ].name ===
                                                  req.body.cartList.data[0]
                                                    .cartitem[i].color
                                                ) {
                                                  for (
                                                    let j = 0;
                                                    j <
                                                    productCurrentChange[0]
                                                      .color[c]?.size?.length;
                                                    j += 1
                                                  ) {
                                                    if (
                                                      productCurrentChange[0]
                                                        .color[c].size[j]
                                                        .name ===
                                                      req.body.cartList.data[0]
                                                        .cartitem[i].size
                                                    ) {
                                                      Size.find({
                                                        _id: productCurrentChange[0]
                                                          .color[c].size[j]._id,
                                                      }).exec(
                                                        (err, sizeCurrent) => {
                                                          if (err) {
                                                            mailer.sendMail(
                                                              resultAccount[0]
                                                                .username,
                                                              "Order Fail",
                                                              mailContent.OrderFailMail(
                                                                data[0]
                                                              )
                                                            );
                                                            return res
                                                              .status(400)
                                                              .send({
                                                                message: err,
                                                              });
                                                          } else {
                                                         

                                                            Size.update(
                                                              {
                                                                _id: productCurrentChange[0]
                                                                  .color[c]
                                                                  .size[j]._id,
                                                              },
                                                              {
                                                                amount:
                                                                  parseInt(
                                                                    sizeCurrent[0]
                                                                      .amount
                                                                  ) -
                                                                  parseInt(
                                                                    req.body
                                                                      .cartList
                                                                      .data[0]
                                                                      .cartitem[
                                                                      i
                                                                    ].amount
                                                                  ),
                                                              },
                                                              (err, data) => {
                                                                if (err) {
                                                                  mailer.sendMail(
                                                                    resultAccount[0]
                                                                      .username,
                                                                    "Order Fail",
                                                                    mailContent.OrderFailMail(
                                                                      data[0]
                                                                    )
                                                                  );
                                                                  return res
                                                                    .status(400)
                                                                    .send(
                                                                      "faild"
                                                                    );
                                                                } else {
                                                               

                                                                  Product.update(
                                                                    {
                                                                      _id: productCurrentChange[0]
                                                                        ._id,
                                                                    },
                                                                    {
                                                                      amount_sale:
                                                                        parseInt(
                                                                          productCurrentChange[0]
                                                                            .amount_sale
                                                                        ) +
                                                                        parseInt(
                                                                          req
                                                                            .body
                                                                            .cartList
                                                                            .data[0]
                                                                            .cartitem[
                                                                            i
                                                                          ]
                                                                            .amount
                                                                        ),
                                                                    },
                                                                    (
                                                                      err,
                                                                      data
                                                                    ) => {
                                                                      if (err) {
                                                                        mailer.sendMail(
                                                                          resultAccount[0]
                                                                            .username,
                                                                          "Order Fail",
                                                                          mailContent.OrderFailMail(
                                                                            data[0]
                                                                          )
                                                                        );
                                                                        return res
                                                                          .status(
                                                                            400
                                                                          )
                                                                          .send(
                                                                            "faild"
                                                                          );
                                                                      } else {
                                                                        // return res.status(201).send('success');
                                                                      

                                                                        if (
                                                                          i ===
                                                                            req
                                                                              .body
                                                                              .cartList
                                                                              .data[0]
                                                                              .cartitem
                                                                              .length -
                                                                              1 &&
                                                                          c ===
                                                                            productCurrentChange[0]
                                                                              .color
                                                                              .length -
                                                                              1
                                                                        ) {
                                                                          return res
                                                                            .status(
                                                                              201
                                                                            )
                                                                            .send(
                                                                              "success"
                                                                            );
                                                                        }
                                                                      }
                                                                    }
                                                                  );
                                                                }
                                                              }
                                                            );
                                                          }
                                                        }
                                                      );
                                                    }
                                                    // console.log(productCurrentChange[0].color[i], 'color')
                                                  }
                                                }
                                              }
                                            }
                                          });
                                      }
                                    }
                                  });
                              }
                            });
                          }
                        });
                      }
                    }
                  });
                }
              }
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

exports.get_order = async (req, res) => {
  Order.find({ _id: req.params.code })
    .populate({
      path: "orderitem",
      populate: [
        {
          path: "product",
          populate: [
            { path: "color", populate: [{ path: "size" }] },
            { path: "thumbnail_children" },
            { path: "description" },
          ],
        },
      ],
    })
    .populate("account")
    .populate("voucher")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        res.status(200).send(data[0]);
      }
    });
};

exports.get_order_account = async (req, res) => {
  Order.find({ account: req.params.code })
    .populate({
      path: "orderitem",
      populate: [
        {
          path: "product",
          populate: [
            { path: "color", populate: [{ path: "size" }] },
            { path: "thumbnail_children" },
            { path: "description" },
          ],
        },
      ],
    })
    .populate("account")
    .populate("voucher")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.get_orders = async (req, res) => {
  Order.find()
    .populate({
      path: "orderitem",
      populate: [
        {
          path: "product",
          populate: [
            { path: "color", populate: [{ path: "size" }] },
            { path: "thumbnail_children" },
            { path: "description" },
          ],
        },
      ],
    })
    .populate("account")
    .populate("voucher")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        res.json({
          data: {
            results: data,
          },
        });
      }
    });
};

exports.put_order = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.find({ _id: req.params.code })
        .populate({
          path: "orderitem",
          populate: [
            {
              path: "product",
              populate: [
                { path: "color", populate: [{ path: "size" }] },
                { path: "thumbnail_children" },
                { path: "description" },
              ],
            },
          ],
        })
        .populate("account")
        .populate("voucher")
        .exec((err, dataOrder) => {
          if (err) {
            return res.status(400).send({
              message: err,
            });
          } else {
            Order.update(
              {
                _id: req.params.code,
              },
              {
                status: req.body.status,
              },
              (err, data) => {
                if (err) {
                  return res.status(400).send({
                    message: "order update failed",
                  });
                } else {
                  let notification = new Notification();

                  notification.code = req.body.code;
                  notification.account_send = dataOrder[0].account._id;
                  notification.account_receive = dataOrder[0].account._id;

                  if (req.body.status === "Accept") {
                    notification.title = "Đặt hàng thành công";
                    notification.sub_title = "Đặt hàng thành công";
                    notification.body =
                      "Đơn hàng của bạn đã được tiếp nhận và đang đóngg gói";
                    notification.status = "Pending";
                  } else if (req.body.status === "Canceled") {
                    mailer.sendMail(
                      dataOrder[0].account.username,
                      "Order Cancel",
                      CancelOrder.CancelOrderMail(dataOrder[0])
                    );

                    notification.title = "Huỷ đơn hàng thành công";
                    notification.sub_title = "Huỷ đơn hàng";
                    notification.body = "Đơn hàng của quý khách đã bị huỷ";
                    notification.status = "Pending";
                  } else if (req.body.status === "Runing") {
                    notification.title = "Đơn hàng đang vận chuyển";
                    notification.sub_title = "Đơn hàng đangg vận chuyển";
                    notification.body =
                      "Đơn hàng đangg vận chuyển, hãy giữ liên lạc để nhận được hàng";
                    notification.status = "Pending";

                    mailer.sendMail(
                      dataOrder[0].account.username,
                      "Order Running",
                      OrderRunning.OrderRuning(dataOrder[0])
                    );
                  } else if (req.body.status === "Complete") {
                    notification.title = "Đơn hàng giao thành công";
                    notification.sub_title = "Đơn hàng giao thành công";
                    notification.body =
                      "Đơn hàng của bạn đã được giao thành công vui lòng đánh giá sản phẩm";
                    notification.status = "Pending";

                    mailer.sendMail(
                      dataOrder[0].account.username,
                      "Order Complete",
                      OrderComplete.OrderComplete(dataOrder[0])
                    );
                  }

                  notification.role = "Order";
                  notification.save((err, resultNotification) => {
                    if (err) {
                      return res.status(400).send("fail");
                    } else {
                      return res.status(201).send("success");
                    }
                  });
                }
              }
            );
          }
        });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.put_cancel_order = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.find({ _id: req.params.code })
        .populate({
          path: "orderitem",
          populate: [
            {
              path: "product",
              populate: [
                { path: "color", populate: [{ path: "size" }] },
                { path: "thumbnail_children" },
                { path: "description" },
              ],
            },
          ],
        })
        .populate("account")
        .populate("voucher")
        .exec((err, dataOrder) => {
          if (err) {
            return res.status(400).send({
              message: err,
            });
          } else {
            Order.update(
              {
                _id: req.params.code,
              },
              {
                status: "Canceled",
              },
              (err, data) => {
                if (err) {
                  return res.status(400).send({
                    message: "order update failed",
                  });
                } else {
       

                  let notification = new Notification();

                  notification.code = req.body.code;
                  notification.account_send = dataOrder[0].account._id;
                  notification.account_receive = dataOrder[0].account._id;

                  mailer.sendMail(
                    dataOrder[0].account.username,
                    "Order Cancel",
                    CancelOrder.CancelOrderMail(dataOrder[0])
                  );

                  notification.title = "Huỷ đơn hàng thành công";
                  notification.sub_title = "Huỷ đơn hàng";
                  notification.body = "Đơn hàng của quý khách đã bị huỷ";
                  notification.status = "Pending";

                  notification.role = "Order";
                  notification.save((err, resultNotification) => {
                    if (err) {
                      return res.status(400).send("fail");
                    } else {
                      return res.status(201).send("success");
                    }
                  });
                }
              }
            );
          }
        });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.delete_order = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send("fail");
        } else {
          return res.status(201).send("success");
        }
      });
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};
