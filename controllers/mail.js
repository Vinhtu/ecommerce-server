const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Mail = require("../models/mail");

exports.create = async (req, res) => {
  var mailExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Mail.create(mailExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};


exports.post_mail = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let mail = new Mail();
        mail.code = req.body.code;
        mail.from = req.body.from;
        mail.to = req.body.to;
        mail.title = req.body.title;
        mail.body = req.body.body;
        mail.create_date = req.body.create_date;

  
        mail.save((err) => {
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
  
exports.get_mail = async (req, res) => {
  Mail.find(
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

exports.get_mails = async (req, res) => {
  Mail.find(function (err, results) {
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

exports.put_mail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Mail.update(
        {
          _id: req.params.code,
        },
        {
          code : req.body.code, 
          from : req.body.from,    
          to : req.body.to, 
          title : req.body.title, 
          body : req.body.body,
          create_date : req.body.create_date,      
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "mail update failed",
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

exports.delete_mail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Mail.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "mail delete successfully.",
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

