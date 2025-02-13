// const express = require("express");
// const PolicyholderController = require("../controllers/PolicyholderController");

// const router = express.Router();

// router.post("/policyholders", PolicyholderController.createPolicyholder);
// router.get("/policyholders/:id", PolicyholderController.getPolicyholder);

// module.exports = router;

// const express = require("express");
// const PolicyholderController = require("../controllers/PolicyholderController");
// const authenticate = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/policyholders", PolicyholderController.createPolicyholder);
// router.get("/policyholders/:id", authenticate, PolicyholderController.getPolicyholder);

// module.exports = router;

const express = require("express");
const PolicyholderController = require("../controllers/PolicyholderController");
const router = express.Router();

router.post("/", PolicyholderController.createPolicyholder); // POST /api/policyholders
router.get("/:id", PolicyholderController.getPolicyholder);  // GET /api/policyholders/:id

module.exports = router;