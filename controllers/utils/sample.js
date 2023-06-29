const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Sample = require("../../models/utils/sample");



exports.post_sample = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let sample = new Sample();
        sample.name = req.body.name;
        sample.category = req.body.category;
        sample.subcategory = req.body.subcategory;
      
  
        sample.save((err) => {
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
  
exports.get_sample = async (req, res) => {
  Sample.find(
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

exports.get_samples = async (req, res) => {
  Sample.find(function (err, results) {
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

exports.put_sample = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Sample.update(
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

exports.delete_sample = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Sample.findByIdAndDelete(req.params.code, null, (err, result) => {
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

