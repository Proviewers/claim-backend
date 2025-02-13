const ClaimController = require("../src/controllers/ClaimController");
const { PolicyController, policies } = require("../src/controllers/PolicyController"); // Import policies
const Policy = require("../src/models/Policy");

describe("ClaimController", () => {
  beforeEach(() => {
    // Reset in-memory storage before each test
    ClaimController.claims = [];
    policies.length = 0; // Clear the policies array
  });

  test("should create a claim if the claim amount is within policy coverage", () => {
    // Create a policy
    const policy = new Policy(101, 1, "Health", 10000, "2023-01-01", "2023-12-31");
    policies.push(policy); // Add the policy to the policies array

    // Create a claim
    const claimData = {
      id: 1001,
      policy_id: 101,
      claim_amount: 2000,
      claim_date: "2023-03-01",
      status: "Pending",
      description: "Accident claim",
    };
    const req = { body: claimData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    ClaimController.createClaim(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Claim created successfully",
      claim: expect.objectContaining(claimData),
    });
  });

  test("should reject a claim if the claim amount exceeds policy coverage", () => {
    // Create a policy
    const policy = new Policy(101, 1, "Health", 10000, "2023-01-01", "2023-12-31");
    policies.push(policy); // Add the policy to the policies array

    // Create a claim with an amount exceeding coverage
    const claimData = {
      id: 1001,
      policy_id: 101,
      claim_amount: 15000,
      claim_date: "2023-03-01",
      status: "Pending",
      description: "Accident claim",
    };
    const req = { body: claimData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    ClaimController.createClaim(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Claim amount exceeds policy coverage",
    });
  });

  test("should reject a claim if the policy does not exist", () => {
    // Create a claim without a policy
    const claimData = {
      id: 1001,
      policy_id: 101, // Policy does not exist
      claim_amount: 2000,
      claim_date: "2023-03-01",
      status: "Pending",
      description: "Accident claim",
    };
    const req = { body: claimData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    ClaimController.createClaim(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Policy not found",
    });
  });
});