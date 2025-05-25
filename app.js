const express = require("express");
const userRoutes = require("./user/user.route");
const productRoutes = require("./products/product.routes");
const favouriteRoutes = require("./favourites/favourite.routes");
const path = require("path");
const serveStatic = require("serve-static");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(serveStatic(path.join(__dirname, "Public")));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/favourites", favouriteRoutes);

module.exports = app;
