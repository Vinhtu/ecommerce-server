const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Coloradmin = require("../models/coloradmin");



exports.post_coloradmin = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let coloradmin = new Coloradmin();
      coloradmin.name = req.body.name;
      coloradmin.create_date = new Date();
      coloradmin.save((err) => {
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

exports.get_coloradmin = async (req, res) => {
  Coloradmin.find(
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

exports.get_coloradmins = async (req, res) => {
  Coloradmin.find(function (err, results) {
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

exports.put_coloradmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Coloradmin.update(
        {
          _id: req.params.code,
        },
        {
          
          name : req.body.name,    
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

exports.delete_coloradmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Coloradmin.findByIdAndDelete(req.params.code, null, (err, result) => {
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

