const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
const {isAdmin} = require("../middlewares/authMiddleware")
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.register = async (req, res) => {
    const {username, email, password, role} = req.body
  try {
    if (!username || !email || !password) {
      return res.status(402).json({ message: "All fields are mandatory." });
    }

    const existingUser = await User.findOne({
      $or: [{ username: username }, { email, email }],
    });
    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === email
            ? "Email  already exists"
            : "Username already exists",
      });
    }
    if (password.length < 4) {
      return res
        .status(401)
        .json({ message: "Minimum password length required is 4" });
    }
    if (username.length < 4) {
      return res
        .status(401)
        .json({ message: "Minimum username length required is 4" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(401)
        .json({ message: "Email format is not correct. Try right one." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      role,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("User created successfully. Saved user is: ", savedUser);
    res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    console.log("Error while registration: ", err);
    res.status(404).json({ message: "Failed to register. Try again!" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Gmail not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password does not match" });
    }
    const token = createToken(user);
    res.status(200).json({ message: "Logged in successfully", token, user });
  } catch (err) {
    console.log("Error while logging in: ", err);
    res.status(401).json({ message: "Cannot login. Try again" });
  }
};
