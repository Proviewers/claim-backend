// // const express = require("express");
// // const PaymentController = require("../controllers/PaymentController");
// // const router = express.Router();

// // router.get("/all", PaymentController.getAllPayments);
// // router.post("/", PaymentController.createPayment);
// // router.get("/", PaymentController.getPaymentsByPolicyholder); // New endpoint
// // router.get("/filter", PaymentController.getPaymentsByPolicyholderAndPolicy); // New endpoint
// // router.get("/:id", PaymentController.getPayment);


// // module.exports = router;

// // const express = require("express");
// // const PaymentController = require("../controllers/PaymentController");
// // const router = express.Router();

// // // Get all payments
// // router.get("/all", PaymentController.getAllPayments);

// // // Create a payment
// // router.post("/", PaymentController.createPayment);

// // // Get payments by policyholder (if needed)
// // router.get("/", PaymentController.getPaymentsByPolicyholder);

// // // Get payments filtered by both policyholder and policy
// // router.get("/filter", PaymentController.getPaymentsByPolicyholderAndPolicy);

// // // Get a single payment by id
// // router.get("/:id", PaymentController.getPayment);

// // module.exports = router;

// const express = require("express");
// const PaymentController = require("../controllers/PaymentController");
// const router = express.Router();

// // GET all payments (if needed)
// router.get("/all", PaymentController.getAllPayments);

// // POST create a payment
// router.post("/", PaymentController.createPayment);

// // GET payments by policyholder (if needed)
// router.get("/", PaymentController.getPaymentsByPolicyholder);

// // GET payments filtered by both policyholder and policy
// router.get("/filter", PaymentController.getPaymentsByPolicyholderAndPolicy);

// // GET a single payment by id
// router.get("/:id", PaymentController.getPayment);

// module.exports = router;


const express = require("express");
const PaymentController = require("../controllers/PaymentController");
const router = express.Router();

// GET all payments (for admin or aggregate views)
router.get("/all", PaymentController.getAllPayments);

// POST create a payment
router.post("/", PaymentController.createPayment);

// GET payments for the logged-in policyholder
router.get("/my", PaymentController.getPaymentsByPolicyholder);

// GET payments filtered by both policyholder and policy
router.get("/filter", PaymentController.getPaymentsByPolicyholderAndPolicy);

// GET a single payment by id
router.get("/:id", PaymentController.getPayment);

module.exports = router;
