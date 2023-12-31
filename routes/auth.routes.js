const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(email);
  if (email === "" || password === "" || name === "") {
    res
      .status(400)
      .json({ message: "Provide email, password and name, please." });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please provide a valid email address." });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Passwords must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json({
        message:
          "A user with that email already exists. Please try with another email address.",
      });
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    const userToSend = createdUser._doc;
    delete userToSend.password;
    const authToken = jwt.sign(userToSend, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(201).json({ authToken: authToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      // If the user is not found, send an error response
      res.status(401).json({ message: "No user with that email." });
      return;
    }
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      // Deconstruct the user object to omit the password
      const { _id, email, name } = foundUser;

      // Create an object that will be set as the token payload
      const payload = { _id, email, name };

      // Create a JSON Web Token and sign it
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken: authToken });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
