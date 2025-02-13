// const Policy = require("../models/Policy");
// // controllers/PolicyController.js
// const mongoose = require("mongoose"); // Missing at the top
// const Payment = require("../models/Payment"); // Missing import



// const predefinedPolicies = [
//   {
//     type: "Health",
//     coverage_amount: 50000,
//     premium_amount: 200,
//     description: "Comprehensive health coverage"
//   },
//   {
//     type: "Auto",
//     coverage_amount: 30000,
//     premium_amount: 150,
//     description: "Vehicle accident protection"
//   }
// ];


// class PolicyController {

//   // Get predefined policy templates
//   static async getAvailablePolicies(req, res) {
//     try {
//       res.status(200).json(predefinedPolicies);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   // Create policy from template
//   static async createPolicy(req, res) {
//     const session = await mongoose.startSession();
//     session.startTransaction();
    
//     try {
//       const { policyType } = req.body;
//       const template = predefinedPolicies.find(p => p.type === policyType);
      
//       if (!template) {
//         throw new Error("Invalid policy type");
//       }

//       const policy = new Policy({
//         policyholder_id: req.user.id,
//         start_date: new Date(),
//         end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year later
//         ...template
//       });

//       await policy.save({ session });

//       // Create initial premium payment
//       const payment = new Payment({
//         policyholder_id: req.user.id,
//         policy_id: policy._id,
//         amount: template.premium_amount,
//         payment_type: "Premium",
//         description: `Initial premium for ${template.type} policy`
//       });

//       await payment.save({ session });
//       await session.commitTransaction();

//       res.status(201).json({ 
//         message: "Policy created successfully", 
//         policy,
//         payment
//       });
//     } catch (error) {
//       await session.abortTransaction();
//       res.status(400).json({ message: error.message });
//     } finally {
//       session.endSession();
//     }
//   }

//   // Get user's active policies
//   static async getUserPolicies(req, res) {
//     try {
//       const policies = await Policy.find({ 
//         policyholder_id: req.user.id,
//         end_date: { $gt: new Date() }
//       });
//       res.status(200).json(policies);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
// }

// module.exports = PolicyController;
const Policy = require("../models/Policy");
const Payment = require("../models/Payment");
const mongoose = require("mongoose");

const predefinedPolicies = [
  {
    type: "Health",
    coverage_amount: 50000,
    premium_amount: 200,
    description: "Comprehensive health coverage"
  },
  {
    type: "Auto",
    coverage_amount: 30000,
    premium_amount: 150,
    description: "Vehicle accident protection"
  }
];

class PolicyController {

  // Get predefined policy templates
  static async getAvailablePolicies(req, res) {
    try {
      res.status(200).json(predefinedPolicies);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Create policy from template
  static async createPolicy(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { policyType } = req.body;
      const template = predefinedPolicies.find(p => p.type === policyType);

      if (!template) {
        throw new Error("Invalid policy type");
      }

      // Instead of spreading the template, we explicitly set the correct fields.
      const policy = new Policy({
        policyholder_id: req.user.id,
        start_date: new Date(),
        end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year later
        policy_type: template.type,               // <-- Note: using policy_type here
        coverage_amount: template.coverage_amount,
        premium_amount: template.premium_amount,
        description: template.description
      });

      await policy.save({ session });

      // Create initial premium payment
      const payment = new Payment({
        policyholder_id: req.user.id,
        policy_id: policy._id,
        amount: template.premium_amount,
        payment_type: "Premium",
        description: `Initial premium for ${template.type} policy`
      });

      await payment.save({ session });
      await session.commitTransaction();

      res.status(201).json({ 
        message: "Policy created successfully", 
        policy,
        payment
      });
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({ message: error.message });
    } finally {
      session.endSession();
    }
  }

  // Get user's active policies
  static async getUserPolicies(req, res) {
    try {
      const policies = await Policy.find({ 
        policyholder_id: req.user.id,
        end_date: { $gt: new Date() }
      });
      res.status(200).json(policies);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PolicyController;
