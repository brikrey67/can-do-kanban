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
      response.render("task-show", { task: taskData, bucket: bucketData });
    })
    .catch(err => {
      console.log(err);
    });
}

function taskDelete(request, response) {
  Bucket.findOneAndUpdate(
    { "addedTask._id": request.params._id },
    { $pull: { addedTask: { _id: request.params._id } } },
    { new: true }
  )
    .then(bucket => {
      response.redirect(`/bucket/${bucket.bTitle}`);
    })
    .catch(err => {
      console.log(err);
    });
}

// function taskOnePut(request, response) {
//   let tId = request.params._id;
//   console.log("TID: " + tId);
//   let bucketTitle = request.params.bTitle;
//   console.log("BTITLE: " + bucketTitle);
//   Bucket.findOneAndUpdate(
//     { "addedTask._id": request.params._id },
//     { $push: { addedTask: request.body.bucket.addedTask } },
//     { new: true }
//   ).then(removeTask => {
//     Bucket.findOneAndUpdate(
//       { "addedTask._id": tId },
//       { $pull: { addedTask: { _id: tId } } },
//       { new: true }
//     )
//       .then(bucket => {
//         response.redirect(`/bucket/${bucketTitle}`);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
// }

function taskOnePut(request, response) {
  bucketTitle = request.params.bTitle;
  console.log("BTITLE: " + bucketTitle);
  tId = request.params._id;
  console.log("TID: " + tId);
  Bucket.findOne(
    {
      bTitle: bucketTitle
    },
    function(err, doc) {
      var subDoc = doc.addedTask.id(request.params._id);
      subDoc.set(request.body.bucket.addedTask);
      console.log("DOC: " + doc);
      console.log("SUBDOC: " + subDoc);
      doc
        .save()
        .then(doc => {
          response.redirect(`/bucket/${bucketTitle}`);
        })
        .catch(function(err) {
          res.status(500).send(err);
        });
    }
  );
}

module.exports = {
  taskGetOne: taskGetOne,
  taskDelete: taskDelete,
  taskOnePut: taskOnePut
};
