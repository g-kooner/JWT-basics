// access the enironemnt variables
require("dotenv").config();
// https://medium.com/@utkuu/error-handling-in-express-js-and-express-async-errors-package-639c91ba3aa2
// dont have to use try catch block in async funcs to catch error it auto calls next for middleware
require("express-async-errors");

const express = require("express");
const app = express();

// router
const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// Use main router to setup routes for api
app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
