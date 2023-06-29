const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Feature = require("../../models/utils/feature");

exports.post_feature = async (req, res) => {
  console.log(req.body, "body");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let feature = new Feature();
      feature.name = req.body.name;
      feature.category = req.body.category;
      feature.subcategory = req.body.subcategory;

      feature.save((err) => {
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

exports.get_feature = async (req, res) => {
  Feature.find(
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

exports.get_features = async (req, res) => {
  Feature.find(function (err, results) {
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

exports.put_feature = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Feature.update(
        {
          _id: req.params.code,
        },
        {
          name: req.body.name,
          category: req.body.category,
          subcategory: req.body.subcategory,
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

exports.delete_feature = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Feature.findByIdAndDelete(req.params.code, null, (err, result) => {
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
