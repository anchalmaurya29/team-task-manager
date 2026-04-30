const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");

// =======================
// GET TASKS
// =======================
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id });
  res.json(tasks);
});
router.get("/overdue", auth, async (req, res) => {
  const tasks = await Task.find({
    assignedTo: req.user.id,
    dueDate: { $lt: new Date() },
    status: { $ne: "completed" }
  });

  res.json(tasks);
});
// =======================
// CREATE TASK
// =======================
router.post("/", auth, async (req, res) => {
  try {
    const { title, project, assignedTo, dueDate } = req.body;

    const task = new Task({
      title,
      status: "pending",
      assignedTo: assignedTo || req.user.id,
      dueDate,
      project: project || undefined   // ✅ FIX HERE
    });

    await task.save();
    res.json(task);

  } catch (err) {
    console.log(err);
    res.status(500).json("Error creating task");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: "after" } 
    );

    res.json(task);

  } catch (err) {
    res.status(500).json("Server error");
  }
});

module.exports = router;