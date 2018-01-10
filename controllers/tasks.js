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

function taskOnePatch(request, response) {
  let tId = request.params._id;
  let bucketTitle = request.params.bTitle;
  console.log(
    "tId: " + tId,
    "bucketTitle: " + bucketTitle,
    "_id: " + request.params._id
  );
  Bucket.findOneAndUpdate(
    { "addedTask._id": request.params._id },
    { $set: { addedTask: { tOrder: request.body.tOrder } } },
    { new: true }
  )
    .then(bucket => {
      response.redirect(`/bucket/${bbucketTitle}/${iId}`);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  taskGetOne: taskGetOne,
  taskDelete: taskDelete,
  taskOnePatch: taskOnePatch
};
