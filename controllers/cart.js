const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const cart = require("../models/cart");
const Account = require("../models/account");
const Product = require("../models/product");
const axios = require("axios");
const Cart = require("../models/cart");
const CartItem = require("../models/cartitem");
const { get_ship } = require("./ship");
const { assign } = require("nodemailer/lib/shared");
const tp = "tp";
const dtp = "dtp";
const vm = "vm";
const dvn = "dvm";

const tp_money = "11000";
const dtp_money = "31000";
const vm_money = "26500";
const dvm_money = "48500";

const current_date = new Date();

const MB = [
  "Lào Cai",
  "Yên Bái",
  "Điện Biên",
  "Hoà Bình",
  "Lai Châu",
  "Sơn La",
  "Hà Giang",
  "Cao Bằng",
  "Bắc Kạn",
  "Lạng Sơn",
  "Tuyên Quang",
  "Thái Nguyên",
  "Phú Thọ",
  "Bắc Giang",
  "Quảng Ninh",
  "Bắc Ninh",
  "Hà Nam",
  "Hà Nội",
  "Hải Dương",
  "Hải Phòng",
  "Hưng Yên",
  "Nam Định",
  "Ninh Bình",
  "Thái Bình",
  "Vĩnh Phúc",
];

const MT = [
  "Thanh Hoá",
  "Nghệ An",
  "Hà Tĩnh",
  "Quảng Bình",
  "Quảng Trị",
  "Thừa Thiên-Huế",
  "Đà Nẵng",
  "Quảng Nam",
  "Quảng Ngãi",
  "Bình Định",
  "Phú Yên",
  "Khánh Hoà",
  "Ninh Thuận",
  "Bình Thuận",
  "Kon Tum",
  "Gia Lai",
  "Đắc Lắc",
  "Đắc Nông",
  "Lâm Đồng",
];

const MN = [
  "Bình Phước",
  "Bình Dương",
  "Đồng Nai",
  "Tây Ninh",
  "Bà Rịa-Vũng Tàu",
  "Thành phố Hồ Chí Minh",
  "Long An",
  "Đồng Tháp",
  "Tiền Giang",
  "An Giang",
  "Bến Tre",
  "Vĩnh Long",
  "Trà Vinh",
  "Hậu Giang",
  "Kiên Giang",
  "Sóc Trăng",
  "Bạc Liêu",
  "Cà Mau",
  "Thành phố Cần Thơ",
  "Đảo Phú Quốc",
];

const validationArea = (city) => {
  if (MB.includes(city)) {
    return "MB";
  } else if (MT.includes(city)) {
    return "MT";
  } else if (MN.includes(city)) {
    return "MN";
  }
};

const validationDateShip = (
  account_city,
  product_city,
  typeAreaAccount,
  typeAreaProduct
) => {
  if (account_city === product_city) {
    return current_date.setDate(current_date.getDate() + 2);
  } else if (
    account_city !== product_city &&
    typeAreaAccount === typeAreaProduct
  ) {
    return current_date.setDate(current_date.getDate() + 3);
  } else if (typeAreaAccount === typeAreaProduct) {
    return current_date.setDate(current_date.getDate() + 2);
  } else if (typeAreaAccount !== typeAreaProduct) {
    return current_date.setDate(current_date.getDate() + 3);
  }
};

const token = "90ce8fc1-612b-11ed-b824-262f869eb1a7";

const get_province_id = (account_city) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(
          " https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              token: `${token}`,
            },
          }
        )
        .then((res) => {
          res?.data?.data?.forEach((element) => {
            if (element?.NameExtension?.includes(account_city)) {
              resolve(element.ProvinceID);
            }
          });
        })
        .catch();
    } catch (err) {
      reject(err);
    }
  });
};

const get_district_id = (province_id, account_district) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
          {
            province_id: province_id,
          },
          {
            headers: {
              token: `${token}`,
            },
          }
        )
        .then((res) => {
          res.data.data.forEach((element) => {
            if (
              element?.NameExtension?.includes(account_district) ||
              element?.DistrictName === account_district
            ) {
              resolve(element.DistrictID);
            }
          });
        })
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

const get_ward_id = (district_id, account_ward) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          " https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
          {
            district_id: district_id,
          },
          {
            headers: {
              token: `${token}`,
            },
          }
        )
        .then((res) => {
          res?.data?.data?.forEach((element) => {
            if (
              element?.NameExtension?.includes(account_ward) ||
              element?.WardName === account_ward
            ) {
              resolve(element.WardCode);
            }
          });
        })
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

const get_service_id = (shop_id, from_district, to_district) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
          {
            shop_id,
            from_district: from_district,
            to_district: to_district,
          },
          {
            headers: {
              token: `${token}`,
            },
          }
        )
        .then((res) => {
          resolve(res.data.data[0].service_id);
        })
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

const get_ship_ghn = (shop_id, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          data,
          {
            headers: {
              token: `${token}`,
              shop_id,
            },
          }
        )
        .then((res) => {
          resolve(res.data.data.total)
        })
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

const validationCity = async (
  account,
  shop,
  typeAreaAccount,
  typeAreaProduct
) => {
  const account_city = "Thành phố Hồ Chí Minh";
  const account_district = "Thành Phố Thủ Đức";
  const account_ward = "Phường Trường Thọ";
  // console.log(account_city, "account city");
  const shop_city = "Thành phố Hồ Chí Minh";
  const shop_district = "Quận 1";
  const shop_ward = "Phường Tân Định";

  const shop_id = 3439972;

  const province_id_shop = await get_province_id(shop?.cityAddress);

  const district_id_shop = await get_district_id(
    province_id_shop,
    shop?.wardCommunedistrictAddress
  );

  const WardCode_shop = await get_ward_id(district_id_shop, shop?.streetAddress);

  const province_id_account = await get_province_id(account?.cityAddress);

  const district_id_account = await get_district_id(
    province_id_account,
    account?.wardCommunedistrictAddress
  );

  const WardCode_account = await get_ward_id(district_id_account, account?.streetAddress);

  const service_id = await get_service_id(
    shop_id,
    district_id_shop,
    district_id_account
  );

  const data = {
    service_id: service_id,
    insurance_value: 500000,
    coupon: null,
    from_district_id: district_id_shop,
    to_district_id: district_id_account,
    to_ward_code: `${WardCode_account}`,
    height: 15,
    length: 15,
    weight: 1000,
    width: 15,
  };

  const data_price_ship = await get_ship_ghn(shop_id, data);

  return data_price_ship

};

exports.create = async (req, res) => {
  var cartExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Cart.create(cartExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_cart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      if (req.body._idcart) {
        Cart.find({
          _id: req.body._idcart,
        }).exec((err, cartCurrent) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            let dem = 0;
            let cartItemFind = [];
            ///vong lap for tim ra exactly cart item.

            if (cartCurrent[0].cartitem.length === 0) {
              Account.find({
                _id: req.body.account,
              }).exec((err, resultAccount) => {
                Product.find({
                  _id: req.body._id,
                })
                  .populate("thumbnail_children")
                  .populate("color")
                  .populate("description")
                  .populate("affilateshop")
                  .populate({
                    path: "comment",
                    populate: [
                      {
                        path: "account",
                      },
                      {
                        path: "likecomment",
                        populate: [{ path: "account" }],
                      },
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
                  .exec( async (err, resultProduct) => {
                    const account_city = resultAccount[0].cityAddress;
                    const product_city =
                      resultProduct[0].affilateshop.cityAddress;

                    const typeAreaAccount = validationArea(account_city);
                    const typeAreaProduct = validationArea(product_city);

                    const resultShip = await validationCity(
                      resultAccount[0],
                      resultProduct[0].affilateshop,
                      typeAreaAccount,
                      typeAreaProduct
                    );
                    const resultShipDate = validationDateShip(
                      account_city,
                      product_city,
                      typeAreaAccount,
                      typeAreaProduct
                    );

                    let cartitem = new CartItem();

                    cartitem.product = req.body._id;
                    cartitem.color = req.body.color;
                    cartitem.size = req.body.size;
                    cartitem.price = req.body.price;
                    cartitem.ship = resultShip;
                    cartitem.ship_start = new Date(resultShipDate);
                    cartitem.ship_end = new Date(
                      current_date.setDate(current_date.getDate() + 6)
                    );
                    cartitem.amount = 1;

                    cartitem.save((err, cartItemResults) => {
                      if (err) {
                        return res.status(400).send({
                          message: "Failed to add cart.",
                        });
                      } else {

                        cartCurrent[0].cartitem.push(cartItemResults._id);
                        cartCurrent[0].t_price =
                          parseInt(cartCurrent[0].t_price) +
                          parseInt(req.body.price) * parseInt(req.body.amount);
                        cartCurrent[0].t_ship =
                          parseInt(cartCurrent[0].t_ship) +
                          parseInt(resultShip);
                        cartCurrent[0].amount =
                          parseInt(cartCurrent[0].amount) +
                          parseInt(req.body.amount);

                        cartCurrent[0].save((err, doc) => {
                          if (err) {
                            return res.status(400).send('fail');
                          } else {

                            return res.status(201).send('success');
                          }
                        });
                      }
                    });
                  });
              });
            } else {
              for (let i = 0; i < cartCurrent[0].cartitem.length; i += 1) {
                CartItem.find({
                  _id: cartCurrent[0].cartitem[i],
                  product: req.body._id,
                  color: req.body.color,
                  price: req.body.price,
                  size: req.body.size,
                }).exec( (err, cartitemCurrent) => {
                  if (err) {
                    return res.status(400).send({
                      message: err + "Get list product failed",
                    });
                  } else {
                    if (cartitemCurrent.length > 0) {
                      dem += 1;
                      cartItemFind = cartitemCurrent;
                    }
                    if (i === cartCurrent[0].cartitem.length - 1) {
                      if (dem === 1) {
                        //tim ra cart item  minh se them amount vao cart
                        CartItem.update(
                          {
                            _id: cartItemFind[0]._id,
                          },
                          {
                            amount:
                              parseInt(cartItemFind[0].amount) +
                              parseInt(req.body.amount),
                          },
                          (err, data) => {
                            if (err) {
                              return res.status(400).send({
                                message: "cart item  update amount failed",
                              });
                            } else {
                              cartCurrent[0].t_price =
                                parseInt(cartCurrent[0].t_price) +
                                parseInt(req.body.price) *
                                  parseInt(req.body.amount);
                              cartCurrent[0].amount =
                                parseInt(cartCurrent[0].amount) +
                                parseInt(req.body.amount);
                              cartCurrent[0].save((err, doc) => {
                                if (err) {
                                  return res.status(400).send('fail');
                                } else {
                                  return res.status(201).send('success');
                                }
                              });
                            }
                          }
                        );
                      } else {
                        //   // khong tim ra cart minh se push 1 cartitem moi vao trong cart

                        Account.find({
                          _id: req.body.account,
                        }).exec( (err, resultAccount) => {
                          Product.find({
                            _id: req.body._id,
                          })
                            .populate("thumbnail_children")
                            .populate("color")
                            .populate("description")
                            .populate("affilateshop")
                            .populate({
                              path: "comment",
                              populate: [
                                {
                                  path: "account",
                                },
                                {
                                  path: "likecomment",
                                  populate: [{ path: "account" }],
                                },
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
                            .exec( async (err, resultProduct) => {
                              const account_city = resultAccount[0].cityAddress;
                              const product_city =
                                resultProduct[0].affilateshop.cityAddress;

                              const typeAreaAccount =
                                validationArea(account_city);
                              const typeAreaProduct =
                                validationArea(product_city);

                              const resultShip = await validationCity(
                                resultAccount[0],
                                resultProduct[0].affilateshop,
                                typeAreaAccount,
                                typeAreaProduct
                              );
                              const resultShipDate = validationDateShip(
                                account_city,
                                product_city,
                                typeAreaAccount,
                                typeAreaProduct
                              );

                              let cartitem = new CartItem();

                              cartitem.product = req.body._id;
                              cartitem.color = req.body.color;
                              cartitem.size = req.body.size;
                              cartitem.price = req.body.price;
                              cartitem.ship = resultShip;
                              cartitem.ship_start = new Date(resultShipDate);
                              cartitem.ship_end = new Date(
                                current_date.setDate(current_date.getDate() + 6)
                              );
                              cartitem.amount = req.body.amount;

                              cartitem.save((err, cartItemResults) => {
                                if (err) {
                                  return res.status(400).send({
                                    message: "Failed to add cart.",
                                  });
                                } else {

                                  cartCurrent[0].cartitem.push(
                                    cartItemResults._id
                                  );
                                  cartCurrent[0].t_price =
                                    parseInt(cartCurrent[0].t_price) +
                                    parseInt(req.body.price) *
                                      parseInt(req.body.amount);
                                  cartCurrent[0].t_ship =
                                    parseInt(cartCurrent[0].t_ship) +
                                    parseInt(resultShip);
                                  cartCurrent[0].amount =
                                    parseInt(cartCurrent[0].amount) +
                                    parseInt(req.body.amount);

                                  cartCurrent[0].save((err, doc) => {
                                    if (err) {
                                      return res.status(400).send('fail');
                                    } else {
                                      return res.status(201).send('success');
                                    }
                                  });
                                }
                              });
                            });
                        });
                      }
                    }
                  }
                });
              }
            }
          }
        });
      } else {
        let cart = new Cart();

        cart.account = req.body.account;
        cart.create_date = new Date();

        cart.save((err, cartResult) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add cart.",
            });
          } else {
            Account.find({
              _id: req.body.account,
            })
              .populate("thumbnail_children")
              .populate("color")
              .populate("rate")
              .populate("description")
              .populate("affilateshop")
              .populate({
                path: "comment",
                populate: [
                  {
                    path: "likecomment",
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
              .populate({
                path: "comment",
                populate: [{ path: "account" }],
              })
              .exec((err, resultAccount) => {
                Product.find({
                  _id: req.body._id,
                })
                  .populate("thumbnail_children")
                  .populate("color")
                  .populate("description")
                  .populate("affilateshop")
                  .populate({
                    path: "comment",
                    populate: [
                      {
                        path: "account",
                      },
                      {
                        path: "likecomment",
                        populate: [{ path: "account" }],
                      },
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
                  .exec( async (err, resultProduct) => {

                    const account_city = resultAccount[0].cityAddress;
                    const product_city =
                      resultProduct[0].affilateshop.cityAddress;

                    const typeAreaAccount = validationArea(account_city);
                    const typeAreaProduct = validationArea(product_city);

                    const resultShip = await validationCity(
                      resultAccount[0],
                      resultProduct[0].affilateshop,
                      typeAreaAccount,
                      typeAreaProduct
                    );
                    const resultShipDate = validationDateShip(
                      account_city,
                      product_city,
                      typeAreaAccount,
                      typeAreaProduct
                    );

                    let cartitem = new CartItem();

                    cartitem.product = req.body._id;
                    cartitem.color = req.body.color;
                    cartitem.size = req.body.size;
                    cartitem.price = req.body.price;
                    cartitem.ship = resultShip;
                    cartitem.ship_start = new Date(resultShipDate);
                    cartitem.ship_end = new Date(
                      current_date.setDate(current_date.getDate() + 3)
                    );

                    cartitem.amount = req.body.amount;
                    cartitem.save((err, cartItemResults) => {
                      if (err) {
                        return res.status(400).send({
                          message: "Failed to add cart.",
                        });
                      } else {
                        cartResult.cartitem.push(cartItemResults._id);
                        cartResult.amount = cartItemResults.amount;
                        cartResult.t_price =
                          parseInt(cartResult.t_price) +
                          parseInt(req.body.price) * parseInt(req.body.amount);
                        cartResult.t_ship =
                          parseInt(cartResult.t_ship) + parseInt(resultShip);
                        cartResult.save((err, doc) => {
                          if (err) {
                            return res.status(400).send('fail');
                          } else {
                            return res.status(201).send('success');
                          }
                        });
                      }
                    });
                  });
              });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.get_cart = async (req, res) => {
  Cart.find(
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
exports.get_cart_account = async (req, res) => {
  try {
    Cart.find({
      account: req.params.code,
    })
      .populate({
        path: "cartitem",
        populate: [
          {
            path: "product",
            populate: [
              {
                path: "affilateshop",
              },
            ],
          },
        ],
      })
      .exec((err, result) => {
        if (err) {
          return res.status(400).send({
            message: err + "Get list product failed",
          });
        } else {
          res.json({
            data: result,
          });
        }
      });
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.get_carts = async (req, res) => {
  try {
    Cart.find()
      .populate({
        path: "cartitem",
        populate: [{ path: "product" }, { path: "product.color" }],
      })
      .exec((err, data) => {
        if (err) {
          return res.status(400).send({
            message: err + "Get list product failed",
          });
        } else {
          res.status(200).send(data);
        }
      });
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.put_cart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Cart.update(
        {
          _id: req.params.code,
        },
        {
          account: req.body.account,
          product: req.body.product,
          t_price: req.body.t_price,
          voucher: req.body.voucher,
          create_date: req.body.create_date,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "cart update failed",
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

exports.delete_cart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Cart.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "cart delete successfully.",
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
