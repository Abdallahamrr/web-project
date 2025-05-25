const mongoose = require("mongoose");
const validator = require("validator");

const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.com"];
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return (
            validator.isAlpha(value, "en-US") || validator.isAlpha(value, "ar")
          );
        },
        message: "first name can only contain letters",
      },
    },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return (
            validator.isAlpha(value, "en-US") || validator.isAlpha(value, "ar")
          );
        },
        message: "first name can only contain letters",
      },
    },

    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          return value <= eighteenYearsAgo;
        },
        message: "User must be at least 18 years old.",
      },
    },

    email: {
      type: String,
      required: [true, "email is required"],
      validate: {
        validator: function (value) {
          if (!validator.isEmail(value)) {
            return false;
          }
          return allowedDomains.includes(value.split("@")[1].toLowerCase());
        },
      },
      message: "enter a valid email",
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
