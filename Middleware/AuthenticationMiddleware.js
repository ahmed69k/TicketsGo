const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

module.exports = function authenticationMiddleware(req, res, next) {
  console.log("🔐 Inside auth middleware");

  let token;

  // 1. Try to get token from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log("✅ Token found in cookies");
  }

  // 2. If not in cookies, check Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
    console.log("✅ Token found in Authorization header");
  }

  // 3. If no token found, return error
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 4. Verify token
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded.user;
    next();
  });
};
