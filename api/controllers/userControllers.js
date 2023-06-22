var users = require("../models/userModel"); // nay gion nhu tao route vay do

module.exports = function (app) {
  app.get("/users", function (req, res) {
    var setUser = [
      {
        fullname: "Trương Ngọc Vĩnh Tú",
        avatar: "...",
        username: "vinhtu125@gmail.com",
        password: "123456",
        number_phone: "0357133417", 
        address: "Ấp 1 , xã Phú Tân, huyện Định Quán, Tỉnh Đồng Nai",
        describe: "...",
        location: "11259373",
        position: "Cá nhân",
        isDone: true,
      },
      {
        fullname: "Trương Ngọc Vĩnh Tú",
        avatar: "...",
        username: "vinhtu125@gmail.com",
        password: "123456",
        number_phone: "0357133417", 
        address: "Ấp 1 , xã Phú Tân, huyện Định Quán, Tỉnh Đồng Nai",
        describe: "...",
        location: "11259373",
        position: "Cá nhân",
        isDone: true,
      },
    ];

    users.create(setUser, function (err, results) {
      if (err) {
        console.log(err, "err");
      } else {
        res.send(results);
      }
    });
  });
};
