import express from "express";
import Career from "../models/Career.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE JOB (Admin only) */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobTitle, description, location, experience, salary } = req.body;

    const career = new Career({
      jobTitle,
      description,
      location,
      experience,
      salary
    });

    await career.save();
    res.status(201).json({ message: "Job created successfully", data: career });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET ALL JOBS (Public) */
router.get("/", async (req, res) => {
  const careers = await Career.find().sort({ createdAt: -1 });
  res.json(careers);
});

/* UPDATE JOB */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!career) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Job updated", data: career });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE JOB */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Career.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

export default router;
