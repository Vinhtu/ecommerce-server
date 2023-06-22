const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Message = require("../models/message");

exports.create = async (req, res) => {
  var messageExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Message.create(messageExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_message = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let message = new Message(req.body);

      message.save((err, datas) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add message.",
          });
        } else {
          Message.find({ _id: datas._id })
            .populate("sender")
            .exec((err, data) => {
              if (err) {
                return res.status(400).send({
                  message: "Failed to add message.",
                });
              } else {
                res.status(200).send(data[0]);
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

exports.get_message = async (req, res) => {
  Message.find({
    conversationId: req.params.conversationId,
  })
    .populate("sender")
    .exec((err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(result);
      }
    });
};

exports.get_messages = async (req, res) => {
  Message.find(function (err, results) {
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

exports.put_message = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Message.update(
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
              message: "message update failed",
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

exports.delete_message = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Message.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "message delete successfully.",
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
