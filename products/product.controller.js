const Product = require("./product.model");

exports.addProduct = async (req, res) => {
  const productExists = await Product.findOne({ name: req.body.name });

  if (productExists) {
    return res.status(400).json({
      message: "product already exists",
    });
  }
  const product = await Product.create(req.body);
  res.status(201).json({
    message: "product added successfully",
    product,
  });
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(400).json({
      message: "Product does not exist",
    });
  }

  res.status(200).json({
    message: "Success",
    product,
  });
};

exports.getAllProducts = async (req, res) => {
  // define query filter
  let query = {};

  //check the request query and push it to the filter if exists
  if (req.query.name) query.name = req.query.name;

  //do pagination
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const skip = (page - 1) * limit;

  // localhost:3000/api/v1/products/get-all?name=product;
  const products = await Product.find(query).skip(skip).limit(limit);

  res.status(200).json({
    message: "success",
    products,
  });
};
