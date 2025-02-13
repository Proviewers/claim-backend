const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyholder_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Policyholder", 
    required: true 
  },
  policy_type: { type: String, required: true },
  coverage_amount: { type: Number, required: true },
  premium_amount: { type: Number, required: true }, // New field
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  description: String
});

module.exports = mongoose.model("Policy", policySchema);