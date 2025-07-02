const { getUser } = require("../service/auth.js");

function restrictToLoggedInUserOnly(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  const user = getUser(token);
  if (!user) return res.status(401).json({ error: "Invalid or expired token" });

  req.user = user;
  next();
}


module.exports={
    restrictToLoggedInUserOnly
}