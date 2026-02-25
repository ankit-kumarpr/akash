import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// static folder for images
app.use("/uploads", express.static("uploads"));

// ✅ Root route (this fixes Cannot GET /)
app.get("/", (req, res) => {
    res.send("Welcome to Backend API 🚀");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/portfolio", portfolioRoutes);
// lkjh
app.use("/api/career", careerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/team", teamRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
