const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Category = require("../models/category");
const SubCategory = require("../models/subcategory");

// exports.post_category_tree = async (req, res) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).send({
//       message: errors.array(),
//     });
//   } else {
//     try {
//       let category = new Category();
//       category.code = req.body.code;
//       category.type = req.body.type;
//       category.name = req.body.name;
//       category.show = req.body.show;
//       category.create_date = req.body.create_date;

//       category.save((err) => {
//         if (err) {
//           return res.status(400).send('fail');
//         } else {
//           return res.status(201).send("success");
//         }
//       });
//     } catch (error) {
//       res.status(400).send({
//         message: "Error: " + error,
//       });
//     }
//   }
// };

exports.post_category = async (req, res) => {
  console.log(req.body, "body");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let category = new Category();
      category.type = req.body.type;
      category.name = req.body.name;
      category.image = req.body.image;
      category.show = req.body.show;

      category.create_date = req.body.create_date;

      category.save((err, doc) => {
        if (err) {
          return res.status(400).send("fail");
        } else {
          for (let i = 0; i < req.body.subcategory.length; i += 1) {
            let subcategorys = new SubCategory();

            subcategorys.name = req.body.subcategory[i].name;

            subcategorys.save((err, subcategoryResult) => {
              if (err) {
                return res.status(400).send({
                  message: "Failed to add cart.",
                });
              } else {
                doc.subcategory.push(subcategoryResult._id);

                console.log(doc, "doc");
                if (i == req.body.subcategory.length - 1) {
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

exports.get_category = async (req, res) => {
  Category.find(
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

exports.get_categorys = async (req, res) => {
  Category.find()
    .populate("subcategory")
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




const itemSubCategory = (category, element) => {
  return new Promise((resolve, reject) => {
    if (element._id) {
      category.subcategory.push(element._id);
      resolve(category);
    } else {
      let categorys = new SubCategory();
      (categorys.name = element.name),
    
      categorys.save((err, categorysResult) => {
          if (err) {
            return res.status(400).send({
              message: "Failed to add comment.",
            });
          } else {
            //push description vao doc

            category.subcategory.push(categorysResult._id);
            resolve(category);
          }
        });
    }
  });
};


const saveSubCategory = (itemCategory, res) => {
  console.log(itemCategory,'item sub category')
  return new Promise((resolve, reject) => {
    itemCategory.save((err, result) => {
      if (err) {
        return res.status(400).send("fail");
      } else {
        return res.status(201).send("success");
      }
    });
  });
};



exports.put_category = async (req, res) => {


  Category.find({ _id: req.params.code })
  .populate("subcategory")
  .exec(async (err, categorydoc) => {
    if (err) {
      return res.status(400).send({
        message: err + "Get list product failed",
      });
    } else {
      categorydoc[0].create_date = req.body.create_date;
      categorydoc[0].name = req.body.name;
      categorydoc[0].image = req.body.image;
      categorydoc[0].type = req.body.type;
      categorydoc[0].show = req.body.show;
      categorydoc[0].subcategory = [];

      for (let i = 0; i < req.body.subcategory.length; i += 1) {
        let itemSubCategorys = await itemSubCategory(
          categorydoc[0],
          req.body.subcategory[i]
        );
        if(i === req.body.subcategory.length - 1){
          await saveSubCategory(itemSubCategorys, res);

        }
      }
    }
  });
};

exports.delete_category = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Category.findByIdAndDelete(req.params.code, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "category delete successfully.",
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
