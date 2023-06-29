const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const deliverymethod = require("../models/deliverymethod");



exports.post_deliverymethod = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let deliverymethods = new deliverymethod();
        deliverymethods.type = req.body.type;
        deliverymethods.status = req.body.status;
        deliverymethods.code = req.body.code;
        deliverymethods.create_date = req.body.create_date;
      
  
        deliverymethods.save((err) => {
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
  
exports.get_deliverymethod = async (req, res) => {
  deliverymethod.find(
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

exports.get_deliverymethods = async (req, res) => {
  deliverymethod.find(function (err, results) {
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

exports.put_deliverymethod = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      deliverymethod.update(
        {
          _id: req.params.code,
        },
        {
            type : req.body.type,
            status : req.body.status,
            code : req.body.code,
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

exports.delete_deliverymethod = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      deliverymethod.findByIdAndDelete(req.params.code, null, (err, result) => {
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

