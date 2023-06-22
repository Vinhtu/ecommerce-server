//la file dung de quan ly file cau hinh config.json

var configValues = require("./config");

module.exports = {
  getDBConnectionString: function () {
    return ` mongodb+srv://${configValues.username}:${configValues.password}@storeshop.vfn3q.mongodb.net/?retryWrites=true&w=majority`;
  },
};
