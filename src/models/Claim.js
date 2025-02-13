const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  policy_id: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
  claim_amount: { type: Number, required: true },
  claim_date: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Claim", claimSchema);