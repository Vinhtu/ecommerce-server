const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Notification = require("../models/notification");


exports.post_notification = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let notification = new Notification();
      notification.code = req.body.code;
      notification.account = req.body.account;
      notification.title = req.body.title;
      notification.status = req.body.status;
      notification.role = req.body.role;
      notification.body = req.body.body;
      notification.breadcrumb = req.body.breadcrumb;
      notification.create_date = req.body.create_date;

      notification.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add comment.",
          });
        } else {
          return res.status(201).send({
            message: "comment post successfully.",
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

exports.get_notification = async (req, res) => {
  Notification.find({
    _id: req.params.code,
  })
    .populate("account")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list notification failed",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.get_notification_account = async (req, res) => {
  Notification.find({
    account_receive: req.params.code,
  })
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list notification failed",
        });
      } else {
        data.reverse();
        res.status(200).send(data);
      }
    });
};

exports.get_notification_admin = async (req, res) => {
  Notification.find({
    role: "Admin",
  })
    .populate("account")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list notification admin",
        });
      } else {
        data.reverse();
        res.status(200).send(data);
      }
    });
};

exports.get_notification_admin_account = async (req, res) => {
  Notification.find({
    role: "Admin",
    breadcrumb:'Account'
  })
    .populate("account")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list notification admin",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.get_notification_admin_accounts = async (req, res) => {
  Notification.findOne(
    {
      role: "Admin",
    },
    { breadcrumb: "Account" }
  )
    .populate("account")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list notification account admin",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.get_notifications = async (req, res) => {
  Notification.find()
    .populate("account")
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list notification failed",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.put_notification = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Notification.updateOne(
        {
          _id: req.params.code,
        },
        {
          // code: req.body.code,
          // account_send: req.body.account_send,
          // account_receive: req.body.account_receive,
          // title: req.body.title,
          // sub_title: req.body.sub_title,
          status: req.body.status,
          // role: req.body.role,
          // body: req.body.body,
         
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "notification update failed",
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

exports.delete_notification = async (req, res) => {
  console.log(req.body,'req body delete')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Notification.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "notification delete successfully.",
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
