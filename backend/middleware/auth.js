const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  
  if (!authHeader) {
    return res.status(401).json("No token");
  }

  try {
   
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains user id
    next();

  } catch (err) {
    res.status(401).json("Invalid token");
  }
};