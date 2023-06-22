const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const eventitem = require("../models/eventitem");

const EventItem = require("../models/eventitem");

exports.create = async (req, res) => {
  var eventitemExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  EventItem.create(eventitemExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_eventitem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.get_eventitem = async (req, res) => {
  EventItem.find(
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
exports.get_eventitem_account = async (req, res) => {
  try {
    EventItem.find({
      account: req.params.code,
    })
      .populate({
        path: "eventitem",
        populate: [{ path: "product" }, { path: "product.color" }],
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

exports.get_eventitems = async (req, res) => {
  try {
    EventItem.find()
      .populate({
        path: "eventitem",
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

exports.put_eventitem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      EventItem.update(
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
              message: "eventitem update failed",
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

exports.delete_eventitem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      EventItem.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "eventitem delete successfully.",
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
