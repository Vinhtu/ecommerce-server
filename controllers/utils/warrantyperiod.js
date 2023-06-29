const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const WarrantyPeriod = require("../../models/utils/warrantyperiod");



exports.post_warrantyperiod = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let warrantyperiod = new WarrantyPeriod();
        warrantyperiod.name = req.body.name;
        warrantyperiod.category = req.body.category;
        warrantyperiod.subcategory = req.body.subcategory;
      
  
        warrantyperiod.save((err) => {
          if (err) {
            return res.status(400).send('fail');
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
  
exports.get_warrantyperiod = async (req, res) => {
  WarrantyPeriod.find(
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

exports.get_warrantyperiods = async (req, res) => {
  WarrantyPeriod.find(function (err, results) {
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

exports.put_warrantyperiod = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      WarrantyPeriod.update(
        {
          _id: req.params.code,
        },
        {
            name : req.body.name,
            category : req.body.category,
            subcategory : req.body.subcategory,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send('fail');
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

exports.delete_warrantyperiod = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      WarrantyPeriod.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send('fail');
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

