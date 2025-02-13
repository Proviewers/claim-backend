const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
  policyholder_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Policyholder", 
    required: true 
  },
  policy_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Policy", 
    required: true  // New field
  },
  amount: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  payment_type: { type: String, enum: ["Premium", "Payout"], required: true },
  description: String,  // Add description field
  processed_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Payment", paymentSchema);