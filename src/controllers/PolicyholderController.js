// // const Policyholder = require("../models/Policyholder");

// // class PolicyholderController {
// //   static async createPolicyholder(req, res) {
// //     const { name, email, password, contact_info, date_of_birth } = req.body;
// //     try {
// //       const policyholder = new Policyholder({ name, email, password, contact_info, date_of_birth });
// //       await policyholder.save();
// //       res.status(201).json({ message: "Policyholder created successfully", policyholder });
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   }

// //   static async getPolicyholder(req, res) {
// //     const { id } = req.params;
// //     try {
// //       const policyholder = await Policyholder.findById(id);
// //       if (!policyholder) {
// //         return res.status(404).json({ message: "Policyholder not found" });
// //       }
// //       res.status(200).json(policyholder);
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   }
// // }

// // module.exports = PolicyholderController;


// const Policyholder = require("../models/Policyholder");
// // controllers/PolicyController.js
// const mongoose = require("mongoose"); // Missing at the top
// const Payment = require("../models/Payment"); // Missing import
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

// class PolicyholderController {
//   static async createPolicyholder(req, res) {
//     const { name, email, password, contact_info, date_of_birth } = req.body;
//     try {
//       // Business logic: Create a new policyholder
//       const policyholder = new Policyholder({ name, email, password, contact_info, date_of_birth });
//       await policyholder.save(); // Save to the database
//       res.status(201).json({ message: "Policyholder created successfully", policyholder });
//     } catch (error) {
//       // Handle errors (e.g., validation errors, duplicate email)
//       res.status(400).json({ message: error.message });
//     }
//   }

//   static async getPolicyholder(req, res) {
//     const { id } = req.params;
//     try {
//       // Business logic: Fetch a policyholder by ID
//       const policyholder = await Policyholder.findById(id);
//       if (!policyholder) {
//         return res.status(404).json({ message: "Policyholder not found" });
//       }
//       res.status(200).json(policyholder);
//     } catch (error) {
//       // Handle errors (e.g., invalid ID format)
//       res.status(400).json({ message: error.message });
//     }
//   }
// }

// module.exports = PolicyholderController;
const Policyholder = require("../models/Policyholder");

class PolicyholderController {
  static async createPolicyholder(req, res) {
    // Log the request body to verify the role is coming in
    console.log("Received createPolicyholder request body:", req.body);
    const { name, email, password, contact_info, date_of_birth, role } = req.body;
    try {
      // Use the provided role (converted to lowercase) if available; otherwise default to 'user'
      const newRole = role && role.trim() !== "" ? role.toLowerCase() : 'user';
      const policyholder = new Policyholder({ 
        name, 
        email, 
        password, 
        contact_info, 
        date_of_birth, 
        role: newRole 
      });
      await policyholder.save();
      res.status(201).json({ message: "Policyholder created successfully", policyholder });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getPolicyholder(req, res) {
    const { id } = req.params;
    try {
      const policyholder = await Policyholder.findById(id);
      if (!policyholder) {
        return res.status(404).json({ message: "Policyholder not found" });
      }
      res.status(200).json(policyholder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PolicyholderController;
