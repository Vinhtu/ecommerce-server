const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const TypeDevice = require("../../models/utils/typedevice");



exports.post_typedevice = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let typedevice = new TypeDevice();
        typedevice.name = req.body.name;
        typedevice.category = req.body.category;
        typedevice.subcategory = req.body.subcategory;
      
  
        typedevice.save((err) => {
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
  
exports.get_typedevice = async (req, res) => {
  TypeDevice.find(
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

exports.get_typedevices = async (req, res) => {
  TypeDevice.find(function (err, results) {
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

exports.put_typedevice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      TypeDevice.update(
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

exports.delete_typedevice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      TypeDevice.findByIdAndDelete(req.params.code, null, (err, result) => {
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

