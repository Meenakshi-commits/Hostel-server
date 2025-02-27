const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });status(401).json({ message: "Not authorized, no token" });
  }}

  try {  try {
    token = token.split(" ")[1]; // Remove 'Bearer' from the token
    console.log("Token:", token); // Debugging line const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    req.user = decoded;
    console.log("Decoded:", decoded); // Debugging linet();
    req.user = decoded;
    next();n({ message: "Invalid token" });
  } catch (error) {
    console.error("Token verification error:", error); // Debugging line
    res.status(401).json({ message: "Invalid token" });
  }st admin = (req, res, next) => {
};// ...implementation...
};
const admin = (req, res, next) => {
  // ...implementation...
};protect,
  admin,
module.exports = {
  protect,  admin,};