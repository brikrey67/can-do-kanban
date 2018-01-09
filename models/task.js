const mongoose = require("../db/connection");

const TaskSchema = new mongoose.Schema({
  tOrder: Number,
  tTitle: String,
  tDesc: String,
  importance: String,
  points: Number,
  dueDate: String,
  status: String
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
