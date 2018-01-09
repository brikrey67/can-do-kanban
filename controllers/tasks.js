const express = require("express");
var passport = require("passport");

const { Bucket, Task } = require("../models/schema");
//assign schema (defined in schema.js) to variabl

function taskGetOne(request, response) {
  let tId = request.params._id;
  Task.findOne({ _id: tId })
    .then(taskData => {
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
