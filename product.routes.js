const express = require("express");
const {
  addProduct,
  getProductById,
  getAllProducts,
} = require("./product.controller");
const router = express.Router();

router.post("/add-product", addProduct);
router.get("/get-product/:id", getProductById);
router.get("/get-all", getAllProducts);

module.exports = router;
