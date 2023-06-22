const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Reportcomment = require("../models/reportcomment");

const Comment = require("../models/comment");
const Likecomment = require("../models/likecomment");
const Replycomment = require("../models/replycomment");
const Notification = require("../models/notification");


exports.post_reportcomment = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let reportcomment = new Reportcomment();
      reportcomment.account_send = req.body.account_send;
      reportcomment.account_receive = req.body.account_receive;
      reportcomment.comment = req.params.code;
      reportcomment.sub_title = req.body.sub_title;
      reportcomment.body = req.body.body;

      reportcomment.save((err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add reportcomment.",
          });
        } else {

          let notification = new Notification();

          notification.code = req.body.code;
          notification.account_send = req.body.account_send;
          notification.account_receive = req.body.account_receive;
          notification.title = "Report comment";
          notification.sub_title = req.body.sub_title;
          notification.body = req.body.body;
          notification.status = "Pending";
          notification.role = "Comment";

          notification.save((err, resultNotification) => {
            if (err) {
              return res.status(400).send({
                message: "Failed to add reportcomment.",
              });
            } else {
              let notifications = new Notification();

              notifications.code = req.body.code;
              notifications.account_send = req.body.account_send;
              notifications.account_receive = req.body.account_send;
              notifications.title = "Phan hoi danh gia";
              notifications.sub_title = req.body.sub_title;
              notifications.body =
                "Danh gia cua ban da duoc tiep thu va se duoc su ly khi xem xet ";
              notifications.status = "Pending";
              notifications.role = "Comment";

              notifications.save((err, resultNotifications) => {
                if (err) {
                  return res.status(400).send({
                    message: "Failed to add reportcomment.",
                  });
                } else {
                  return res.status(201).send({
                    message: "reportcomment post successfully.",
                  });
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

// exports.get_reportcomment = async (req, res) => {
//   Reportcomment.find(
//     {
//       _id: req.params.code,
//     },
//     function (err, result) {
//       if (err) {
//         throw err;
//       } else {
//         res.json({
//           data: result,
//         });
//       }
//     }
//   );
// };

// exports.get_reportcomments = async (req, res) => {
//   Reportcomment.find(function (err, results) {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.json({
//         data: {
//           results,
//         },
//       });
//     }
//   });
// };

// exports.put_reportcomment = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).send({
//       message: errors.array(),
//     });
//   } else {
//     try {
//       Reportcomment.update(
//         {
//           _id: req.params.code,
//         },
//         {
//           account: req.body.account,
//           product: req.body.product,
//           body: req.body.body,
//           n_like: req.body.n_like,
//           create_date: req.body.create_date,
//         },
//         (err, data) => {
//           if (err) {
//             return res.status(400).send({
//               message: "reportcomment update failed",
//             });
//           } else {
//             return res.status(201).send({
//               message: "Accont update successfully.",
//             });
//           }
//         }
//       );
//     } catch (error) {
//       res.status(400).send({
//         message: "Error: " + error,
//       });
//     }
//   }
// };

// exports.put_like_reportcomment = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).send({
//       message: errors.array(),
//     });
//   } else {
//     try {
//       Reportcomment.find({
//         _id: req.params.code,
//       })
//       .exec((err, reportcommentCurrent) => {
//         if (err) {
//           return res.status(400).send({
//             message: err + "Get list product failed",
//           });
//         } else {

//           let likereportcomment = new Likecomment();

//           likereportcomment.account = req.body.account;
//           likereportcomment.create_date = new Date();

//           likereportcomment.save((err, likereportcommentCurrent) => {
//             if (err) {
//               return res.status(400).send({
//                 message: "Failed to add comment.",
//               });
//             } else {
//               reportcommentCurrent[0].likereportcomment.push(likereportcommentCurrent._id);

//               reportcommentCurrent[0].save((err, resultProduct) => {
//                 if (err) {
//                   return res.status(400).send({
//                     message: "Failed to add reportcomment.",
//                   });
//                 } else {
//                   console.log(resultProduct,'resultproduct')
//                   return res.status(201).send(resultProduct);
//                 }
//               });
//             }
//           });
//         }
//       });
//     } catch (error) {
//       res.status(400).send({
//         message: "Error: " + error,
//       });
//     }
//   }
// };

// exports.put_reply_reportcomment = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).send({
//       message: errors.array(),
//     });
//   } else {
//     try {
//       Reportcomment.find({
//         _id: req.params.code,
//       })
//       .exec((err, reportcommentCurrent) => {
//         if (err) {
//           return res.status(400).send({
//             message: err + "Get list product failed",
//           });
//         } else {

//           let replyreportcomment = new Replycomment;

//           replyreportcomment.account = req.body.account;
//           replyreportcomment.reportcomment = reportcommentCurrent._id;
//           replyreportcomment.body = req.body.body;
//           replyreportcomment.create_date = new Date();

//           replyreportcomment.save((err, replyreportcommentCurrent) => {
//             if (err) {
//               return res.status(400).send({
//                 message: "Failed to add reportcomment.",
//               });
//             } else {
//               reportcommentCurrent[0].replyreportcomment.push(replyreportcommentCurrent._id);

//               reportcommentCurrent[0].save((err, resultProduct) => {
//                 if (err) {
//                   return res.status(400).send({
//                     message: "Failed to add reportcomment.",
//                   });
//                 } else {
//                   console.log(resultProduct,'resultproduct')
//                   return res.status(201).send(resultProduct);
//                 }
//               });
//             }
//           });
//         }
//       });
//     } catch (error) {
//       res.status(400).send({
//         message: "Error: " + error,
//       });
//     }
//   }
// };

// exports.delete_comment = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).send({
//       message: errors.array(),
//     });
//   } else {
//     try {
//       Reportcomment.findByIdAndDelete(req.params.code, null, (err, result) => {
//         if (err) {
//           return res.status(400).send({
//             message: "Delete failed",
//           });
//         } else {
//           return res.status(201).send({
//             message: "Reportcomment delete successfully.",
//           });
//         }
//       });
//     } catch (error) {
//       res.status(200).send({
//         message: "Error: " + error,
//       });
//     }
//   }
// };
