const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
