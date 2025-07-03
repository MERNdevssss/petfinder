// service/auth.js
require('dotenv').config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; 

function setUser(id, user) {
  const payload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
}

function getUser(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
}

module.exports = { setUser, getUser };
