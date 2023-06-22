var users = require("../models/userModel");

function getUsers(res) {
  users.find(function (err, resultUser) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(resultUser);
    }
  });
}

module.exports = function (app) {
  //Goi get tat ca du lieu cua user
  app.get("/api/users", function (req, res) {
    getUsers(res);
  });

  //Get 1 user voi param = id

  app.get("/api/users/:id", function (req, res) {
    users.findById({ _id: req.params.id }, function (err, resultUser) {
      if (err) {
        throw err;
      } else {
        res.json(resultUser);
      }
    });
  });

  //create 1 user
  app.post("/api/users", function (req, res) {
    var user = {
      username: req.body.username,
      password: req.body.password,
    };

    users.create(user, function (err, resultUser) {
      if (err) {
        throw err;
      } else {
        getUsers(res);
      }
    });
  });
  //edit 1 user

  app.put("/api/users", function (req, res) {
    if (!req.body.id) {
      return res.status(500).send("Id is required");
    } else {
      users.update(
        {
          _id: req.body.id,
        },
        {
          username: req.body.username,
          password: req.body.password,
        },
        function (err, resultUser) {
          if (err) {
            return res.status(500).json(err);
          } else {
            getUsers(res);
          }
        }
      );
    }
  });

  //delete user
  app.delete("/api/users/:id", function (req, res) {
    if (!req.body.id) {
      return res.status(500).send("Id is required");
    } else {
      users.remove(
        {
          _id: req.params.id,
        },
        function (err, resultUser) {
          if (err) {
            return res.status(500).json(err);
          } else {
            getUsers(res);
          }
        }
      );
    }
  });
};
