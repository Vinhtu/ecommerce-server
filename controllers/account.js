const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const Account = require("../models/account");
const Cart = require("../models/cart");
const CartItem = require("../models/cartitem");
const Notification = require("../models/notification");
const Refreshtoken = require("../models/refreshtoken");

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

const validationCity = (
  account_city,
  product_city,
  typeAreaAccount,
  typeAreaProduct
) => {
  if (account_city === product_city) {
    return tp_money;
  } else if (
    account_city !== product_city &&
    typeAreaAccount === typeAreaProduct
  ) {
    return dtp_money;
  } else if (typeAreaAccount === typeAreaProduct) {
    return vm_money;
  } else if (typeAreaAccount !== typeAreaProduct) {
    return dvm_money;
  }
};

exports.create = async (req, res) => {
  var accountExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Account.create(accountExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) res.status(401);
  Refreshtoken.find(
    { refreshname: refreshToken },
    (err, resultRefreshToken) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, data) => {
          if (err) res.send(403);
          const accessToken = jwt.sign(
            { id: data.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 30000 }
          );
          res.json({ accessToken });
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Account.find({ username: req.body.username }, function (err, user) {
        if (err) {
          return res.status(400).send(err);
        } else {
          if (user.length === 0) {
            res.status(200).send(false);
          } else {
            // console.log(user, "user find");
            // return res.status(200).send(user[0]);

            const id = user[0]._id;

            const accessToken = jwt.sign(
              { id },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: 900000000 }
            );
            const refreshToken = jwt.sign(
              { id },
              process.env.REFRESH_TOKEN_SECRET
            );

            const rf = new Refreshtoken();
            rf.refreshname = refreshToken;
            rf.save((err, result) => {
              if (err) res.sendStatus(401);
              res.status(200).send({
                account: id,
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            });
          }
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.logout = async (req, res) => {
  Refreshtoken.deleteOne({ refreshname: req.body.refresh }, (err, result) => {
    if (err) res.status(401).send("fail");
    res.status(200).send("success");
  });
};

exports.register = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let account = new Account();
      account.username = req.body.username;
      account.password = req.body.password;
      account.fullname = req.body.fullname;
      account.avatar = req.body.avatar;
      account.phone = req.body.phone;
      account.streetAddress = req.body.streetAddress;
      account.wardCommunedistrictAddress = req.body.wardCommunedistrictAddress;
      account.cityAddress = req.body.cityAddress;
      account.zipAddress = req.body.zipAddress;
      account.province = req.body.province;
      account.district = req.body.district;
      account.ward = req.body.ward;
      account.line = req.body.line;
      account.zip = req.body.zip;
      account.role = req.body.role;
      account.team = req.body.team;
      account.position = req.body.position;
      account.b_price = req.body.b_price;
      account.create_date = new Date();
      account.status = req.body.status;

      account.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add account.",
          });
        } else {
          const today = new Date().toLocaleDateString();

          Account.findOne(
            { username: req.body.username },
            function (err, user) {
              if (user === null) {
                return res.status(400).send("Không tìm thấy tài khoản");
              } else {
                let notification = new Notification();
                notification.code = user.username;
                notification.account = user._id;
                notification.title = "Register Account";
                notification.status = "Pending";
                notification.role = "Admin";
                notification.breadcrumb = "Account";
                notification.body = `Have a new account ${user.username}`;
                notification.create_date = today;

                notification.save((err) => {
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

exports.get_account = async (req, res) => {
  Account.find({
    _id: req.params.code,
  })
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

exports.get_accounts = async (req, res) => {
  Account.find()
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

exports.post_account_date = async (req, res) => {
  Account.find({ create_date: { $lt: Date(req.body.startDate) } })
    .populate("team")
    .populate("position")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get data",
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

exports.put_account = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Account.update(
        {
          _id: req.params.code,
        },
        {
          username: req.body.username,
          fullname: req.body.fullname,
          // avatar: req.body.avatar,
          phone: req.body.phone,
          streetAddress: req.body.streetAddress,
          wardCommunedistrictAddress: req.body.wardCommunedistrictAddress,
          cityAddress: req.body.cityAddress,
          zipAddress: req.body.zipAddress,

          province: req.body.province,
          district: req.body.district,
          ward: req.body.ward,
          line: req.body.line,
          zip: req.body.zip,

          role: req.body.role,
          team: req.body.team,
          position: req.body.position,
          b_price: req.body.b_price,
          create_date: req.body.create_date,
          status: req.body.status,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "order update failed",
            });
          } else {
            return res.status(201).send({
              message: "Accont update successfully.",
            });
          }
        }
      );
      // .populate("voucher")
      // .exec((err, accountCurrent) => {
      //   console.log(accountCurrent,'account current')
      //   if (err) {
      //     return res.status(400).send({
      //       message: err + "Get list product failed",
      //     });
      //   } else {
      //     return res.status(201).send(accountCurrent);
      //   }
      // });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.put_account_password = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Account.update(
        {
          _id: req.params.code,
        },
        {
          password: req.body.password,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send("fail");
          } else {
            return res.status(201).send("success");
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

exports.put_account_order = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Account.update(
        {
          _id: req.params.code,
        },
        {
          streetAddress: req.body.streetAddress,
          wardCommunedistrictAddress: req.body.wardCommunedistrictAddress,
          cityAddress: req.body.cityAddress,
          zipAddress: req.body.zipAddress,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "order update failed",
            });
          } else {
            Cart.find({ _id: req.body.cart })
              .populate({
                path: "cartitem",
                populate: [
                  { path: "product", populate: [{ path: "affilateshop" }] },
                ],
              })
              .exec((err, resultCart) => {
                if (err) {
                  return res.status(400).send({
                    message: "Failed to add comment.",
                  });
                } else {
                  for (let i = 0; i < resultCart[0].cartitem.length; i += 1) {
                    const account_city = req.body.cityAddress;
                    const product_city =
                      resultCart[0].cartitem[i].product.affilateshop
                        .cityAddress;

                    const typeAreaAccount = validationArea(account_city);
                    const typeAreaProduct = validationArea(product_city);

                    const resultShip = validationCity(
                      account_city,
                      product_city,
                      typeAreaAccount,
                      typeAreaProduct
                    );
                    const resultShipDate = validationDateShip(
                      account_city,
                      product_city,
                      typeAreaAccount,
                      typeAreaProduct
                    );

                    const current_dates = new Date();

                    CartItem.update(
                      {
                        _id: resultCart[0].cartitem[i]._id,
                      },
                      {
                        ship: resultShip,
                        ship_start: new Date(resultShipDate),
                        ship_end: new Date(
                          current_dates.setDate(current_dates.getDate() + 6)
                        ),
                      },
                      (err, data) => {
                        if (err) {
                          return res.status(400).send({
                            message: "order update failed",
                          });
                        } else {
                          if (i === resultCart[0].cartitem.length - 1) {
                            return res.status(201).send({
                              message: "Accont update successfully.",
                            });
                          }
                        }
                      }
                    );
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

exports.put_account_give_voucher = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Account.find({
        _id: req.params.code,
      })
        .populate("voucher")
        .exec((err, accountCurrent) => {
          if (err) {
            return res.status(400).send("fail");
          } else {
            accountCurrent[0].voucher.push(req.body._idVoucher);

            accountCurrent[0].save((err, resultAccountCurrent) => {
              if (err) {
                return res.status(400).send("fail");
              } else {
                return res.status(201).send("success");
              }
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

exports.delete_account = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      const today = new Date().toLocaleDateString();

      Account.findOne({ _id: req.params.code }, function (err, user) {
        if (user === null) {
          return res.status(400).send("Không tìm thấy tài khoản");
        } else {
          let notification = new Notification();
          notification.code = user.username;
          notification.account = user._id;
          notification.title = "Delete Account";
          notification.status = "Pending";
          notification.role = "Admin";
          notification.breadcrumb = "Account";
          notification.body = `Have a new delete account ${user.username}`;
          notification.create_date = today;

          notification.save((err) => {
            if (err) {
              return res.status(400).send({
                message: "Account delete notification failed.",
              });
            } else {
              Account.findByIdAndDelete(
                req.params.code,
                null,
                (err, result) => {
                  if (err) {
                    return res.status(400).send("fail");
                  } else {
                    return res.status(201).send("success");
                  }
                }
              );
            }
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

// exports.updateProfile = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).send({
//       message: errors.array(),
//     });
//   } else {
//     try {
//       Account.findByIdAndUpdate(
//         req.params.accountId,
//         {
//           fullname: req.body.fullname,
//           phone: req.params.phone,
//         },
//         (err, data) => {
//           if (err) {
//             return res.status(400).send({
//               message: "Update profile failed!",
//             });
//           } else {
//             res.status(200).send({
//               message: "Update profile successfully!",
//             });
//           }
//         }
//       );
//     } catch (error) {
//       res.status(400).send({
//         message: "Error: " + error,
//       });
//     }
//   }
// };
