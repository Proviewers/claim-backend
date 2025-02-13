// // // // const Payment = require("../models/Payment");
// // // // const Policyholder = require("../models/Policyholder");
// // // // const Policy = require("../models/Policy");


// // // // class PaymentController {
// // // // //   static async createPayment(req, res) {
// // // // //     const { policyholder_id, policy_id, amount, payment_type } = req.body;
// // // // //     try {
// // // // //       // Validate policyholder and policy exist
// // // // //       const policyholder = await Policyholder.findById(policyholder_id);
// // // // //       const policy = await Policy.findById(policy_id);
// // // // //       if (!policyholder || !policy) {
// // // // //         return res.status(404).json({ message: "Policyholder or Policy not found" });
// // // // //       }
      
// // // // //       const payment = new Payment({ policyholder_id, policy_id, amount, payment_type });
// // // // //       await payment.save();
// // // // //       res.status(201).json({ message: "Payment created successfully", payment });
// // // // //     } catch (error) {
// // // // //       res.status(400).json({ message: error.message });
// // // // //     }
// // // // //   }
// // // //   // controllers/PaymentController.js
// // // // // static async createPayment(req, res) {
// // // // //   const { policy_id, amount, payment_type } = req.body;
// // // // //   try {
// // // // //     // Get policyholder_id from authenticated user
// // // // //     const policyholder_id = req.user.id;
    
// // // // //     const payment = new Payment({ policyholder_id, policy_id, amount, payment_type });
// // // // //     await payment.save();
// // // // //     res.status(201).json({ message: "Payment created successfully", payment });
// // // // //   } catch (error) {
// // // // //     res.status(400).json({ message: error.message });
// // // // //   }
// // // // // }

// // // // // controllers/PaymentController.js
// // // // static async createPayment(req, res) {
// // // //   const { policy_id, amount, payment_type } = req.body;
// // // //   try {
// // // //     const payment = new Payment({
// // // //       policyholder_id: req.user.id, // Get from authenticated user
// // // //       policy_id,
// // // //       amount,
// // // //       payment_type
// // // //     });
// // // //     await payment.save();
// // // //     res.status(201).json(payment);
// // // //   } catch (error) {
// // // //     res.status(400).json({ message: error.message });
// // // //   }
// // // // }

// // // //   static async getPaymentsByPolicyholder(req, res) {
// // // //     const { policyholder_id } = req.query; // From query params
// // // //     try {
// // // //       const payments = await Payment.find({ policyholder_id }).populate("policy_id");
// // // //       res.status(200).json(payments);
// // // //     } catch (error) {
// // // //       res.status(400).json({ message: error.message });
// // // //     }
// // // //   }
  
// // // //   static async getPaymentsByPolicyholderAndPolicy(req, res) {
// // // //     const { policyholder_id, policy_id } = req.query; // From query params
// // // //     try {
// // // //       const payments = await Payment.find({ policyholder_id, policy_id });
// // // //       res.status(200).json(payments);
// // // //     } catch (error) {
// // // //       res.status(400).json({ message: error.message });
// // // //     }
// // // //   }
// // // //   static async getPayment(req, res) {
// // // //     const { id } = req.params;
// // // //     try {
// // // //       const payment = await Payment.findById(id);
// // // //       if (!payment) {
// // // //         return res.status(404).json({ message: "Payment not found" });
// // // //       }
// // // //       res.status(200).json(payment);
// // // //     } catch (error) {
// // // //       res.status(400).json({ message: error.message });
// // // //     }
// // // //   }

// // // //   static async getAllPayments(req, res) {
// // // //     try {
// // // //       const payments = await Payment.find().populate("policyholder_id policy_id");
// // // //       res.status(200).json(payments);
// // // //     } catch (error) {
// // // //       res.status(400).json({ message: error.message });
// // // //     }
// // // //   }
  

  
// // // // }

// // // // module.exports = PaymentController;
// // // // const mongoose = require("mongoose");
// // // const Payment = require("../models/Payment");
// // // const Policyholder = require("../models/Policyholder");
// // // const Policy = require("../models/Policy");

// // // class PaymentController {
// // //   // Create a payment (using authenticated user's id)
// // //   static async createPayment(req, res) {
// // //     const { policy_id, amount, payment_type } = req.body;
// // //     try {
// // //       const payment = new Payment({
// // //         policyholder_id: req.user.id,
// // //         policy_id,
// // //         amount,
// // //         payment_type
// // //       });
// // //       await payment.save();
// // //       res.status(201).json(payment);
// // //     } catch (error) {
// // //       res.status(400).json({ message: error.message });
// // //     }
// // //   }

// // //   // Get payments by policyholder (if needed)
// // //   static async getPaymentsByPolicyholder(req, res) {
// // //     const { policyholder_id } = req.query;
// // //     try {
// // //       const payments = await Payment.find({ policyholder_id }).populate("policy_id");
// // //       res.status(200).json(payments);
// // //     } catch (error) {
// // //       res.status(400).json({ message: error.message });
// // //     }
// // //   }
  
// // //   // Get payments filtered by policyholder and policy
// // //   // static async getPaymentsByPolicyholderAndPolicy(req, res) {
// // //   //   const { policyholder_id, policy_id } = req.query;
// // //   //   try {
// // //   //     const payments = await Payment.find({ policyholder_id, policy_id });
// // //   //     res.status(200).json(payments);
// // //   //   } catch (error) {
// // //   //     res.status(400).json({ message: error.message });
// // //   //   }
// // //   // }
// // //   static async getPaymentsByPolicyholderAndPolicy(req, res) {
// // //     const { policyholder_id, policy_id } = req.query; // from query params
// // //     try {
// // //       const payments = await Payment.find({ 
// // //         policyholder_id: mongoose.Types.ObjectId(policyholder_id),
// // //         policy_id: mongoose.Types.ObjectId(policy_id)
// // //       });
// // //       res.status(200).json(payments);
// // //     } catch (error) {
// // //       res.status(400).json({ message: error.message });
// // //     }
// // //   }
  
// // //   // Get a single payment by id
// // //   static async getPayment(req, res) {
// // //     const { id } = req.params;
// // //     try {
// // //       const payment = await Payment.findById(id);
// // //       if (!payment) {
// // //         return res.status(404).json({ message: "Payment not found" });
// // //       }
// // //       res.status(200).json(payment);
// // //     } catch (error) {
// // //       res.status(400).json({ message: error.message });
// // //     }
// // //   }

// // //   // Get all payments (for admin or aggregate views)
// // //   static async getAllPayments(req, res) {
// // //     try {
// // //       const payments = await Payment.find().populate("policyholder_id policy_id");
// // //       res.status(200).json(payments);
// // //     } catch (error) {
// // //       res.status(400).json({ message: error.message });
// // //     }
// // //   }
// // // }

// // // module.exports = PaymentController;


// // // src/controllers/PaymentController.js
// // const mongoose = require("mongoose"); // Ensure mongoose is imported
// // const Payment = require("../models/Payment");
// // const Policyholder = require("../models/Policyholder");
// // const Policy = require("../models/Policy");

// // class PaymentController {
// //   // Create a payment using the authenticated user's id
// //   static async createPayment(req, res) {
// //     const { policy_id, amount, payment_type } = req.body;
// //     try {
// //       const payment = new Payment({
// //         policyholder_id: req.user.id,
// //         policy_id,
// //         amount,
// //         payment_type
// //       });
// //       await payment.save();
// //       res.status(201).json(payment);
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   }

// //   // Get payments filtered by both policyholder and policy (using ObjectId casting)
// //   static async getPaymentsByPolicyholderAndPolicy(req, res) {
// //     const { policyholder_id, policy_id } = req.query;
// //     try {
// //       const payments = await Payment.find({ 
// //         policyholder_id: mongoose.Types.ObjectId(policyholder_id),
// //         policy_id: mongoose.Types.ObjectId(policy_id)
// //       });
// //       res.status(200).json(payments);
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   }
  
// //   // Get payments by policyholder (if needed)
// //   static async getPaymentsByPolicyholder(req, res) {
// //     const { policyholder_id } = req.query;
// //     try {
// //       const payments = await Payment.find({ policyholder_id }).populate("policy_id");
// //       res.status(200).json(payments);
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   }
  
// //   // Get a single payment by id
// //   static async getPayment(req, res) {
// //     const { id } = req.params;
// //     try {
// //       const payment = await Payment.findById(id);
// //       if (!payment) {
// //         return res.status(404).json({ message: "Payment not found" });
// //       }
// //       res.status(200).json(payment);
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   }
  
// //   // Get all payments (for admin or aggregate views)
// //   static async getAllPayments(req, res) {
// //     try {
// //       const payments = await Payment.find().populate("policyholder_id policy_id");
// //       res.status(200).json(payments);
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   }
// // }

// // module.exports = PaymentController;


// // src/controllers/PaymentController.js
// const mongoose = require("mongoose"); // Ensure mongoose is imported
// const Payment = require("../models/Payment");
// const Policyholder = require("../models/Policyholder");
// const Policy = require("../models/Policy");

// class PaymentController {
//   // Create a payment using the authenticated user's id
//   static async createPayment(req, res) {
//     const { policy_id, amount, payment_type } = req.body;
//     try {
//       const payment = new Payment({
//         policyholder_id: req.user.id,
//         policy_id,
//         amount,
//         payment_type
//       });
//       await payment.save();
//       res.status(201).json(payment);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   // Get payments filtered by both policyholder and policy using ObjectId with 'new'
//   static async getPaymentsByPolicyholderAndPolicy(req, res) {
//     const { policyholder_id, policy_id } = req.query;
//     console.log(policyholder_id, policy_id,"reached to controller");
    
//     try {
//       const payments = await Payment.find({ 
//         policyholder_id: new mongoose.Types.ObjectId(policyholder_id),
//         policy_id: new mongoose.Types.ObjectId(policy_id)
//       });
//       res.status(200).json(payments);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
  
//   // Get payments by policyholder (if needed)
//   static async getPaymentsByPolicyholder(req, res) {
//     const { policyholder_id } = req.query;
//     try {
//       const payments = await Payment.find({ policyholder_id }).populate("policy_id");
//       res.status(200).json(payments);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
  
//   // Get a single payment by id
//   static async getPayment(req, res) {
//     const { id } = req.params;
//     try {
//       const payment = await Payment.findById(id);
//       if (!payment) {
//         return res.status(404).json({ message: "Payment not found" });
//       }
//       res.status(200).json(payment);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
  
//   // Get all payments (for admin or aggregate views)
//   static async getAllPayments(req, res) {
//     try {
//       const payments = await Payment.find().populate("policyholder_id policy_id");
//       res.status(200).json(payments);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
// }

// module.exports = PaymentController;


const mongoose = require("mongoose"); // Ensure mongoose is imported
const Payment = require("../models/Payment");
const Policyholder = require("../models/Policyholder");
const Policy = require("../models/Policy");

class PaymentController {
  // Create a payment using the authenticated user's id
  static async createPayment(req, res) {
    const { policy_id, amount, payment_type } = req.body;
    try {
      const payment = new Payment({
        policyholder_id: req.user.id,
        policy_id,
        amount,
        payment_type
      });
      await payment.save();
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get payments for the logged-in policyholder.
  // If a query parameter is provided, use that; otherwise, use req.user.id.
  static async getPaymentsByPolicyholder(req, res) {
    const policyholder_id = req.query.policyholder_id || (req.user && req.user.id);
    if (!policyholder_id) {
      return res.status(400).json({ message: "Policyholder ID is required" });
    }
    try {
      const payments = await Payment.find({ policyholder_id }).populate("policy_id");
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get payments filtered by both policyholder and policy (using new with ObjectId)
  static async getPaymentsByPolicyholderAndPolicy(req, res) {
    const { policyholder_id, policy_id } = req.query;
    try {
      const payments = await Payment.find({ 
        policyholder_id: new mongoose.Types.ObjectId(policyholder_id),
        policy_id: new mongoose.Types.ObjectId(policy_id)
      });
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Get a single payment by id
  static async getPayment(req, res) {
    const { id } = req.params;
    try {
      const payment = await Payment.findById(id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Get all payments (for admin or aggregate views)
  static async getAllPayments(req, res) {
    try {
      const payments = await Payment.find().populate("policyholder_id policy_id");
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PaymentController;
