const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/users");

const authMiddleware = require("./middleware/auth");

const app = express();


// ✅ 1. MIDDLEWARE (FIRST)
app.use(express.json());

app.use(cors({
  origin: "*"
}));


// ✅ 2. 🔥 ADD ROUTES HERE (IMPORTANT POSITION)
app.get("/", (req, res) => {
  res.status(200).send("API Running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


// ✅ 3. API ROUTES (AFTER ABOVE)
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);


// ✅ 4. DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// ✅ 5. PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});