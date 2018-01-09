const express = require("express");
var passport = require("passport");

const { Bucket, Task } = require("../models/schema");
//assign schema (defined in schema.js) to variabl

function taskGetOne(request, response) {
  //   console.log("PARAMS ID: " + request.params._id);
  let tId = request.params._id;
  let bTitle = request.params.bTitle;
  //   console.log("TASK ID: " + tId, "BUCKET TITLE: " + bTitle);
  Bucket.findOne({ bTitle: bTitle })
    .then(bucketData => {
      //   console.log("BUCKET DATA: " + bucketData);
      //   console.log("ADDED TASK DATA: " + bucketData.addedTask);
      //   taskData = bucketData.addedTask;
      //   console.log("TASKDATA: " + taskData);
      taskData = bucketData.addedTask.find(task => task._id.toString() == tId);
      //   console.log("TASK DATA: " + taskData);
      response.render("task-show", { task: taskData });
    })
    .catch(err => {
      console.log(err);
    });
}

// function taskDelete(request, response) {
//   Task.findOneAndRemove({ _id: request.params._id })
//     .then(() => {
//       response.redirect("/bucket/:bTitle");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// function bucketPut(request, response) {
//   Bucket.findOneAndUpdate(
//     { bTitle: request.params.bTitle },
//     request.body.bucket,
//     {
//       new: true
//     }
//   )
//     .then(bucket => {
//       response.redirect(`/bucket/${bucket.bTitle}`);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

module.exports = {
  taskGetOne: taskGetOne
};
