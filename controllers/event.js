const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Event = require("../models/event");
const EventItem = require("../models/eventitem");
const Product = require("../models/product");

exports.create = async (req, res) => {
  var eventExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Event.create(eventExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_event = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let event = new Event();

      event.code = req.body.dataform.code;
      event.name = req.body.dataform.name;
      event.content = req.body.dataform.content;
      event.create_date = req.body.dataform.create_date;
      event.date_start = req.body.dataform.date_start;
      event.date_end = req.body.dataform.date_end;
      event.status = req.body.dataform.status;

      event.save((err, eventResult) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add event.",
          });
        } else {
          for (let i = 0; i < req.body.eventItem.length; i += 1) {
            let eventitem = new EventItem();

            eventitem.product = req.body.eventItem[i].code_product;
            eventitem.p_price = req.body.eventItem[i].p_price;

            eventitem.save((err, eventItemResults) => {
              if (err) {
                return res.status(400).send({
                  message: "Failed to add event.",
                });
              } else {
                eventResult.eventitem.push(eventItemResults._id);

                if (i === req.body.eventItem.length - 1) {
                  eventResult.save((err, doc) => {
                    if (err) {
                      return res.status(400).send({
                        message: "Failed to add comment.",
                      });
                    } else {
                      return res.status(201).send({
                        message: "Post Event successfully.",
                      });
                    }
                  });
                }
              }
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

exports.get_event = async (req, res) => {
  Event.find(
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

exports.get_event_date = async (req, res) => {
  // const x = new Date(req.params.code).getTime();

  // const y = new Date(x)

  // const y = x.toISOString();

  Event.find({
   date_start: {$lte:new Date(req.params.code)},
   date_end: {$gte:new Date(req.params.code)}
  })
    .populate({
      path: "eventitem",
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
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list product failed",
        });
      } else {
        res.status(200).send(data);
      }
    });
};
exports.get_event_account = async (req, res) => {
  try {
    Event.find({
      account: req.params.code,
    })
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

exports.get_events = async (req, res) => {
  try {
    Event.find()
      .populate({
        path: "account",
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

exports.put_event = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Event.update(
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
              message: "event update failed",
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

exports.delete_event = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Event.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "event delete successfully.",
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
