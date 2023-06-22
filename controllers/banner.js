const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Banner = require("../models/banner");

exports.create = async (req, res) => {
  var bannerExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Banner.create(bannerExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};



exports.post_banner = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let banner = new Banner();
      banner.title = req.body.title;
      banner.content = req.body.content;
      banner.thumbnail = req.body.thumbnail;
      banner.create_date = req.body.create_date;
      banner.show = req.body.show;

      banner.save((err) => {
        if (err) {
          return res.status(400).send('fail');
        } else {
          return res.status(201).send('success');
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.get_banner = async (req, res) => {
  Banner.find(
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

exports.get_banners = async (req, res) => {
  Banner.find(function (err, results) {
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

exports.put_banner = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Banner.update(
        {
          _id: req.params.code,
        },
        {
          title : req.body.title, 
          content : req.body.content,    
          thumbnail : req.body.thumbnail,
          show: req.body.show,
          create_date : req.body.create_date,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send('fail');
          } else {
            return res.status(201).send('success');
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

exports.delete_banner = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Banner.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send('fail');
        } else {
          return res.status(201).send('success');
        }
      });
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};

