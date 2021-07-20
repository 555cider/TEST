const express = require('express');
const path = require('path');

const indexRouter = require("./routes/index.js");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", indexRouter);
app.use("/simulate", indexRouter);

module.exports = app;
