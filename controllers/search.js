const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");


exports.search_character = async (req, res) => {
  console.log(req.body);
  const { query } = req.body.character;
  console.log(query,'wuey')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
     
 if(req.body.character.length > 0 && req.body.character != null){
      Product.find({
        name: { $regex: req.body.character, $options: "i" },
      })
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
        .populate("affilateshop")
        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
            {
              path: "replycomment",
              populate: [{ path: "account" }],
            },
          ],
        })
        .populate({
          path: "color",
          populate: [{ path: "size" }],
        })
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            res.status(200).send(data);
          }
        });}else{
          res.status(200).send([]);
        }
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};
