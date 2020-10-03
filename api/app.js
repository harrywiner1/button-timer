var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testAPIRouter = require("./routes/testAPI");
var timerRouter = require("./routes/timer");

var cors = require("cors");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/timer", timerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Change CORS Headers
//app.use(function (req, res, next) {
//  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//  // Request methods you wish to allow
//  res.setHeader(
//    "Access-Control-Allow-Methods",
//    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//  );
//
//  // Request headers you wish to allow
//  res.setHeader(
//    "Access-Control-Allow-Headers",
//    "X-Requested-With,content-type"
//  );
//
//  // Set to true if you need the website to include cookies in the requests sent
//  // to the API (e.g. in case you use sessions)
//  res.setHeader("Access-Control-Allow-Credentials", true);
//
//  // Pass to next layer of middleware
//  next();
//});

//app.use(cors({ origin: "*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-type,Accept"
  );
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;