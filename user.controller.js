const User = require("./user.model.js");

exports.signup = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create(req.body);
    user.password = undefined;
    // await user.save({ validateBeforeSave: false });

    res.status(201).json({
      message: "Success",
      user,
    });
    // res.status(201).send("Success");
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      message: "failed",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (!userExists || userExists.password != password) {
    return res.status(401).json({
      message: "email or password is incorrect.",
    });
  }
  userExists.password = undefined;

  res.status(200).json({
    message: "login successful",
    user: userExists,
  });
};
