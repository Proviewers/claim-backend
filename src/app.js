// const express = require("express");
// const PolicyholderRoutes = require("./routes/PolicyholderRoutes");
// const PolicyRoutes = require("./routes/PolicyRoutes");
// const ClaimRoutes = require("./routes/ClaimRoutes");
// const DocumentRoutes = require("./routes/DocumentRoutes");
// const PaymentRoutes = require("./routes/PaymentRoutes");
// const connectDB = require("./config/db");


// // Connect to MongoDB
// connectDB();
// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// app.use("/api", PolicyholderRoutes);
// app.use("/api", PolicyRoutes);
// app.use("/api", PaymentRoutes);
// app.use("/api", DocumentRoutes);
// app.use("/api", ClaimRoutes);

// // Add this line after other routes

// // Add this line after other routes

// // Start server
// const PORT = 3000;
// app.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });
  
  // const express = require("express");
  // const connectDB = require("./config/db");
  // const app = express();
  
  // const dotenv = require("dotenv");
  // dotenv.config(); // Load environment variables
  // // Connect to MongoDB
  // connectDB();
  
  // // Middleware
  // app.use(express.json());
  
  // // Routes
  // console.log("binod");
  // console.log(process.env.PORT);
  // console.log(process.env.MONGODB_URI);
  // app.use("/api/policyholders", require("./routes/policyholderRoutes"));
  // app.use("/api/policies", require("./routes/policyRoutes"));
  // app.use("/api/claims", require("./routes/claimRoutes"));
  // app.use("/api/documents", require("./routes/documentRoutes"));
  // app.use("/api/payments", require("./routes/paymentRoutes"));
  
  // module.exports = app;
  
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const express = require("express");
  const connectDB = require("./config/db");
  const app = express();
  
  
  // Connect to MongoDB
  connectDB();
  
  // Middleware
  // app.use(cors()) 
  app.use(
    cors()
  );

app.use(express.json());

const policyholderRoutes = require("./routes/PolicyholderRoutes");




// console.log("Policyholder routes loaded:", policyholderRoutes);
app.use("/api/policyholders", policyholderRoutes);



// app.use("/api/policyholders", require("./routes/policyholderRoutes"));
// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Add authentication routes
app.use("/api/policies", require("./routes/PolicyRoutes"));
app.use("/api/claims", require("./routes/ClaimRoutes"));
// app.use("/api/documents", require("./routes/DocumentRoutes"));
app.use("/api/payments", require("./routes/PaymentRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});