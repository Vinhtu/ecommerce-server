const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const usagestatus = require("../models/usagestatus");



exports.post_usagestatus = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let usagestatuss = new usagestatus();
        usagestatuss.type = req.body.type;
        usagestatuss.status = req.body.status;
        usagestatuss.create_date = req.body.create_date;
      
  
        usagestatuss.save((err) => {
          if (err) {
            return res.status(400).send("fail");
          } else {
            return res.status(201).send("success");
          }
        });
      } catch (error) {
        res.status(400).send({
          message: "Error: " + error,
        });
      }
    }
  };
  
exports.get_usagestatus = async (req, res) => {
  usagestatus.find(
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

exports.get_usagestatuss = async (req, res) => {
  usagestatus.find(function (err, results) {
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

exports.put_usagestatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      usagestatus.update(
        {
          _id: req.params.code,
        },
        {
            type : req.body.type,
            status : req.body.status,
            create_date : req.body.create_date,
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

exports.delete_usagestatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      usagestatus.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send("fail");
        } else {
          return res.status(201).send("success");
        }
      });
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};

