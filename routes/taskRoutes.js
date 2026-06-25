const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/tasks
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/tasks
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      completed,
      user: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/tasks/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;