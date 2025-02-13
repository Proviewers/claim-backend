// const mongoose = require("mongoose");

// const policyholderSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   contact_info: { type: String, required: true },
//   date_of_birth: { type: Date, required: true },
// });

// module.exports = mongoose.model("Policyholder", policyholderSchema);


const mongoose = require("mongoose");
const { hashPassword } = require("../utils/auth");

const policyholderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact_info: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
});

// Hash password before saving
policyholderSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

module.exports = mongoose.model("Policyholder", policyholderSchema);
