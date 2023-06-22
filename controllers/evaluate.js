const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Evaluate = require("../models/evaluate");
const Product = require("../models/product");

exports.create = async (req, res) => {
  var evaluateExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Evaluate.create(evaluateExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_evaluate = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let evaluate = new Evaluate();
      evaluate.star = req.body.star;
      evaluate.account = req.body.account_id;
      evaluate.create_date = new Date();
      evaluate.save((err, evaluateResults) => {
        if (err) {
          return res.status(400).send("fail");
        } else {
          Product.find({ _id: req.body.data.product._id })
            .populate("thumbnail_children")
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

              populate: [
                {
                  path: "color",
                  populate: [{ path: "size" }],
                },
              ],
            })

            .exec(async (err, product) => {
              if (err) {
                return res.status(400).send({
                  message: err + "Get list product failed",
                });
              } else {

                product[0]?.evaluate?.push(evaluateResults._id);

                product[0].save((err, productsave) => {
                  if (err) {
                    return res.status(400).send("fail");
                  } else {
                    return res.status(201).send("success");
                  }
                });
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

exports.get_evaluate = async (req, res) => {
  Evaluate.find(
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

exports.get_evaluates = async (req, res) => {
  Evaluate.find(function (err, results) {
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

exports.put_evaluate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Evaluate.update(
        {
          _id: req.params.code,
        },
        {
          star: req.body.star,
          n_buy: req.body.n_buy,
          n_evaluate: req.body.n_evaluate,
          n_share: req.body.n_share,
          n_click: req.body.n_click,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "evaluate update failed",
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

exports.delete_evaluate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Evaluate.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "evaluate delete successfully.",
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
