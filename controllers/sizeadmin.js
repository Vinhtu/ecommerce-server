const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Sizeadmin = require("../models/sizeadmin");

exports.post_sizeadmin = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let sizeadmin = new Sizeadmin();

      sizeadmin.name = req.body.name;
      sizeadmin.create_date= new Date();

      sizeadmin.save((err) => {
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

exports.get_sizeadmin = async (req, res) => {
  Sizeadmin.find(
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

exports.get_sizeadmins = async (req, res) => {
  Sizeadmin.find(function (err, results) {
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

exports.put_sizeadmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Sizeadmin.update(
        {
          _id: req.params.code,
        },
        {
          name: req.body.name,
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

exports.delete_sizeadmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Sizeadmin.findByIdAndDelete(req.params.code, null, (err, result) => {
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
