const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Voucher = require("../models/voucher");


exports.post_voucher = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let voucher = new Voucher();
      voucher.code = req.body.code;
      voucher.name = req.body.name;
      voucher.title = req.body.title;
      voucher.thumbnail = req.body.thumbnail;
      voucher.p_price = req.body.p_price;
      voucher.percent = req.body.percent;
      voucher.date_start = req.body.date_start;
      voucher.date_end = req.body.date_end;
      // voucher.body = req.body.body;
      voucher.amount = req.body.amount;
      voucher.status = req.body.status;
      voucher.create_date = req.body.create_date;

      voucher.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add comment.",
          });
        } else {
          return res.status(201).send({
            message: "voucher post successfully.",
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

exports.get_voucher = async (req, res) => {
  Voucher.find(
    {
      code: req.params.code,
    },
    function (err, result) {
      if (err) {
        throw err;
      } else {
        res.status(200).send(result);
      }
    }
  );
};

exports.get_vouchers = async (req, res) => {
  Voucher.find(function (err, results) {
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

exports.put_voucher = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Voucher.update(
        {
          _id: req.params.code,
        },
        {
          code: req.body.code,
          name: req.body.name,
          title: req.body.title,
          thumbnail: req.body.thumbnail,
          p_price: req.body.p_price,
          percent: req.body.percent,
          date_start: req.body.date_start,
          date_end: req.body.date_end,
          body: req.body.body,
          amount: req.body.amount,
          status: req.body.status,
          create_date: req.body.create_date,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "voucher update failed",
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

exports.delete_voucher = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Voucher.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "voucher delete successfully.",
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
