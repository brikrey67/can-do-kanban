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

// ProductContact.findOneAndUpdate({'productRoles._id':req.params.product_role_id},
// {
//   $pull: { productRoles: {_id:req.params.product_role_id }}
// },{new:true},
// function(err, productcontact) {
//   if(err)
//     res.send(err);res.json({message: 'Role successfully deleted.'});
// })

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
  taskGetOne: taskGetOne,
  taskDelete: taskDelete
};
