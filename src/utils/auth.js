// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");

// // const JWT_SECRET = process.env.JWT_SECRET;

// // // Generate a JWT token
// // function generateToken(payload) {
// //   return jwt.sign(payload, JWT_SECRET, { expiresIn: "30M" });
// // }

// // // Verify a JWT token
// // function verifyToken(token) {
// //   return jwt.verify(token, JWT_SECRET);
// // }

// // // Hash a password
// // async function hashPassword(password) {
// //   const salt = await bcrypt.genSalt(10);
// //   return bcrypt.hash(password, salt);
// // }

// // // Compare a password with its hash
// // async function comparePassword(password, hash) {
// //   return bcrypt.compare(password, hash);
// // }

// // module.exports = { generateToken, verifyToken, hashPassword, comparePassword };
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // Use a fallback secret if process.env.JWT_SECRET is not defined
// const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

// // Generate a JWT token
// function generateToken(payload) {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
// }

// // Verify a JWT token
// function verifyToken(token) {
//   return jwt.verify(token, JWT_SECRET);
// }

// // Hash a password
// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// }

// // Compare a password with its hash
// async function comparePassword(password, hash) {
//   return bcrypt.compare(password, hash);
// }

// module.exports = { generateToken, verifyToken, hashPassword, comparePassword };


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30M" });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };
