const express = require("express");
var passport = require("passport");

const Bucket = require("../models/schema");
// assign schema (defined in schema.js) to variable

function bucketGetAll(request, response) {
  Bucket.find({})
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
  let title = request.params.title;
  Bucket.findOne({ title: title })
    .then(bucketData => {
      response.render("bucket-show", { bucket: bucketData });
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketPost(request, response) {
  let title = request.params.title;
  Bucket.create(request.body.bucket)
    .then(bucket => {
      response.redirect(`/bucket`);
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketDelete(request, response) {
  Bucket.findOneAndRemove({ title: request.params.title })
    .then(() => {
      response.redirect("/bucket");
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketPut(request, response) {
  Bucket.findOneAndUpdate(
    { title: request.params.title },
    request.body.bucket,
    {
      new: true
    }
  )
    .then(bucket => {
      response.redirect(`/bucket/${bucket.title}`);
    })
    .catch(err => {
      console.log(err);
    });
}

function taskPatch(request, response) {
  // console.log(request.body);
  Bucket.findOneAndUpdate(
    { title: request.params.title },
    { $push: { addedTask: request.body.bucket.addedTask } },
    {
      new: true
    }
  )
    .then(bucket => {
      response.redirect(`/bucket/${bucket.title}`);
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
