var express = require("express");
var router = express.Router();
// Parses information from POST
var bodyParser = require("body-parser");
// Used to manipulate POST methods
var methodOverride = require("method-override");
var passport = require("passport");
var usersController = require("../controllers/users");
var bucketController = require("../controllers/buckets");
var taskController = require("../controllers/tasks");
// var activityController = require("../controllers/activities");
var staticsController = require("../controllers/statics");

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect("/");
}

// SECURITY ROUTES ***************************
router.route("/").get(staticsController.home);

router
  .route("/signup")
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router
  .route("/login")
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout").get(usersController.getLogout);

router.route("/secret").get(authenticatedUser, usersController.secret);

// BUCKET ROUTES ******************************
router.route("/bucket").get(authenticatedUser, bucketController.bucketGetAll);
// list all bucket

router.route("/bucket").post(authenticatedUser, bucketController.bucketPost);
// add new bucket

router
  .route("/bucket/:bTitle")
  .get(authenticatedUser, bucketController.bucketGetOne);
// show selected bucket detail
router
  .route("/bucket/:bTitle")
  .delete(authenticatedUser, bucketController.bucketDelete);
// delete selected bucket

router
  .route("/bucket/:bTitle")
  .put(authenticatedUser, bucketController.bucketPut);

router
  .route("/bucket/:bTitle")
  .patch(authenticatedUser, bucketController.taskPatch);

// TASK ROUTES  *******************************

router
  .route("/bucket/:bTitle/:_id")
  .get(authenticatedUser, taskController.taskGetOne);
// show selected task detailrouter

router
  .route("/bucket/:bTitle/:_id")
  .delete(authenticatedUser, taskController.taskDelete);
// delete selected bucket

router
  .route("/bucket/:bTitle/:_id")
  .put(authenticatedUser, taskController.taskOnePut);
// delete selected bucket

router
  .route("/bucket/:bTitle/:_id")
  .patch(authenticatedUser, taskController.taskMove);
// delete selected bucket

module.exports = router;
