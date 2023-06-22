var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var jobSchema = new Schema({
    title: String,
    allDay: String,
    start: String,
    end: String,
    color: String,
});

var jobs = mongoose.model("jobSchema", jobSchema);

module.exports = jobs;
