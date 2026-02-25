import express from "express";
import Portfolio from "../models/Portfolio.js";
import portfolioUpload from "../middleware/portfolioUpload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE PORTFOLIO */
router.post(
  "/",
  authMiddleware,
  portfolioUpload.single("image"),
  async (req, res) => {
    try {
      const { title, description, link } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const portfolio = new Portfolio({
        title,
        description,
        link,
        image: req.file.path
      });

      await portfolio.save();
      res.status(201).json({ message: "Portfolio created", data: portfolio });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* GET ALL PORTFOLIOS */
router.get("/", async (req, res) => {
  const portfolios = await Portfolio.find().sort({ createdAt: -1 });
  res.json(portfolios);
});

/* UPDATE PORTFOLIO */
router.put(
  "/:id",
  authMiddleware,
  portfolioUpload.single("image"),
  async (req, res) => {
    try {
      const portfolio = await Portfolio.findById(req.params.id);
      if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

      portfolio.title = req.body.title;
      portfolio.description = req.body.description;
      portfolio.link = req.body.link;

      if (req.file) {
        portfolio.image = req.file.path;
      }

      await portfolio.save();
      res.json({ message: "Portfolio updated", data: portfolio });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* DELETE PORTFOLIO */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ message: "Portfolio deleted" });
});

export default router;
