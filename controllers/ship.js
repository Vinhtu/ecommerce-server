const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Ship = require("../models/ship");




exports.post_ship = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    } else {
      try {
        let ship = new Ship();
        ship.code = req.body.code;
        ship.address = req.body.address;
        ship.p_ship = req.body.p_ship;
        ship.t_ship = req.body.t_ship;
  
        ship.save((err) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add comment.",
            });
          } else {
            return res.status(201).send({
              message: "ship post successfully.",
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
  
exports.get_ship = async (req, res) => {
  Ship.find(
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

exports.get_ships = async (req, res) => {
  ship.find(function (err, results) {
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

exports.put_ship = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Ship.update(
        {
          _id: req.params.code,
        },
        {
            code : req.body.code,
        address : req.body.address,
        p_ship : req.body.p_ship,
        t_ship : req.body.t_ship,
  
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "ship update failed",
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

exports.delete_ship = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Ship.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "ship delete successfully.",
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

