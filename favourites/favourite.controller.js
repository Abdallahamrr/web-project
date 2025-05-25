const express = require("express");
const Favourite = require("./favourite.model");
const Product = require("./../products/product.model");
const User = require("./../user/user.model");

exports.addToFavourites = async (req, res) => {
  const userId = req.query.userId;
  const { productId } = req.body;

  const productExists = await Product.findById(productId);

  if (!productExists) {
    return res.status(400).json({
      message: "Product does not exist",
    });
  }
  const favouriteExist = await Favourite.findOne({
    user: userId,
    product: productId,
  });

  if (favouriteExist) {
    return {
      message: "item already has been added to favourites",
    };
  }

  const favourite = await Favourite.create({
    user: userId,
    product: productId,
  });

  res.status(201).json({
    message: "added to favourites",
    favourite,
  });
};

exports.getMyFavourites = async (req, res) => {
  const userId = req.query.userId;
  const userFound = await User.findById(userId);

  if (!userFound) {
    return {
      message: "user id does not exist",
    };
  }

  const myFavourites = await Favourite.find({ user: userId }).populate(
    "product"
  );
  res.status(200).json({
    message: "success",
    myFavourites,
  });
};
