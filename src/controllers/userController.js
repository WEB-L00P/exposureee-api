const userModel = require("../models/user");
const dashboardModel = require("../models/dashboard");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const signup = async (req, res) => {
  //Existing User Check
  //Hashed Password
  //User Creation
  //Token Generation

  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const dashboardResult = await dashboardModel.create({ userId: result._id });
    const token = jwt.sign({ email: result.email, id: result._id }, secretKey);

    res.status(201).json({
      user: result,
      token: token,
      dashboard: dashboardResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secretKey
    );

    res.status(201).json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
