const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router/router");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();

// Define the connectDB function
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error code
  }
};

// Call connectDB to establish the database connection
connectDB();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

app.get("/", function (req, res) {
  res.send("Welcome To Book My Show");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
