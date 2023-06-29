const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const TypeLock = require("../../models/utils/typelock");



exports.post_typelock = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let typelock = new TypeLock();
        typelock.name = req.body.name;
        typelock.category = req.body.category;
        typelock.subcategory = req.body.subcategory;
      
  
        typelock.save((err) => {
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
  
exports.get_typelock = async (req, res) => {
  TypeLock.find(
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

exports.get_typelocks = async (req, res) => {
  TypeLock.find(function (err, results) {
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

exports.put_typelock = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      TypeLock.update(
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

exports.delete_typelock = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      TypeLock.findByIdAndDelete(req.params.code, null, (err, result) => {
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

