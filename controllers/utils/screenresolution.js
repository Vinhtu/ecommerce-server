const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const ScreenResolution = require("../../models/utils/screenresolution");



exports.post_screenresolution = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let screenresolution = new ScreenResolution();
        screenresolution.name = req.body.name;
        screenresolution.category = req.body.category;
        screenresolution.subcategory = req.body.subcategory;
      
  
        screenresolution.save((err) => {
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
  
exports.get_screenresolution = async (req, res) => {
  ScreenResolution.find(
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

exports.get_screenresolutions = async (req, res) => {
  ScreenResolution.find(function (err, results) {
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

exports.put_screenresolution = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      ScreenResolution.update(
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

exports.delete_screenresolution = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      ScreenResolution.findByIdAndDelete(req.params.code, null, (err, result) => {
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

