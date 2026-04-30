const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// CREATE PROJECT (Admin only)
router.post("/", auth, async (req, res) => {
  const project = new Project({
    name: req.body.name,
    createdBy: req.user.id,
    members: [req.user.id]
  });

  await project.save();
  res.json(project);
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  const projects = await Project.find({
    members: req.user.id
  });
  res.json(projects);
});

module.exports = router;