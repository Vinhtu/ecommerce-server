const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Brand = require("../models/brand");
const SubBrand = require("../models/subbrand");

exports.create = async (req, res) => {
  var brandExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Brand.create(brandExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_brand = async (req, res) => {
  console.log(req.body, "body");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let brand = new Brand();
      brand.create_date = req.body.create_date;
      brand.category = req.body.category;
      brand.subcategory = req.body.subcategory;

      brand.save((err, doc) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add Brand.",
          });
        } else {
          for (let i = 0; i < req.body.subbrand.length; i += 1) {
            let subbrands = new SubBrand();

            subbrands.name = req.body.subbrand[i].name;

            subbrands.save((err, subBrandResult) => {
              if (err) {
                return res.status(400).send({
                  message: "Failed to add cart.",
                });
              } else {
                doc.subbrand.push(subBrandResult._id);

                console.log(doc, "doc");
                if (i == req.body.subbrand.length - 1) {
                  doc.save((err, result) => {
                    if (err) {
                      return res.status(400).send("fail");
                    } else {
                      return res.status(201).send("success");
                    }
                  });
                }
              }
            });
          }
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.get_brand = async (req, res) => {
  Brand.find(
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

exports.get_brands = async (req, res) => {
  Brand.find()
    .populate("subbrand")
    .exec((err, results) => {
      if (err) {
        return res.status(400).send({
          message: err + "Get list product failed",
        });
      } else {
        res.json({
          data: {
            results,
          },
        });
      }
    });
};

const itemSubBrand = (brand, element) => {
  return new Promise((resolve, reject) => {
    if (element._id) {
      brand.subbrand.push(element._id);
      resolve(brand);
    } else {
      let subbrands = new SubBrand();
      (subbrands.name = element.name),
        subbrands.save((err, subbrandResult) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add comment.",
            });
          } else {
            //push description vao doc

            brand.subbrand.push(subbrandResult._id);
            resolve(brand);
          }
        });
    }
  });
};


const saveSubBrand = (itemSubBrands, res) => {
  return new Promise((resolve, reject) => {
    itemSubBrands.save((err, result) => {
      if (err) {
        return res.status(400).send("fail");
      } else {
        return res.status(201).send("success");
      }
    });
  });
};


exports.put_brand = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Brand.find({ _id: req.params.code })
        .populate("subbrand")
        .exec(async (err, branddoc) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            branddoc[0].category = req.body.category;
            branddoc[0].subcategory = req.body.subcategory;
            branddoc[0].create_date = req.body.create_date;
            branddoc[0].subbrand = [];

            for (let i = 0; i < req.body.subbrand.length; i += 1) {
              let itemSubBrands = await itemSubBrand(
                branddoc[0],
                req.body.subbrand[i]
              );
              if(i === req.body.subbrand.length - 1){
                await saveSubBrand(itemSubBrands, res);

              }
            }
          }
        });

     
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.delete_brand = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Brand.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "Brand delete successfully.",
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
