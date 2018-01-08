// db/connection.js
//STEP 1: model file -- befine DB connection

// In order to reference Mongoose, we need to require its corresponding node module
// and save it in a variable we can reference later.

const mongoose = require("mongoose");

//We also need to link Mongoose to our mehn-lab Mongo database.

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL);
} else {
  mongoose.connect("mongodb://localhost/can-do-kanban", {
    useMongoClient: true
  });
}

mongoose.Promise = Promise;

// when this file (connection.js) is required in other files, it will evaluate to
// this connected version of mongoose.

module.exports = mongoose;
