// require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const hbs = require("hbs");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const methodOverride = require("method-override");
var session = require("express-session");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

app.use(session({ secret: "WDI-GENERAL-ASSEMBLY-EXPRESS" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./config/passport")(passport);

app.use(function(req, res, next) {
  global.currentUser = req.user;
  res.locals.currentUser = req.user;
  next();
});

const routes = require("./config/routes");
app.use(routes);

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
