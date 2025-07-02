const UserModel = require("../models/UserModel.js");
const { setUser } = require('../services/auth.js');
const { v4: uuidv4 } = require("uuid");

async function handleUserSignup(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const user = await UserModel.create({ name, email, password, role });

    const token = setUser(user._id, { email: user.email, role: user.role });

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleUserLogin(req, res, next) {
  try {
    const { email, password, role } = req.body;

    const user = await UserModel.findOne({ email, role });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    const token = setUser(user._id, { email: user.email, role: user.role });

    // Set token directly in cookie
    res.cookie("uid", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  handleUserSignup,
  handleUserLogin,
};
