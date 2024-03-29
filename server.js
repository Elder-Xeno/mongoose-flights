var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var port = process.env.PORT || 4000;

require("dotenv").config();
require("./config/database");

const indexRouter = require("./routes/index");
const flightsRouter = require("./routes/flights");
const ticketsRouter = require("./routes/tickets");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/flights", flightsRouter);
app.use("/tickets", ticketsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.error(err);
  res.status(err.status || 500);
  res.render("error", { error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
