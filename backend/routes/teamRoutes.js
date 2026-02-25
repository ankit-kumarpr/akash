import express from "express";
import {
  createTeamMember,
  getTeamMembers,
  deleteTeamMember,
  updateTeamMember
  
} from "../controller/teamController.js";

import multer from "multer";

const router = express.Router();

// 🔹 Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), createTeamMember);
router.get("/", getTeamMembers);
router.put("/team-update/:id", upload.single("image"), updateTeamMember);
router.delete("/:id", deleteTeamMember);

export default router;