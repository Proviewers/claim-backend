const express = require("express");
const ClaimController = require("../controllers/ClaimController");
const { authenticate, checkAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
// const upload = require("../middleware/upload"); // Your multer configuration

// routes/ClaimRoutes.js


// router.post("/", upload.single('document'), ClaimController.createClaim);

router.get("/", ClaimController.getAllClaimsbystatus);
// router.get("/", ClaimController.getAllClaims); // New endpoint
router.post("/", ClaimController.createClaim);
// router.put("/:id", ClaimController.updateClaim);
router.put("/:id", authenticate, checkAdmin, ClaimController.updateClaim);
// routes/ClaimRoutes.js
router.get("/admin", authenticate, checkAdmin, ClaimController.getAllClaimsbystatus);
// router.post("/", authenticate, ClaimController.createClaim);
router.get("/my", authenticate, ClaimController.getClaimsForPolicyholder);

module.exports = router;