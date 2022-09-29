"use strict";

/*
 * nodejs-express-mongoose-demo
 * Copyright(c) 2022 Jinoh Kim <jokim.dev@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require("dotenv").config();

const fs = require("fs");
const join = require("path").join;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");
const http = require("http");
const https = require("https");

const models = join(__dirname, "app/models");
const keys = join(__dirname, "keys");
const port = process.env.PORT || 3000;
const app = express();

/**
 * Expose
 */

module.exports = app;

// Bootstrap models
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

// Bootstrap routes
require("./config/passport")(passport);
require("./config/express")(app, passport);
require("./config/routes")(app, passport);

connect();

function listen() {
  if (app.get("env") === "test") return;
  console.log(keys);
  // app.listen(port);
  http.createServer(app).listen(port);
  https
    .createServer(
      {
        key: fs.readFileSync(keys + "/install-key.pem", "utf-8"),
        cert: fs.readFileSync(keys + "/install.pem", "utf-8"),
      },
      app
    )
    .listen(3001);
  console.log("Express app started on port " + port);
}

function connect() {
  mongoose.connection.on("error", console.log).on("disconnected", connect).once("open", listen);
  return mongoose.connect(config.db, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
