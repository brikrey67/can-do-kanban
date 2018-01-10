// db/schema.js
// STEP 2: model file -- define DB schema

const mongoose = require("../db/connection");
// const Task = require("./task")

// We use Mongoose's schema method to define a blueprint for our
//Candidate model (i.e., what attributes it will have and what data
//types they will be).

//CandidateSchema is object managed by mongo

const TaskSchema = new mongoose.Schema({
  tTitle: String,
  tDesc: String,
  importance: String,
  points: Number,
  dueDate: String,
  status: Number
});

const Task = mongoose.model("Task", TaskSchema);

const BucketSchema = new mongoose.Schema({
  bOrder: Number,
  bTitle: String,
  bDesc: String,
  intCrit: String,
  exCrit: String,
  addedTask: [TaskSchema]
});

// We attach our schema to our model by passing in two
// arguments to this method: (1) the desired name of our model
// ("Bucket") and (2) the existing schema.

const Bucket = mongoose.model("Bucket", BucketSchema);

// When this file (schema.js) is required in other files, it will
// evaluate to the Candidate model defined here through which we will
// be able to query the candidates collection in our Mongo database.

// module.exports = Bucket;

module.exports = {
  Bucket,
  Task
};
