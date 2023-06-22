var product = require("../models/productModel");
const verify = require("./verifyToken");
var sessionstorage = require("sessionstorage");

function getProducts(res, start, end) {
  product.find(function (err, results) {
    if (err) {
      res.status(500).json(err);
    } else {
      var resultPage = results.slice(start, end);
      res.json({
        data: resultPage,
        meta: {
          totalPage: Math.round(results.length / 6),
        },
      });
    }
  });
}

function getProductFilter(res, start, end) {
  var resultPage = res.slice(start, end);

  return {
    data: resultPage,
    meta: {
      totalPage: Math.round(res.length / 6),
    },
  };
}

module.exports = function (app) {
  app.get("/get/products", function (req, res) {
    let productExample = [
      {
        name_owner: "Trương Ngọc Thạnh",
        number_owner: "0336850139",
        name: "Đất demo 1",
        type_product: "test",
        area: "1000",
        widthHeight: "10-100",
        num_facade: "1",
        describe_facade: "mặt tiền đá mi dài 10m",
        location: "https://goo.gl/maps/qHV64r4Knb3xQ3fU6",
        city: "Hà Nội",
        code_city: "hanoi",
        county: "Ba Đình",
        code_county: "badinh",
        code_commune: "kimma",
        commune: "Kim Mã",
        numLotSheet: "12/43",
        address: "Ấp 1 , xã Phú Tân , Huyện Định Quán , Tỉnh Đồng Nai",
        negotiable_price: "120.000.000",
        fixed_price: "100.000.000",
        rose: "2.000.000",
        describe:
          "Đất có sổ sách đầy đủ , và có 100m2 thổ cư, có nhà và điện cấp 4",
        select_master: "Trung gian",
        name_middleman: "Võ Thị Út",
        number_middleman: "0364349847",
        address_middleman: "Khu 2 , ấp 1 Phú Tân Huyện Định Quán ",
        rose_middleman: "1.000.000",
        describe_middleman: "Làm việc lâu dài và uy tín",
        image:
          "https://cdn.bds321.com/uploads/544534/conversions/54250666df88b76385ffc5362aa50cac-large.jpg",
        image_book:
          "https://cdn.homedy.com/store/images/2019/07/18/201803092446-482b58c21595fbcba284-636990372732501289.jpg",
        image_draw:
          "https://sumitech.vn/wp-content/uploads/ban-ve-dien-nha-xuong.jpg",
        date_time: "15-06-2021",
        status: "Đang bán",
        user: "60fbb89c9a9a81530d0188c",
      },
    ];
    product.create(productExample, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
  });

  // app.get("/products/:page", function(req, res) {

  //     const currentUser = sessionstorage.getItem('currentUser');
  //     var resultSub = currentUser._id.substring(1, currentUser._id.length - 1);
  //     console.log(resultSub , 'result')

  //     product.find({
  //             user: resultSub
  //         },
  //         function(err, result) {
  //             if (err) {
  //                 throw err;
  //             } else {

  //                 res.json({
  //                     data: result,

  //                 });

  //             }
  //         });

  // });
  app.get("/products/:currentPage", function (req, res) {
    let page = parseInt(req.params.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    const currentUser = sessionstorage.getItem("currentUser");
    var resultSub = currentUser._id.substring(1, currentUser._id.length - 1);
    product.find(
      {
        user: resultSub,
      },
      function (err, result) {
        if (err) {
          throw err;
        } else {
          var resultPage = result.slice(start, end);
          res.json({
            data: resultPage,
            meta: {
              totalPage: Math.round(result.length / 6),
            },
          });
        }
      }
    );
    // getProducts(res, start, end);
  });

  app.get("/products/:currentPage/:city", function (req, res) {
    let page = parseInt(req.params.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    if (req.params.city) {
      product.find({ code_city: req.params.city }, function (err, result) {
        if (err) {
          throw err;
        } else {
          var resultPage = result.slice(start, end);
          res.json({
            data: resultPage,
            meta: {
              totalPage: Math.round(result.length / 6),
            },
          });
        }
      });
    } else {
      getProducts(res, start, end);
    }
  });

  app.get("/products/:currentPage/:lotsheet", function (req, res) {
    let page = parseInt(req.params.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    if (req.params.lotsheet) {
      product.find(
        { numLotSheet: req.params.lotsheet },
        function (err, result) {
          if (err) {
            throw err;
          } else {
            var resultPage = result.slice(start, end);
            res.json({
              data: resultPage,
              meta: {
                totalPage: Math.round(result.length / 6),
              },
            });
          }
        }
      );
    } else {
      getProducts(res, start, end);
    }
  });

  app.get("/products/:currentPage/money/:money", function (req, res) {
    let page = parseInt(req.params.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    if (req.params.money) {
      product.find(
        { negotiable_price: req.params.money },
        function (err, result) {
          if (err) {
            throw err;
          } else {
            var resultPage = result.slice(start, end);
            res.json({
              data: resultPage,
              meta: {
                totalPage: Math.round(result.length / 6),
              },
            });
          }
        }
      );
    } else {
      getProducts(res, start, end);
    }
  });

  app.get("/products/:currentPage/:city/:county", function (req, res) {
    let page = parseInt(req.params.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    if (req.params.city && req.params.county) {
      product.find(
        { code_city: req.params.city, code_county: req.params.county },
        function (err, result) {
          if (err) {
            throw err;
          } else {
            var resultPage = result.slice(start, end);
            res.json({
              data: resultPage,
              meta: {
                totalPage: Math.round(result.length / 6),
              },
            });
          }
        }
      );
    } else {
      getProducts(res, start, end);
    }
  });

  app.get("/products/:currentPage/:city/:county/:commune", function (req, res) {
    let page = parseInt(req.params.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    if (req.params.city && req.params.county && req.params.commune) {
      product.find(
        {
          code_city: req.params.city,
          code_county: req.params.county,
          code_commune: req.params.commune,
        },
        function (err, result) {
          if (err) {
            throw err;
          } else {
            var resultPage = result.slice(start, end);
            res.json({
              data: resultPage,
              meta: {
                totalPage: Math.round(result.length / 6),
              },
            });
          }
        }
      );
    } else {
      getProducts(res, start, end);
    }
  });

  app.post("/products/address", function (req, res) {
    let page = parseInt(req.body.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    // var resData = res.slice(start, end);
    // console.log(resData);



    if (req.body.city) {
      product.find({ city: req.body.city }, function (err, result) {
        if (err) {
          throw err;
        } else {
          var resultPage = result.slice(start, end);
          res.json({
            data: resultPage,
            meta: {
              totalPage: Math.round(result.length / 6),
            },
          });

          // getProductFilter(result, start, end);
        }
      });
    } else {
      getProducts(res, start, end);
    }
  });

  app.get("/product/:id", function (req, res) {
    product.findById({ _id: req.params.id }, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.json(result);
      }
    });
  });
  app.get("/productcity", function (req, res) {
    product.find(
      { type_product: req.body.type_product },
      function (err, result) {
        if (err) {
          throw err;
        } else {
          res.json(result);
        }
      }
    );
  });

  app.post("/product", function (req, res) {
    const currentUser = sessionstorage.getItem("currentUser");
    var resultSub = currentUser._id.substring(1, currentUser._id.length - 1);

    let products = {
      name_owner: req.body.name_owner,
      number_owner: req.body.number_owner,
      name: req.body.name,
      type_product: req.body.type_product,
      area: req.body.area,
      widthHeight: req.body.widthHeight,
      num_facade: req.body.num_facade,
      des_facade: req.body.des_facade,
      location: req.body.location,
      address: req.body.address,
      negotiable_price: req.body.negotiable_price,
      fixed_price: req.body.fixed_price,
      rose: req.body.rose,
      describe: req.body.describe,
      select_master: req.body.select_master,
      name_middleman: req.body.name_middleman,
      number_middleman: req.body.number_middleman,
      adress_middleman: req.body.adress_middleman,
      rose_middleman: req.body.rose_middleman,
      describe_middleman: req.body.describe_middleman,
      image: req.body.image,
      image_book: req.body.image_book,
      image_draw: req.body.image_draw,
      date_time: req.body.date_time,
      status: req.body.status,
      user: resultSub,
    };

    product.create(products, function (err, result) {
      if (err) {
        console.log(err, "err");
        throw err;
      } else {
        res.send(result);
      }
    });
  });

  app.put("/product/:id", function (req, res) {
    if (!req.params.id) {
      return res.status(500).send("Id not found");
    } else {
      product.update(
        {
          _id: req.params.id,
        },
        {
          name_owner: req.body.name_owner,
          number_owner: req.body.number_owner,
          name: req.body.name,
          type_product: req.body.type_product,
          area: req.body.area,
          widthHeight: req.body.widthHeight,
          num_facade: req.body.num_facade,
          des_facade: req.body.des_facade,
          location: req.body.location,
          address: req.body.address,
          negotiable_price: req.body.negotiable_price,
          fixed_price: req.body.fixed_price,
          rose: req.body.rose,
          describe: req.body.describe,
          select_master: req.body.select_master,
          name_middleman: req.body.name_middleman,
          number_middleman: req.body.number_middleman,
          adress_middleman: req.body.adress_middleman,
          rose_middleman: req.body.rose_middleman,
          describe_middleman: req.body.describe_middleman,
          image: req.body.image,
          image_book: req.body.image_book,
          image_draw: req.body.image_draw,
          date_time: req.body.date_time,
          status: req.body.status,
          
        },
        function (err, result) {
          if (err) {
            return res.status(500).json(err);
          } else {
            getProducts(res);
          }
        }
      );
    }
  });

  app.delete("/product/:id", function (req, res) {
    if (!req.params.id) {
      return res.status(500).send("Id not found !");
    } else {
      product.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        } else {
          getProducts(res);
        }
      });
    }
  });

  app.get("/buyer", function (req, res) {
    // let page = parseInt(req.body.currentPage);
    // var perPage = 6;
    // var start = (page - 1) * perPage;
    // var end = page * perPage;

    product.find({ status: "    " }, function (err, result) {
      if (err) {
        throw err;
      } else {
        // var resultPage = result.slice(start, end);
        res.json({
          data: result,
          meta: {
            // totalPage: Math.round(result.length / 6),
          },
        });
      }
    });
  });
  app.post("/products/seller", function (req, res) {
    let page = parseInt(req.body.currentPage);
    var perPage = 6;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    product.find({ _id: "60cd064420a7460fbc7ae6dc" }, function (err, result) {
      if (err) {
        throw err;
      } else {
        var resultPage = result.slice(start, end);
        res.json({
          data: resultPage,
          meta: {
            totalPage: Math.round(result.length / 6),
          },
        });

        // getProductFilter(result, start, end);
      }
    });
  });
};
