const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Description = require("../models/description");

exports.create = async (req, res) => {
  var descriptionExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Description.create(descriptionExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};


exports.post_description = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let description = new Description();
        description.code = req.body.code;
        description.title = req.body.title;
        description.body = req.body.body;
        description.color = req.body.color;
        description.size = req.body.size;
        description.create_date = req.body.create_date;
  
        description.save((err) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add description.",
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
  
exports.get_description = async (req, res) => {
  Description.find(
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

exports.get_descriptions = async (req, res) => {
  Description.find(function (err, results) {
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

exports.put_description = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Description.update(
        {
          _id: req.params.code,
        },
        {
          code : req.body.code, 
          title : req.body.title,    
          body : req.body.body, 
          color : req.body.color, 
          size : req.body.size,    
          create_date : req.body.create_date,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "description update failed",
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

exports.delete_description = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Description.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "description delete successfully.",
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

