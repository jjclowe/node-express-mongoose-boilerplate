const createError = require("http-errors");
const express = require("express");
const expressValidator = require("express-validator");
const app = express();
const port = 5000;

const testApiRouter = require("./routes/test-api");

app.use(expressValidator());
app.use(express.json());
app.use("/api", testApiRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(`Error: ${err.message}`);
});

app.listen(port, () => `Server running on port ${port}`);
