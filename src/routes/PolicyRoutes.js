const express = require("express");
const PolicyController = require("../controllers/PolicyController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

// router.post("/", PolicyController.createPolicy);     // POST /api/policies
router.get("/available", PolicyController.getAvailablePolicies);
// router.get("/:id", PolicyController.getPolicy);      // GET /api/policies/:id
router.post("/", authenticate, PolicyController.createPolicy);
router.get("/my-policies", authenticate, PolicyController.getUserPolicies);

module.exports = router;


