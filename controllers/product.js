const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Product = require("../models/product");
const ThumbnailChildren = require("../models/thumbnailchildren");
const Description = require("../models/description");
const Comment = require("../models/comment");
const Color = require("../models/color");
const Size = require("../models/size");
const Affilateshop = require("../models/affilateshop");

exports.post_product = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Affilateshop.find({ name: req.body.formdata.affilateshop }).exec(
        (err, affilateshopCurrent) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            let product = new Product();
            product.code = req.body.formdata.code;
            product.name = req.body.formdata.name;
            product.thumbnail = req.body.thumbnailMain;
            product.create_date = new Date(req.body.formdata.create_date);
            product.status = req.body.formdata.status;
            product.brand = req.body.formdata.brand;
            product.category = req.body.formdata.category;
            product.affilateshop = affilateshopCurrent[0]._id;

            // product.video = req.body.dataform.video;
            // product.description = req.body.dataform.description;
            // product.qr = req.body.dataform.qr;
            // product.thumbnail_children = req.body.dataform.qr;
            // product.color = req.body.dataform.qr;
            // product.description = req.body.dataform.qr;
            // product.comment = req.body.dataform.qr;

            product.save((err, doc) => {
              if (err) {
                return res.status(400).send({
                  message: "Failed to add comment.",
                });
              } else {
                //for thumbnail
                for (let i = 0; i < req.body.thumbnailChildren.length; i += 1) {
                  let thumbnailchildren = new ThumbnailChildren();
                  (thumbnailchildren.alt =
                    req.body.thumbnailChildren[i].thumbnailchildren),
                    (thumbnailchildren.thumbnail =
                      req.body.thumbnailChildren[i].thumbnailchildren),
                    //save thumbnail
                    thumbnailchildren.save((err, docs) => {
                      if (err) {
                        return res.status(400).send({
                          message: "Failed to add comment.",
                        });
                      } else {
                        //push thumbnail
                        doc.thumbnail_children.push(docs._id);
                        //ket thuc for thumbnail
                        if (i === req.body.thumbnailChildren.length - 1) {
                          //save thumbnail vao doc
                          doc.save((err, thumbnailsave) => {
                            if (err) {
                              return res.status(400).send({
                                message: "Failed to add comment.",
                              });
                            } else {
                              //for description
                              for (
                                let d = 0;
                                d < req.body.description.length;
                                d += 1
                              ) {
                                let description = new Description();
                                (description.alt =
                                  req.body.description[d].thumbnaildescription),
                                  (description.thumbnail =
                                    req.body.description[
                                      d
                                    ].thumbnaildescription),
                                  (description.body =
                                    req.body.description[d].body),
                                  //save description
                                  description.save((err, descriptionResult) => {
                                    if (err) {
                                      return res.status(400).send({
                                        message: "Failed to add comment.",
                                      });
                                    } else {
                                      //push description vao doc
                                      doc.description.push(
                                        descriptionResult._id
                                      );
                                      //ket thuc vong lap for description
                                      if (
                                        d ===
                                        req.body.description.length - 1
                                      ) {
                                        //save doc
                                        doc.save((err, thumbnailsave) => {
                                          if (err) {
                                            return res.status(400).send({
                                              message: "Failed to add comment.",
                                            });
                                          } else {
                                            //for color

                                            for (
                                              let c = 0;
                                              c < req.body.sizecolor.length;
                                              c += 1
                                            ) {
                                              let color = new Color();

                                              (color.name =
                                                req.body.sizecolor[c].color),
                                                (color.thumbnail =
                                                  req.body.sizecolor[
                                                    c
                                                  ].thumbnailcolor),
                                                //save color
                                                color.save(
                                                  (err, colorResult) => {
                                                    if (err) {
                                                      return res
                                                        .status(400)
                                                        .send({
                                                          message:
                                                            "Failed to add .",
                                                        });
                                                    } else {
                                                      //push color vao doc
                                                      doc.color.push(
                                                        colorResult._id
                                                      );

                                                      //for size
                                                      for (
                                                        let s = 0;
                                                        s <
                                                        req.body.sizecolor[c]
                                                          .sizeprice.length;
                                                        s += 1
                                                      ) {
                                                        let size = new Size();
                                                        (size.name =
                                                          req.body.sizecolor[
                                                            c
                                                          ].sizeprice[s].name),
                                                          (size.price =
                                                            req.body.sizecolor[
                                                              c
                                                            ].sizeprice[
                                                              s
                                                            ].price),
                                                          (size.p_price =
                                                            req.body.sizecolor[
                                                              c
                                                            ].sizeprice[
                                                              s
                                                            ].p_price),
                                                          (size.amount =
                                                            req.body.sizecolor[
                                                              c
                                                            ].sizeprice[
                                                              s
                                                            ].amount),
                                                          (size.s_amount = "0"),
                                                          //luu size
                                                          size.save(
                                                            (
                                                              err,
                                                              sizeResult
                                                            ) => {
                                                              if (err) {
                                                                return res
                                                                  .status(400)
                                                                  .send({
                                                                    message:
                                                                      "Failed to add .",
                                                                  });
                                                              } else {
                                                                //push sive vao color
                                                                color.size.push(
                                                                  sizeResult._id
                                                                );

                                                                //het vong lap cua size
                                                                if (
                                                                  s ===
                                                                  req.body
                                                                    .sizecolor[
                                                                    c
                                                                  ].sizeprice
                                                                    .length -
                                                                    1
                                                                ) {
                                                                  color.save();

                                                                  //ket thuc vong for color
                                                                  if (
                                                                    c ===
                                                                    req.body
                                                                      .sizecolor
                                                                      .length -
                                                                      1
                                                                  ) {
                                                                    doc.save(
                                                                      (
                                                                        err,
                                                                        thumbnailsave
                                                                      ) => {
                                                                        if (
                                                                          err
                                                                        ) {
                                                                          return res
                                                                            .status(
                                                                              400
                                                                            )
                                                                            .send(
                                                                              "fail"
                                                                            );
                                                                        } else {
                                                                          return res
                                                                            .status(
                                                                              201
                                                                            )
                                                                            .send(
                                                                              "success"
                                                                            );
                                                                        }
                                                                      }
                                                                    );
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          );
                                                      }
                                                    }
                                                  }
                                                );
                                            }
                                          }
                                        });
                                      }
                                    }
                                  });
                              }
                            }
                          });
                        }
                      }
                    });
                }
              }
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

exports.get_product = async (req, res) => {
  try {
    Product.find({ _id: req.params.code })
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
          res.status(200).send(data[0]);
        }
      });
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.get_product_code = async (req, res) => {
  try {
    Product.find({ code: req.params.code })
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
          res.status(200).send(data[0]);
        }
      });
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.get_products = async (req, res) => {
  try {
    Product.find()
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
      });
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.get_product_top_sale = async (req, res) => {
  try {
    Product.find({ amount_sale: { $gt: 0 } })
      .sort({ amount_sale: -1 })
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
      });
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.get_product_category = async (req, res) => {
  try {
    Product.find({ category: req.params.code })
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
      });
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.post_get_product_category_feilter = async (req, res) => {
  try {
    if (
      req.body.data.brand.length === 0 &&
      req.body.data.star.length === 0 &&
      req.body.data.address.length === 0
    ) {
      Product.find({ category: req.body.data.category })
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
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
        });
    } else if (req.body.data.brand.length > 0) {
      Product.find(
        // {$or: [{category: req.body.data.category}]},

        {
          $and: [
            {
              $and: [
                { category: req.body.data.category },
                { brand: req.body.data.brand },
              ],
            },
            // {
            //   $and: [
            //     { rate: req.body.data.star },
            //     { address: req.body.data.address },
            //   ],
            // },
          ],
        }
      )
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
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
        });
    } else if (req.body.data.address.length > 0) {
      Product.find(
        // {$or: [{category: req.body.data.category}]},

        {
          $and: [
            {
              $and: [
                { category: req.body.data.category },
                // { brand: req.body.data.brand },
              ],
            },
            {
              $and: [
                // { rate: req.body.data.star },
                { address: req.body.data.address },
              ],
            },
          ],
        }
      )
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
          ],
          populate: [
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
          ],
          populate: [
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
        });
    } else if (req.body.data.star.length > 0) {
      Product.find(
        // {$or: [{category: req.body.data.category}]},

        {
          $and: [
            {
              $and: [
                { category: req.body.data.category },
                // { brand: req.body.data.brand },
              ],
            },
            {
              $and: [
                { rate: req.body.data.star },
                // { address: req.body.data.address },
              ],
            },
          ],
        }
      )
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
          ],
          populate: [
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
          ],
          populate: [
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
        });
    } else if (
      req.body.data.brand.length > 0 &&
      req.body.data.star.length > 0
    ) {
      Product.find(
        // {$or: [{category: req.body.data.category}]},

        {
          $and: [
            {
              $and: [
                { category: req.body.data.category },
                { brand: req.body.data.brand },
              ],
            },
            {
              $and: [
                { rate: req.body.data.star },
                // { address: req.body.data.address },
              ],
            },
          ],
        }
      )
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
          ],
          populate: [
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
          ],
          populate: [
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
        });
    } else if (
      req.body.data.brand.length > 0 &&
      req.body.data.address.length > 0
    ) {
      Product.find(
        // {$or: [{category: req.body.data.category}]},

        {
          $and: [
            {
              $and: [
                { category: req.body.data.category },
                { brand: req.body.data.brand },
              ],
            },
            {
              $and: [
                // { rate: req.body.data.star },
                { address: req.body.data.address },
              ],
            },
          ],
        }
      )
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
          ],
          populate: [
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
          ],
          populate: [
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
        });
    } else if (
      req.body.data.brand.length > 0 &&
      req.body.data.star.length > 0 &&
      req.body.data.address.length > 0
    ) {
      Product.find(
        // {$or: [{category: req.body.data.category}]},

        {
          $and: [
            {
              $and: [
                { category: req.body.data.category },
                { brand: req.body.data.brand },
              ],
            },
            {
              $and: [
                { rate: req.body.data.star },
                { address: req.body.data.address },
              ],
            },
          ],
        }
      )
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
          ],
          populate: [
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
          ],
          populate: [
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
        });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error: " + error,
    });
  }
};

exports.put_product_comment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Product.find({
        _id: req.params.code,
      })
        .populate("thumbnail_children")
        .populate("color")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate("description")
        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
          ],
          populate: [
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
          ],
          populate: [
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
        .exec((err, productCurrent) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            let comments = new Comment();

            comments.account = req.body.account;
            comments.product = req.params.code;
            comments.body = req.body.body;
            comments.create_date = new Date();

            comments.save((err, commentCurrent) => {
              if (err) {
                return res.status(400).send({
                  message: "Failed to add comment.",
                });
              } else {
                productCurrent[0].comment.push(commentCurrent._id);

                productCurrent[0].save((err, resultProduct) => {
                  if (err) {
                    return res.status(400).send({
                      message: "Failed to add comment.",
                    });
                  } else {
                    return res.status(201).send(resultProduct);
                  }
                });
              }
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

const saveProduct = (product) => {
  return new Promise((resolve, reject) => {
    product.save();
  });
};

const saveProductFinal = (product, res) => {
  return new Promise((resolve, reject) => {
    product.save((err, result) => {
      if (err) {
        return res.status(400).send("fail");
      } else {
        return res.status(201).send("success");
      }
    });
  });
};

const itemThumbnail = (product, element) => {
  return new Promise((resolve, reject) => {
    if (element._id) {
      product[0].thumbnail_children.push(element._id);

      resolve(product[0]);
    } else {
      let thumbnailchildren = new ThumbnailChildren();
      (thumbnailchildren.alt = element.thumbnail),
        (thumbnailchildren.thumbnail = element.thumbnail),
        //save thumbnail
        thumbnailchildren.save((err, docs) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add comment.",
            });
          } else {
            //push thumbnail
            product[0].thumbnail_children.push(docs._id);
            resolve(product[0]);
          }
        });
    }
  });
};

const itemDescription = (product, element) => {
  return new Promise((resolve, reject) => {
    if (element._id) {
      product[0].description.push(element._id);
      resolve(product[0]);
    } else {
      let description = new Description();
      (description.alt = element.thumbnail),
        (description.thumbnail = element.thumbnail),
        (description.body = element.body),
        //save description
        description.save((err, descriptionResult) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add comment.",
            });
          } else {
            //push description vao doc

            product[0].description.push(descriptionResult._id);
            resolve(product[0]);
          }
        });
    }
  });
};

const itemSize = (color, element) => {
  return new Promise((resolve, reject) => {
    if (element._id) {
      color.size.push(element._id);
      resolve(color);
    } else {
      let size = new Size();
      (size.name = element.name),
        (size.price = element.price),
        (size.p_price = element.p_price),
        (size.amount = element.amount),
        //luu size
        size.save(async (err, sizeResult) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add .",
            });
          } else {
            color.size.push(sizeResult._id);
            resolve(color);
          }
        });
    }
  });
};

const itemColor = async (product, element, res) => {
  return new Promise((resolve, reject) => {
    if (element._id) {
      product[0].color.push(element._id);

      Color.find({ _id: element._id })
        .populate("size")
        .exec(async (err, color) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            color[0].size = [];
            for (let s = 0; s < element.size.length; s += 1) {
              let colorSave = await itemSize(color[0], element.size[s]);
              if (s === element.size.length - 1) {
                colorSave.save();
                resolve(product[0]);
              }
            }
          }
        });

      ////
    } else {
      let color = new Color();

      (color.name = element.name),
        (color.thumbnail = element.thumbnail),
        //save color
        color.save(async (err, colorResult) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add .",
            });
          } else {
            //push color vao doc
            product[0].color.push(colorResult._id);
            for (let s = 0; s < element.size.length; s += 1) {
              let colorSave = await itemSize(colorResult, element.size[s]);
              if (s === element.size.length - 1) {
                colorSave.save();
                resolve(product[0]);
              }
            }
          }
        });
    }
  });
};

exports.put_product_all = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Product.find({ _id: req.params.code })
        .populate("thumbnail_children")
        .populate("description")
        .populate({ path: "evaluate", populate: [{ path: "account" }] })

        .populate({
          path: "comment",
          populate: [
            {
              path: "account",
            },
          ],
          populate: [
            {
              path: "likecomment",
              populate: [{ path: "account" }],
            },
          ],
          populate: [
            {
              path: "replycomment",
              populate: [{ path: "account" }],
            },
          ],

          populate: [
            {
              path: "color",
              populate: [{ path: "size" }],
            },
          ],
        })

        .exec(async (err, product) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            product[0].code = req.body.formdata.code;
            product[0].name = req.body.formdata.name;
            product[0].thumbnail = req.body.thumbnailMain;
            product[0].video = req.body.formdata.video;
            product[0].brand = req.body.formdata.brand;
            product[0].category = req.body.formdata.category;
            product[0].qr = req.body.formdata.qr;
            product[0].affilateshop = req.body.formdata.affilateshop._id;
            product[0].create_date = req.body.formdata.create_date;
            product[0].status = req.body.formdata.status;
            product[0].description = [];
            product[0].thumbnail_children = [];
            product[0].color = [];

            for (let d = 0; d < req.body.description.length; d += 1) {
              let descriptionSave = await itemDescription(
                product,
                req.body.description[d]
              );

              if (d === req.body.description.length - 1) {
                for (let t = 0; t < req.body.thumbnailChildren.length; t += 1) {
                  let thumbnailSave = await itemThumbnail(
                    product,
                    req.body.thumbnailChildren[t]
                  );

                  if (t === req.body.thumbnailChildren.length - 1) {
                    ///////------

                    if (req.body.sizecolor.length === 0) {
                      await saveProductFinal(descriptionSave, res);
                      await saveProductFinal(thumbnailSave, res);
                    }
                    for (let c = 0; c < req.body.sizecolor.length; c += 1) {
                      let colorSave = await itemColor(
                        product,
                        req.body.sizecolor[c]
                      );

                      if (c === req.body.sizecolor.length - 1) {
                        await saveProductFinal(descriptionSave, res);
                        await saveProductFinal(thumbnailSave, res);
                        await saveProductFinal(colorSave, res);
                      }
                    }
                  }
                }
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

exports.put_product = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Product.update(
        {
          _id: req.params.code,
        },
        {
          s_amount: req.body.dataform.s_amount,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send("faild");
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

const fs = require("fs");
const csv = require("csv-parser");
const { resolve } = require("path");
const { rejects } = require("assert");

const fileDataCSV = () => {
  return new Promise((resolve, rejects) => {
    const data = [];
    fs.createReadStream("utils/file/Data.csv")
      .pipe(csv())
      .on("data", (r) => {
        data.push(r);
      })
      .on("end", () => {
        resolve(data);
      });
  });
};

const fileTestCSV = () => {
  return new Promise((resolve, rejects) => {
    const data = [];
    fs.createReadStream("utils/file/Test.csv")
      .pipe(csv())
      .on("data", (r) => {
        data.push(r);
      })
      .on("end", () => {
        resolve(data);
      });
  });
};

const fileNameCSV = () => {
  return new Promise((resolve, rejects) => {
    fs.readFile("utils/file/Name.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      return resolve(data);
    });
  });
};

const fileListUserCSV = () => {
  return new Promise((resolve, rejects) => {
    const data = [];
    fs.createReadStream("utils/file/Account.csv")
      .pipe(csv())
      .on("data", (r) => {
        data.push(r);
      })
      .on("end", () => {
        resolve(data);
      });
  });
};

const fileListProductCSV = () => {
  return new Promise((resolve, rejects) => {
    const data = [];
    fs.createReadStream("utils/file/ListProduct.csv")
      .pipe(csv())
      .on("data", (r) => {
        data.push(r);
      })
      .on("end", () => {
        resolve(data);
      });
  });
};

const GetArrTenKH = (fileListUser) => {
  return new Promise((resolve, rejects) => {
    let arr = [];
    fileListUser.forEach((element) => {
      arr.push(element.Name);
    });

    resolve(arr);
  });
};

const GetArrTenSP = (fileListUser) => {
  return new Promise((resolve, rejects) => {
    let arr = [];
    fileListUser.forEach((element) => {
      arr.push(element.Name);
    });

    resolve(arr);
  });
};

const GetListProduct = (DSSP) => {
  let ListProduct = [];



  return new Promise((resolve, rejects) => {
  
  console.log(DSSP,'DSSP')
    for (let i = 0; i < DSSP.length; i++) {
      Product.find({ _id: DSSP[i] })
      .populate("thumbnail_children")
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
        .exec(async (err, product) => {
          if (err) {
            return res.status(400).send({
              message: err + "Get list product failed",
            });
          } else {
            ListProduct.push(product[0]);

            if (i === DSSP.length - 1) {
              resolve(ListProduct);
            }
          }
        });
    }
  });
};

exports.recommender_system = async (req, res) => {
  console.log(req.params.code, "code");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      const fileData = await fileDataCSV();
      const fileTest = await fileTestCSV();
      const fileName = await fileNameCSV();
      const fileListUser = await fileListUserCSV();
      const fileListProduct = await fileListProductCSV();

      const tenKH = await GetArrTenKH(fileListUser);
      // const tenSP = await GetArrTenSP(fileListProduct);

      const loadData = async () => {
        const ID_chu = req.params.code;
        //Ham tim id chinh
        const dataUserMain = [];
        let id_c = 0;
        let paramsIDCHU = 0;

        const paramsVector = [];
        let total = 0;
        // const ID_chu = "Vinhtu99";
        for (let i = 0; i < tenKH.length; i++) {
          if (tenKH[i] == ID_chu) {
            id_c = i;
            for (let j = 0; j < fileData.length; j++) {
              if (fileData[j].NameCustomor == i) {
                dataUserMain.push(
                  parseInt(fileData[j].Product),
                  parseInt(fileData[j].Rate)
                );
              }
            }
          }
        }

        //Ham Lap vector

        for (let i = 0; i < dataUserMain.length; i++) {
          total = total + dataUserMain[i];
        }

        paramsIDCHU = total / (dataUserMain.length * 100);

        paramsVector.push(paramsIDCHU);
        let paramsExits = [id_c];

        for (let i = 0; i < fileData.length; i++) {
          let dataVetorCustomor = [];

          if (!paramsExits.includes(parseInt(fileData[i].NameCustomor))) {
            paramsExits.push(parseInt(fileData[i].NameCustomor));

            for (let j = 0; j < fileData.length; j++) {
              if (fileData[i].NameCustomor == fileData[j].NameCustomor) {
                dataVetorCustomor.push(
                  parseInt(fileData[j].Product),
                  parseInt(fileData[j].Rate)
                );
              }
            }
            let total = 0;
            for (let i = 0; i < dataVetorCustomor.length; i++) {
              total = total + dataVetorCustomor[i];
            }

            paramsVector.push(total / (dataVetorCustomor.length * 100));
          }
        }

        //Ham tinh toan do tuong thich

        let cosIdMain = Math.cos(paramsIDCHU);
        let arrSpace = [Math.cos(paramsIDCHU)];

        for (let i = 1; i < paramsVector.length; i++) {
          arrSpace.push(Math.cos(paramsVector[i]));
        }

        let max = cosIdMain;
        let min = 0;
        let resultpacei = 0;
        for (let i = 1; i < arrSpace.length; i++) {
          if (arrSpace[i] <= max) {
            resultpacei = i;
          }
        }

        //Ham lay ten san pham

        let SP = [];

        for (let i = 0; i < fileData.length; i++) {
          if (paramsExits[resultpacei] == fileData[i].NameCustomor) {
            SP.push(parseInt(fileData[i].Product));
          }
        }

        let DSSP = [];

        for (let i = 0; i < fileListProduct.length; i++) {
          if (SP.includes(parseInt(fileListProduct[i].Id))) {
            DSSP.push(fileListProduct[i].ObjectId);
          }
        }
        const result = await GetListProduct(DSSP);
        console.log(result.length, "result");

        return result;
      };

      loadData().then((data) => res.status(201).send(data));
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.delete_product = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Product.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "product delete successfully.",
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

// product.save((err, doc) => {
//   if (err) {
//     return res.status(400).send({
//       message: "Failed to add comment.",
//     });
//   } else {
//     const x = () => {

//      for (let i = 0; i < req.body.thumbnailChildren.length; i += 1) {
//       let thumbnailchildren = new ThumbnailChildren();
//       (thumbnailchildren.alt =
//         req.body.thumbnailChildren[i].thumbnailchildren),
//         (thumbnailchildren.thumbnail =
//           req.body.thumbnailChildren[i].thumbnailchildren),
//         thumbnailchildren.save((err, docs) => {
//           if (err) {
//             return res.status(400).send({
//               message: "Failed to add comment.",
//             });
//           } else {
//             doc.thumbnail_children.push(docs._id);
//             if (i === req.body.thumbnailChildren.length - 1) {
//               doc.save((err, thumbnailsave) => {
//                 if (err) {
//                   return res.status(400).send({
//                     message: "Failed to add comment.",
//                   });
//                 } else {
//                   for (
//                     let d = 0;
//                     d < req.body.description.length;
//                     d += 1
//                   ) {
//                     let description = new Description();
//                     (description.alt =
//                       req.body.description[d].thumbnaildescription),
//                       (description.thumbnail =
//                         req.body.description[d].thumbnaildescription),
//                       (description.body = req.body.description[d].body),
//                       description.save((err, descriptionResult) => {
//                         if (err) {
//                           return res.status(400).send({
//                             message: "Failed to add comment.",
//                           });
//                         } else {
//                           doc.description.push(descriptionResult._id);
//                           if (d === req.body.description.length - 1) {
//                             // doc.save();

//                           }
//                         }
//                       });
//                   }
//                 }
//               });
//             }

//             console.log(req.body, "body");
//             for (let c = 0; c < req.body.sizecolor.length; c += 1) {
//               let color = new Color();

//               (color.name = req.body.sizecolor[c].color),
//                 (color.thumbnail = req.body.sizecolor[c].thumbnailcolor),
//                 color.save((err, colorResult) => {
//                   if (err) {
//                     return res.status(400).send({
//                       message: "Failed to add .",
//                     });
//                   } else {
//                     doc.color.push(colorResult._id);
//                     // color.save();

//                     for (
//                       let s = 0;
//                       s < req.body.sizecolor[c].sizeprice.length;
//                       s += 1
//                     ) {
//                       let size = new Size();
//                       (size.name =
//                         req.body.sizecolor[c].sizeprice[s].name),
//                         (size.price =
//                           req.body.sizecolor[c].sizeprice[s].price),
//                         (size.p_price =
//                           req.body.sizecolor[c].sizeprice[s].p_price),
//                         (size.amount =
//                           req.body.sizecolor[c].sizeprice[s].amount),
//                         (size.s_amount = "0"),
//                         size.save((err, sizeResult) => {
//                           if (err) {
//                             return res.status(400).send({
//                               message: "Failed to add .",
//                             });
//                           } else {
//                             colorResult.size.push(sizeResult._id);
//                             console.log(colorResult, "color reslut");
//                             if (
//                               s ===
//                               req.body.sizecolor[c].sizeprice.length - 1
//                             ) {
//                               color.save();
//                             }
//                           }
//                         });
//                     }
//                   }
//                 });
//             }
//           }
//         });
//     }
//   }

//   }
// });

///////------

// for (
//   let c = 0;
//   c < req.body.sizecolor.length;
//   c += 1
// ) {

//   if(req.body.sizecolor[c]._id){
//     product.color.push(req.body.sizecolor[c]._id);

//     for (
//       let s = 0;
//       s <
//       req.body.sizecolor[c]
//         .sizeprice.length;
//       s += 1
//     ) {

//       if(req.body.sizecolor[c]
//         .sizeprice[s]._id){
//           product.color.size.push(req.body.sizecolor[c]
//             .sizeprice[s]._id)

//         }
//         else{
//           let size = new Size();
//           (size.name =
//             req.body.sizecolor[
//               c
//             ].sizeprice[s].name),
//             (size.price =
//               req.body.sizecolor[
//                 c
//               ].sizeprice[
//                 s
//               ].price),
//             (size.p_price =
//               req.body.sizecolor[
//                 c
//               ].sizeprice[
//                 s
//               ].p_price),
//             (size.amount =
//               req.body.sizecolor[
//                 c
//               ].sizeprice[
//                 s
//               ].amount),
//             (size.s_amount = "0"),
//             //luu size
//             size.save(
//               (
//                 err,
//                 sizeResult
//               ) => {
//                 if (err) {
//                   return res
//                     .status(400)
//                     .send({
//                       message:
//                         "Failed to add .",
//                     });
//                 } else {
//                   //push sive vao color
//                   product.color.size.push(
//                     sizeResult._id
//                   );

//                   //het vong lap cua size
//                   if (
//                     s ===
//                     req.body
//                       .sizecolor[
//                       c
//                     ].sizeprice
//                       .length -
//                       1
//                   ) {

//                     // color.save();

//                     //ket thuc vong for color
//                     if (
//                       c ===
//                       req.body
//                         .sizecolor
//                         .length -
//                         1
//                     ) {
//                       // console.log(
//                       //   "chay het vong lap color color color va luu vao doc"
//                       // );
//                       // doc.save(
//                       //   (
//                       //     err,
//                       //     thumbnailsave
//                       //   ) => {
//                       //     if (
//                       //       err
//                       //     ) {
//                       //       return res
//                       //         .status(
//                       //           400
//                       //         )
//                       //         .send(
//                       //           {
//                       //             message:
//                       //               "Failed to add comment.",
//                       //           }
//                       //         );
//                       //     } else {
//                       //       return res
//                       //         .status(
//                       //           201
//                       //         )
//                       //         .send(
//                       //           {
//                       //             message:
//                       //               "post successfully.",
//                       //           }
//                       //         );
//                       //     }
//                       //   }
//                       // );
//                     }
//                   }
//                 }
//               }
//             );
//         }

//         }

//     ////

//   }else{

//     let color = new Color();

//     (color.name =
//       req.body.sizecolor[c].color),
//       (color.thumbnail =
//         req.body.sizecolor[
//           c
//         ].thumbnailcolor),
//       //save color
//       color.save(
//         (err, colorResult) => {
//           if (err) {
//             return res
//               .status(400)
//               .send({
//                 message:
//                   "Failed to add .",
//               });
//           } else {
//             //push color vao doc
//             product.color.push(
//               colorResult._id
//             );

//             for (
//               let s = 0;
//               s <
//               req.body.sizecolor[c]
//                 .sizeprice.length;
//               s += 1
//             ) {
//               console.log(
//                 "so vong lap for vi tri ",
//                 c,
//                 "vong lap size vitri",
//                 s
//               );
//               let size = new Size();
//               (size.name =
//                 req.body.sizecolor[
//                   c
//                 ].sizeprice[s].name),
//                 (size.price =
//                   req.body.sizecolor[
//                     c
//                   ].sizeprice[
//                     s
//                   ].price),
//                 (size.p_price =
//                   req.body.sizecolor[
//                     c
//                   ].sizeprice[
//                     s
//                   ].p_price),
//                 (size.amount =
//                   req.body.sizecolor[
//                     c
//                   ].sizeprice[
//                     s
//                   ].amount),
//                 (size.s_amount = "0"),
//                 //luu size
//                 size.save(
//                   (
//                     err,
//                     sizeResult
//                   ) => {
//                     if (err) {
//                       return res
//                         .status(400)
//                         .send({
//                           message:
//                             "Failed to add .",
//                         });
//                     } else {
//                       //push sive vao color
//                       product.color.size.push(
//                         sizeResult._id
//                       );

//                       //het vong lap cua size
//                       if (
//                         s ===
//                         req.body
//                           .sizecolor[
//                           c
//                         ].sizeprice
//                           .length -
//                           1
//                       ) {
//                         console.log(
//                           "chay het vong lap size size size va luu vao doc"
//                         );
//                         // color.save();

//                         //ket thuc vong for color
//                         if (
//                           c ===
//                           req.body
//                             .sizecolor
//                             .length -
//                             1
//                         ) {
//                           console.log(
//                             "chay het vong lap color color color va luu vao doc"
//                           );
//                           doc.save(
//                             (
//                               err,
//                               thumbnailsave
//                             ) => {
//                               if (
//                                 err
//                               ) {
//                                 return res
//                                   .status(
//                                     400
//                                   )
//                                   .send(
//                                     {
//                                       message:
//                                         "Failed to add comment.",
//                                     }
//                                   );
//                               } else {
//                                 return res
//                                   .status(
//                                     201
//                                   )
//                                   .send(
//                                     {
//                                       message:
//                                         "post successfully.",
//                                     }
//                                   );
//                               }
//                             }
//                           );
//                         }
//                       }
//                     }
//                   }
//                 );
//             }

//           }})

//   }

//for size

///--------
