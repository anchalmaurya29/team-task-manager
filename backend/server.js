const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ROUTES
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/users"); // ✅ add this

const authMiddleware = require("./middleware/auth");

const app = express();

// ✅ 1. MIDDLEWARE (FIRST)
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app" // 🔁 replace after deploy
  ],
  credentials: true
}));

// ✅ 2. ROUTES
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes); // ✅ needed for dropdown

// ✅ 3. TEST ROUTES
app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json("Protected data accessed");
});

// ❌ REMOVE THIS IN PRODUCTION (unsafe)
// app.get("/add", async (req, res) => {
//   ...
// });

// ✅ 4. DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ 5. PORT (VERY IMPORTANT FOR RAILWAY)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});