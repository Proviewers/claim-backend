// const Claim = require("../models/Claim");
const Claim = require("../models/Claim");
const Policy = require("../models/Policy");
const Payment = require("../models/Payment");
const mongoose = require("mongoose");




class ClaimController {

  static async updateClaim(req, res) {
    let payment = null; 
    const { id } = req.params;
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      const claim = await Claim.findById(id)
        .populate('policy_id')
        .session(session);
  
      if (!claim) throw new Error("Claim not found");
      if (claim.status === "Approved") throw new Error("Claim already approved");
  
      // Admin validation
      if (req.user.role !== 'admin') {
        throw new Error("Unauthorized: Admin access required");
      }
  
      const updates = req.body;
      Object.assign(claim, updates);
      await claim.save({ session });
  
      if (claim.status === "Approved") {
         payment = new Payment({
          policyholder_id: claim.policy_id.policyholder_id,
          policy_id: claim.policy_id._id,
          amount: claim.claim_amount,
          payment_type: "Payout",
          description: `Claim payout for ${claim._id}`
        });
  
        await payment.save({ session });
      }
  
      await session.commitTransaction();
      const response = { message: "Claim updated", claim };
      if (payment) response.payment = payment;
      
      res.status(200).json(response);
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({ message: error.message });
    } finally {
      session.endSession();
    }
  }

  static async getClaimsForPolicyholder(req, res) {
    try {
      // Get the logged-in policyholder's ID from req.user
      const policyholderId = req.user.id;
      // Find all policies that belong to this policyholder
      const policies = await Policy.find({ policyholder_id: policyholderId }).select('_id');
      const policyIds = policies.map(p => p._id);
      
      // Find claims whose policy_id is in the list of policyIds
      const claims = await Claim.find({ policy_id: { $in: policyIds } })
        .populate({
          path: "policy_id",
          populate: {
            path: "policyholder_id",
            model: "Policyholder",
          },
        });
      
      res.status(200).json(claims);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  // Existing createClaim method with validation
 // controllers/ClaimController.js
static async createClaim(req, res) {
  const { policy_id, claim_amount, claim_date, status, description } = req.body;
  try {
    const policy = await Policy.findById(policy_id);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    if (claim_amount > policy.coverage_amount) {
      return res.status(400).json({ message: "Claim amount exceeds policy coverage" });
    }

    const claim = new Claim({ policy_id, claim_amount, claim_date, status, description });
    await claim.save();
    res.status(201).json({ message: "Claim created successfully", claim });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

  static async getAllClaimsbystatus(req, res) {
    const { status } = req.query;
    try {
      // Validate status (if provided)
      if (status && !["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      
      // Build filter
      const filter = status ? { status } : {};
      
      // Fetch claims with policy and policyholder details
      const claims = await Claim.find(filter)
      .populate({
        path: "policy_id",
        populate: {
          path: "policyholder_id", // Include policyholder details via policy
          model: "Policyholder",
        },
      });
      
      res.status(200).json(claims);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
}

module.exports = ClaimController;



// New method: Update claim status/amount
// static async updateClaim(req, res) {
//   const { id } = req.params;
//   const updates = req.body;
//   try {
//     const claim = await Claim.findById(id);
//     if (!claim) {
//       return res.status(404).json({ message: "Claim not found" });
//     }

//     // Validate claim_amount ≤ policy coverage (if amount is updated)
//     if (updates.claim_amount) {
//       const policy = await Policy.findById(claim.policy_id);
//       if (updates.claim_amount > policy.coverage_amount) {
//         return res.status(400).json({ message: "Claim amount exceeds policy coverage" });
//       }
//     }

    // Update claim (e.g., status or amount)
//     Object.assign(claim, updates);
//     await claim.save();
//     res.status(200).json({ message: "Claim updated successfully", claim });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }
// static async getAllClaims(req, res) {
//   try {
//     const claims = await Claim.find().populate("policy_id"); // Include policy details
//     res.status(200).json(claims);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }