const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Affilateshop = require("../models/affilateshop");

exports.create = async (req, res) => {
  var affilateshopExamples = [
    {
      name: "Truong ngoc vinh tu",
      address: "vinhtu125@gmail.com",
      level: "123456",
      create_date: "123456",
    },
  ];
  Affilateshop.create(affilateshopExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_affilateshop = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let affilateshop = new Affilateshop();
      affilateshop.name = req.body.name;
      affilateshop.phone = req.body.phone;
      affilateshop.level = req.body.level;
      affilateshop.status = req.body.status;
      affilateshop.streetAddress = req.body.streetAddress;
      affilateshop.wardCommunedistrictAddress =
      req.body.wardCommunedistrictAddress;
      affilateshop.cityAddress = req.body.cityAddress;
      affilateshop.zipAddress = req.body.zipAddress;
      affilateshop.create_date = req.body.create_date;

      affilateshop.save((err) => {
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

exports.get_affilateshop = async (req, res) => {
  Affilateshop.find(
    {
      _id: req.params.code,
    },
    function (err, data) {
      if (err) {
        throw err;
      } else {
        res.status(200).send(data[0]);
      }
    }
  );
};

exports.get_affilateshops = async (req, res) => {
  Affilateshop.find(function (err, data) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).send(data);
    }
  });
};

exports.put_affilateshop = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Affilateshop.update(
        {
          _id: req.params.code,
        },
        {
          name: req.body.name,
          streetAddress: req.body.streetAddress,
          wardCommunedistrictAddress: req.body.wardCommunedistrictAddress,
          cityAddress: req.body.cityAddress,
          zipAddress: req.body.zipAddress,
          phone: req.body.phone,
          level: req.body.level,
          create_date: new Date(),
          status: req.body.status,
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

exports.delete_affilateshop = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Affilateshop.findByIdAndDelete(req.params.code, null, (err, result) => {
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
