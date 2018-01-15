**Project: Can-Do-Kanban**

**Developer:** Brian Reynolds

**Description** Simple kanban tool that allows user to CRUD buckets and metadata, CRUD tasks and metadata, and move tasks betwen buckets.

**General Assembly WDI 20 Project 2 -- can-do-kanban**, a simple kanban application

**Features include:**

* User Authentication
* CRUD buckets
* CRUD tasks
* Organize tasks within buckets

**List of Entities Managed**

Two models:

const TaskSchema = new mongoose.Schema({
tTitle: String,
tDesc: String,
importance: String,
points: Number,
dueDate: String,
status: Number
});

const BucketSchema = new mongoose.Schema({
bOrder: Number,
bTitle: String,
bDesc: String,
intCrit: String,
exCrit: String,
addedTask: [TaskSchema]
});

**List of Technologies Used**

Node, Express, Mongo, Mongoose, Handlebars, Bootstrap, CSS, HTML

**Installation Instructions / Getting Started**

No setup required. To use, navigate to application [here](https://can-do-kanban.herokuapp.com/)

**Contribution Guidelines**

Contributions welcome. Project can be found in the this [repo](https://github.com/brikrey67/can-do-kanban)
