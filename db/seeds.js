// STEP 3: model file -- initial seed of database

// Because we defined our model in schema.js and
// set its module.exports to be equal to the News model,
// we can reference it like so.
const { Bucket, Task } = require("../models/schema");
const seedData = require("./seeds.json");

// This clears out the entire candidates collection. We're not
// passing in any parameters, so Mongoose interprets this command
// as delete all documents in that collection!

// Create a collection using the JSON contained in our seed file
// Note that this is ideal for bulk insertion but skips schema
// validation. In our controller, where we will want validation,
// we will use Candidate.create().

Bucket.remove({})
  .then(() => {
    return Bucket.collection.insert(seedData);
  })
  .then(() => {
    process.exit();
  });

//to run, type:
//$ node db/seeds.js
//$ mongo
// use whenpresident
//db.candidate.find().pretty()
