**Project: Can-Do-Kanban**

**Description** Simple kanban tool; MVP will be application that organizes tasks within buckets.

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

**Envisioned Pages and Workflow (Happy Path)**

(1) User Registration / Authentication
| - ability to register/sign-up users
| - ability to authenticate users
| - ability to secure access to rest of application
|
(2) Buckets Index -- listing of all buckets
| - ability to create new buckets
|
(3) Buckets Detail -- listing of details about bucket selected on Buckets Index
| - ability to edit buckets
| - add tasks to buckets
| - delete/remove buckets (and constituent tasks
|  
(4) Task Detail Page -- listing of details about task selected on Buckets Detail page
| - ability to edit tasks
| - ability to delete tasks
| - ability to transfer tasks between buckets (beyond MVP)
