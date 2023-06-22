const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const CartItem = require("../models/cartitem");
const Cart = require("../models/cart");

exports.create = async (req, res) => {
  var cartitemExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  CartItem.create(cartitemExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_cartitem = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let cartitem = new CartItem();
      cartitem.name = req.body.name;
      cartitem.create_date = req.body.create_date;

      cartitem.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add cartitem.",
          });
        } else {
          return res.status(201).send({
            message: "cartitem register successfully.",
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

exports.get_cartitem = async (req, res) => {
  CartItem.find(
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

exports.get_cartitems = async (req, res) => {
  CartItem.find(function (err, results) {
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

exports.put_cartitem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      CartItem.update(
        {
          _id: req.params.code,
        },
        {
          note: req.body.note
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "cartitem update failed",
            });
          } else {
            return res.status(201).send({
              message: "cartitem update successfully.",
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

exports.put_cartitem_change_amount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {

      Cart.find({
        _id: req.body.cart_id,
      })
        .populate("cartitem")
        .exec((err, cartCurrent) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            CartItem.find({
              _id: req.params.code,
            })
              .populate("cartitem")
              .exec((err, cartitemCurrent) => {
                if (err) {
                  return res.status(400).send({
                    message: err + "Get list product failed",
                  });
                } else {
                  CartItem.update(
                    {
                      _id: req.params.code,
                    },
                    {
                      amount: req.body.amount,
                    },
                    (err, data) => {
                      if (err) {
                        return res.status(400).send({
                          message: "cartitem update failed",
                        });
                      } else {
                        const amountGap =
                          parseInt(req.body.amount) -
                          parseInt(cartitemCurrent[0].amount);

                        cartCurrent[0].t_price =
                          parseInt(cartCurrent[0].t_price) +
                          parseInt(amountGap) * cartitemCurrent[0].price;
                        cartCurrent[0].amount =
                          parseInt(cartCurrent[0].amount) + parseInt(amountGap);
                        cartCurrent[0].save((err, doc) => {
                          if (err) {
                            return res.status(400).send({
                              message: "Failed to change amount cart.",
                            });
                          } else {
                            return res.status(201).send({
                              message: "Post change amount cart successfully.",
                            });
                          }
                        });
                      }
                    }
                  );
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

exports.delete_cartitem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Cart.find({
        _id: req.params.idcart,
      })
        .populate("cartitem")
        .exec((err, cartCurrent) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            CartItem.find({
              _id: req.params.code,
            })
              .populate("cartitem")
              .exec((err, cartitemCurrent) => {
                if (err) {
                  return res.status(400).send({
                    message: err + "Get list product failed",
                  });
                } else {
                  CartItem.findByIdAndDelete(
                    req.params.code,
                    null,
                    (err, result) => {
                      if (err) {
                        return res.status(400).send({
                          message: "Delete failed",
                        });
                      } else {
                        const amount = cartitemCurrent[0].amount;

                        cartCurrent[0].t_price =
                          parseInt(cartCurrent[0].t_price) -
                          parseInt(amount) * cartitemCurrent[0].price;
                        cartCurrent[0].amount =
                          parseInt(cartCurrent[0].amount) - parseInt(amount);
                        cartCurrent[0].t_ship =
                          parseInt(cartCurrent[0].t_ship) -
                          parseInt(cartitemCurrent[0].ship);
                        cartCurrent[0].save((err, doc) => {
                          if (err) {
                            return res.status(400).send({
                              message: "Failed Delete cart item",
                            });
                          } else {
                            return res.status(201).send({
                              message: "Delete cart item successfully.",
                            });
                          }
                        });
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
