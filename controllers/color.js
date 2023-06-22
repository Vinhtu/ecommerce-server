const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Color = require("../models/color");

exports.create = async (req, res) => {
  var colorExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Color.create(colorExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};



exports.post_color = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let color = new Color();
      color.code = req.body.code;
      color.name = req.body.name;
      color.create_date = req.body.create_date;

      color.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add color.",
          });
        } else {
          return res.status(201).send({
            message: "color post successfully.",
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

exports.get_color = async (req, res) => {
  Color.find(
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

exports.get_colors = async (req, res) => {
  Color.find(function (err, results) {
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

exports.put_color = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Color.update(
        {
          _id: req.params.code,
        },
        {
          code : req.body.code, 
          name : req.body.name,    
          create_date : req.body.create_date,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "color update failed",
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

exports.delete_color = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Color.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "color delete successfully.",
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

