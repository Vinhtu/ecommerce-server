const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Thumbnail = require("../models/thumbnailchildren");



exports.post_thumbnail = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let thumbnail = new Thumbnail();
      thumbnail.code = req.body.code;
      thumbnail.thumbnai1 = req.body.thumbnail1;
      thumbnail.thumbnai2 = req.body.thumbnail2;
      thumbnail.thumbnai3 = req.body.thumbnail3;
      thumbnail.thumbnai4 = req.body.thumbnail4;
      thumbnail.thumbnai5 = req.body.thumbnail5;
      thumbnail.thumbnai6 = req.body.thumbnail6;
      thumbnail.thumbnai7 = req.body.thumbnail7;
      thumbnail.owner = req.body.owner;

      thumbnail.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add comment.",
          });
        } else {
          return res.status(201).send({
            message: "thumbnail post successfully.",
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

exports.get_thumbnail = async (req, res) => {
  Thumbnail.find(
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

exports.get_thumbnails = async (req, res) => {
  Thumbnail.find(function (err, results) {
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

exports.put_thumbnail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Thumbnail.update(
        {
          _id: req.params.code,
        },
        {
          code: req.body.code,
          thumbnail1: req.body.thumbnail1,
          thumbnail2: req.body.thumbnail2,
          thumbnail3: req.body.thumbnail3,
          thumbnail4: req.body.thumbnail4,
          thumbnail5: req.body.thumbnail5,
          thumbnail6: req.body.thumbnail6,
          thumbnail7: req.body.thumbnail7,
         
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "thumbnail update failed",
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

exports.delete_thumbnail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Thumbnail.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "thumbnail delete successfully.",
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
