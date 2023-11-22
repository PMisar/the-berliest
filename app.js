// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const bodyParser = require("body-parser");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "the-berliest";

app.locals.appTitle = `${capitalize(
  projectName
)} created by the Berliest people`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const listRoutes = require("./routes/list.routes");
app.use("/", listRoutes); // you are listening to this route

const addToList = require("./routes/add-to-list");
app.use("/", addToList);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/my-berliest", (req, res) => {
  res.render("my-berliest");
});

// app.get("/create-list", (req, res) => {
//   res.render("create-list");
// });

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
