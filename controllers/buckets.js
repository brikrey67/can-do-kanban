const express = require("express");
var passport = require("passport");

const { Bucket } = require("../models/schema");
// assign schema (defined in schema.js) to variable

function bucketGetAll(request, response) {
  Bucket.find({})
    .sort("bOrder")
    .then(bucketData => {
      response.render("bucket-index", {
        bucket: bucketData
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketGetOne(request, response) {
  let bTitle = request.params.bTitle;
  Bucket.findOne({ bTitle: bTitle })
    .then(bucketData => {
      response.render("bucket-show", { bucket: bucketData });
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketPost(request, response) {
  // let bTitle = request.params.bTitle;
  Bucket.create(request.body.bucket)
    .then(bucket => {
      response.redirect(`/bucket`);
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketDelete(request, response) {
  Bucket.findOneAndRemove({ bTitle: request.params.bTitle })
    .then(() => {
      response.redirect("/bucket");
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketPut(request, response) {
  Bucket.findOneAndUpdate(
    { bTitle: request.params.bTitle },
    request.body.bucket,
    {
      new: true
    }
  )
    .then(bucket => {
      response.redirect(`/bucket/${bucket.bTitle}`);
    })
    .catch(err => {
      console.log(err);
    });
}

function taskPatch(request, response) {
  // console.log(request.body);
  Bucket.findOneAndUpdate(
    { bTitle: request.params.bTitle },
    { $push: { addedTask: request.body.bucket.addedTask } },
    {
      new: true
    }
  )
    .then(bucket => {
      response.redirect(`/bucket/${bucket.bTitle}`);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  bucketGetAll: bucketGetAll,
  bucketGetOne: bucketGetOne,
  bucketPost: bucketPost,
  bucketDelete: bucketDelete,
  bucketPut: bucketPut,
  taskPatch: taskPatch
};
