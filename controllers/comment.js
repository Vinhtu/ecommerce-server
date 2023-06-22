const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Comment = require("../models/comment");
const Likecomment = require("../models/likecomment");
const Replycomment = require("../models/replycomment");

exports.create = async (req, res) => {
  var commentExamples = [
    {
      fullname: "Truong ngoc vinh tu",
      username: "vinhtu125@gmail.com",
      password: "123456",
    },
  ];
  Comment.create(commentExamples, function (err, results) {
    if (err) {
      console.log(err, "err");
    }
    res.send(results);
  });
};

exports.post_comment = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let comment = new Comment();
      comment.account = req.body.account;
      comment.product = req.body.product;
      comment.body = req.body.body;
      comment.n_like = req.body.n_like;
      comment.create_date = req.body.create_date;

      comment.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add comment.",
          });
        } else {
          return res.status(201).send({
            message: "comment post successfully.",
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

exports.get_comment = async (req, res) => {
  Comment.find(
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

exports.get_comments = async (req, res) => {
  Comment.find(function (err, results) {
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

exports.put_body_comment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Comment.update(
        {
          _id: req.params.code,
        },
        {
         
          body: req.body.body,
        
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

exports.put_comment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Comment.update(
        {
          _id: req.params.code,
        },
        {
          account: req.body.account,
          product: req.body.product,
          body: req.body.body,
          n_like: req.body.n_like,
          create_date: req.body.create_date,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "comment update failed",
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

exports.put_like_comment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Comment.find({
        _id: req.params.code,
      })
      .exec((err, commentCurrent) => {
        if (err) {
          return res.status(400).send({
            message: err + "Get list product failed",
          });
        } else {

          let likeComment = new Likecomment();

          likeComment.account = req.body.account;
          likeComment.create_date = new Date();

          likeComment.save((err, likeCommentCurrent) => {
            if (err) {
              return res.status(400).send({
                message: "Failed to add comment.",
              });
            } else {

              commentCurrent[0].likecomment.push(likeCommentCurrent._id);
              commentCurrent[0].n_like =  parseInt(commentCurrent[0].n_like) + 1;

              commentCurrent[0].save((err, resultProduct) => {
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


exports.put_reply_comment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Comment.find({
        _id: req.params.code,
      })
      .exec((err, commentCurrent) => {
        if (err) {
          return res.status(400).send({
            message: err + "Get list product failed",
          });
        } else {

          let replyComment = new Replycomment;

          replyComment.account = req.body.account;
          replyComment.comment = commentCurrent._id;
          replyComment.body = req.body.body;
          replyComment.create_date = new Date();

          replyComment.save((err, replycommentCurrent) => {
            if (err) {
              return res.status(400).send({
                message: "Failed to add comment.",
              });
            } else {
              commentCurrent[0].replycomment.push(replycommentCurrent._id);

              commentCurrent[0].save((err, resultProduct) => {
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


exports.delete_comment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Comment.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "comment delete successfully.",
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
