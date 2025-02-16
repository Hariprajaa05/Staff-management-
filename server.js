require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB URIs
const MONGO_URI_STAF_DETAILS = "mongodb://localhost:27017/STAF_DETAILS";
const MONGO_URI_FEEDBACK = "mongodb://localhost:27017/FEEDBACK";
const MONGO_URI_UNIVERSITY = "mongodb://localhost:27017/UNIVERSITY";
const MONGO_URI_IAT = "mongodb://localhost:27017/IAT";

// Connect to Multiple Databases
const stafConnection = mongoose.createConnection(MONGO_URI_STAF_DETAILS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const feedbackConnection = mongoose.createConnection(MONGO_URI_FEEDBACK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const universityConnection = mongoose.createConnection(MONGO_URI_UNIVERSITY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const iatConnection = mongoose.createConnection(MONGO_URI_IAT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for Connection Errors
stafConnection.on("error", (err) => console.error("STAF_DETAILS DB error:", err));
feedbackConnection.on("error", (err) => console.error("FEEDBACK DB error:", err));
universityConnection.on("error", (err) => console.error("UNIVERSITY DB error:", err));
iatConnection.on("error", (err) => console.error("IAT DB error:", err));

stafConnection.once("open", () => console.log("Connected to STAF_DETAILS DB"));
feedbackConnection.once("open", () => console.log("Connected to FEEDBACK DB"));
universityConnection.once("open", () => console.log("Connected to UNIVERSITY DB"));
iatConnection.once("open", () => console.log("Connected to IAT DB"));

// Define Schemas
const StaffSchema = new mongoose.Schema(
  {
    staff_name: String,
    staff_id: Number,
    pass: String,
    designation: String,
    dept: String,
  },
  { collection: "details" }
);

const FeedbackSchema = new mongoose.Schema(
  {
    dept: String,
    odd_paper: [Number],
    even_paper: [Number],
    avg: [Number],
    total_avg: [Number],
    total_feedback: Number,
    staff_id: Number,
    staff_name: String,
    year: Number,
  },
  { collection: "cse" }
);

const UniversitySchema = new mongoose.Schema(
  {
    dept: String,
    odd_paper: [Number],
    even_paper: [Number],
    total_avg: [Number],
    total_univ: Number,
    staff_id: Number,
    staff_name: String,
    year: Number,
  },
  { collection: "cse" }
);

const IATSchema = new mongoose.Schema(
  {
    dept: String,
    odd_paper: [Number],
    even_paper: [Number],
    avg: [Number],
    total_avg: [Number],
    total_iat: Number,
    staff_id: Number,
    staff_name: String,
    year: Number,
  },
  { collection: "cse" }
);

// Create Models using Different Connections
const Staff = stafConnection.model("Staff", StaffSchema);
const Feedback = feedbackConnection.model("Feedback", FeedbackSchema);
const University = universityConnection.model("University", UniversitySchema);
const IAT = iatConnection.model("IAT", IATSchema);

// Login API - Retrieves user data from the database
app.post("/login", async (req, res) => {
  const { user_id, password } = req.body;
  console.log("Login attempt for:", user_id);

  try {
    const user = await Staff.findOne({ staff_id: user_id, pass: password });

    if (!user) {
      console.log("User Not Found");
      return res.status(401).json({ success: false, message: "Invalid User ID or Password" });
    }

    res.status(200).json({
      success: true,
      designation: user.designation,
      redirectPage: user.designation === "JA" ? "http://127.0.0.1:5000" : "dashboard",
      user: user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Fetch IAT Data (Uses IAT DB)
app.get("/api/getIATDetails", async (req, res) => {
  const { staff_id } = req.query;
  if (!staff_id) return res.status(400).json({ error: "Staff ID is required" });

  try {
    const iatDetails = await IAT.find({ staff_id });
    res.json(iatDetails);
  } catch (error) {
    console.error("Fetch IAT Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch UNIVERSITY Data (Uses UNIVERSITY DB)
app.get("/api/getUniversityDetails", async (req, res) => {
  const { staff_id } = req.query;
  if (!staff_id) return res.status(400).json({ error: "Staff ID is required" });

  try {
    const universityDetails = await University.find({ staff_id });
    res.json(universityDetails);
  } catch (error) {
    console.error("Fetch UNIVERSITY Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch FEEDBACK Data (Uses FEEDBACK DB)
app.get("/api/getFeedbackDetails", async (req, res) => {
  const { staff_id } = req.query;
  if (!staff_id) return res.status(400).json({ error: "Staff ID is required" });

  try {
    const feedbackDetails = await Feedback.find({ staff_id });
    res.json(feedbackDetails);
  } catch (error) {
    console.error("Fetch FEEDBACK Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
