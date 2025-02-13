// const express = require("express");
// const Policyholder = require("../models/Policyholder");
// const { generateToken, comparePassword } = require("../utils/auth");

// const router = express.Router();

// // Login route
// router.get("/", (req, res) => {
//   res.json({ message: "Auth route is working!" });
// });
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const policyholder = await Policyholder.findOne({ email });
//     if (!policyholder) {
//       return res.status(404).json({ message: "Policyholder not found" });
//     }

//     const isPasswordValid = await comparePassword(password, policyholder.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = generateToken({ id: policyholder._id, email: policyholder.email, role: policyholder.role });
//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Policyholder = require("../models/Policyholder");
const { generateToken, comparePassword } = require("../utils/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const policyholder = await Policyholder.findOne({ email });
    if (!policyholder) {
      return res.status(404).json({ message: "Policyholder not found" });
    }
    const isPasswordValid = await comparePassword(password, policyholder.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate token with role from the policyholder document
    const token = generateToken({ id: policyholder._id, email: policyholder.email, role: policyholder.role });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
