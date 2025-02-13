// const { verifyToken } = require("../utils/auth");


// function authenticate(req, res, next) {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded; // Attach the decoded user to the request object
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token." });
//   }
// }
// // middleware/authMiddleware.js
// function checkAdmin(req, res, next) {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: "Forbidden" });
//   }
//   next();
// }

// module.exports = { authenticate, checkAdmin };

const { verifyToken } = require("../utils/auth");

function authenticate(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token." });
  }
}

function checkAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

module.exports = { authenticate, checkAdmin };
