var jobs = require("../models/jobs");

function getJobs(res) {
  jobs.find(function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
}

module.exports = function (app) {
  app.get("/get/jobs", function (req, res) {
    let jobdatas = [
        {
            title: "Gặp khách hàng số 1",
            allDay: "true",
            start: "Sun Jun 20 2021 11:30:00 GMT-0700 (Pacific Daylight Time)",
            end: "Sun Jun 20 2021 10:30:00 GMT-0700 (Pacific Daylight Time)",
            color: "green",
        },
        {
            title: "Gặp khách hàng số 1",
            allDay: "true",
            start: "Sun Jun 20 2021 11:30:00 GMT-0700 (Pacific Daylight Time)",
            end: "Sun Jun 20 2021 10:30:00 GMT-0700 (Pacific Daylight Time)",
            color: "green",
        },
        {
            title: "Gặp khách hàng số 1",
            allDay: "true",
            start: "Sun Jun 20 2021 11:30:00 GMT-0700 (Pacific Daylight Time)",
            end: "Sun Jun 20 2021 10:30:00 GMT-0700 (Pacific Daylight Time)",
            color: "green",
        },
        {
            title: "Gặp khách hàng số 1",
            allDay: "true",
            start: "Sun Jun 20 2021 11:30:00 GMT-0700 (Pacific Daylight Time)",
            end: "Sun Jun 20 2021 10:30:00 GMT-0700 (Pacific Daylight Time)",
            color: "green",
        },
        {
            title: "Gặp khách hàng số 1",
            allDay: "true",
            start: "Sun Jun 20 2021 11:30:00 GMT-0700 (Pacific Daylight Time)",
            end: "Sun Jun 20 2021 10:30:00 GMT-0700 (Pacific Daylight Time)",
            color: "green",
        },
        {
            title: "Gặp khách hàng số 1",
            allDay: "true",
            start: "Sun Jun 20 2021 11:30:00 GMT-0700 (Pacific Daylight Time)",
            end: "Sun Jun 20 2021 10:30:00 GMT-0700 (Pacific Daylight Time)",
            color: "green",
        },
    ];
    jobs.create(jobdatas, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
  });

  app.get("/jobs", function (req, res) {
    getJobs(res);
  });

  app.get("/jobs/:id", function (req, res) {
    jobs.findById({ _id: req.params.id }, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.json(result);
      }
    });
  });

  app.post("/jobs", function (req, res) {
    let jobsData = {
        title: req.body.title,
        allDay: req.body.allDay,
        start: req.body.start,
        end: req.body.end,
        color: req.body.color, 
    };

    jobs.create(jobsData, function (err, result) {
      if (err) {
        throw err;
      } else {
       res.send(result)
      }
    });
  });

  app.put("/jobs/:id", function (req, res) {
    if (!req.params.id) {
      return res.status(500).send("Id not found");
    } else {
      jobs.update(
        {
          _id: req.params.id,
        },
        {        
            title:  req.body.title,
            allDay: req.body.allDay,
            start: req.body.start,
            end: req.body.end,
            color: req.body.color,
         },
        function (err, result) {
          if (err) {
            return res.status(500).json(err);
          } else {
            getJobs(res);
          }
        }
      );
    }
  });

  app.delete("/jobs/:id", function (req, res) {
    if (!req.params.id) {
      return res.status(500).send("Id not found !");
    } else {
      jobs.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        } else {
            getJobs(res);
        }
      });
    }
  });
};
