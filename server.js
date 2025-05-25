const express = require("express");
const mongoose = require("mongoose");
const app = require("./app.js");

const DB =
  "mongodb+srv://Abdullah:K3o9n5o4@database.cz1qfrk.mongodb.net/WebProject";

mongoose.connect(DB, {}).then(() => {
  console.log("Database connected Successfully");
});
const port = 3000;

app.listen(port, () => {
  console.log(`app is now running on port ${port}`);
});
