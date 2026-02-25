import express from "express";
import Blog from "../models/Blog.js";
import upload from "../middleware/uploadMiddleware.js";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ================= CREATE BLOG ================= */
router.post("/", upload.array("images", 10), async (req, res) => {
    try {
        const {
            title,
            shortDescription,
            content,
            timeDuration,
            imageText,
            authorName,
            authorQuote
        } = req.body;

        const images = req.files ? req.files.map(file => file.path) : [];

        const blog = new Blog({
            title,
            shortDescription,
            content,
            images,
            timeDuration,
            imageText,
            authorName,
            authorQuote
        });

        await blog.save();
        res.status(201).json(blog);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/* ================= GET ALL BLOGS ================= */
router.get("/", async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
});


/* ================= GET SINGLE BLOG ================= */
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/* ================= UPDATE BLOG ================= */
router.put("/:id", upload.array("images", 10), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const {
            title,
            shortDescription,
            content,
            timeDuration,
            imageText,
            authorName,
            authorQuote,
            imagesToDelete
        } = req.body;

        // ✅ delete selected images
        if (imagesToDelete) {
            const deleteArray = Array.isArray(imagesToDelete)
                ? imagesToDelete
                : [imagesToDelete];

            blog.images = blog.images.filter(img => !deleteArray.includes(img));

            deleteArray.forEach(imgPath => {
                const fullPath = path.join(process.cwd(), imgPath);
                if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
            });
        }

        // ✅ add new images
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.path);
            blog.images.push(...newImages);
        }

        // ✅ update fields
        blog.title = title;
        blog.shortDescription = shortDescription;
        blog.content = content;
        blog.timeDuration = timeDuration;
        blog.imageText = imageText;
        blog.authorName = authorName;
        blog.authorQuote = authorQuote;

        await blog.save();
        res.json({ message: "Blog updated successfully", data: blog });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/* ================= DELETE BLOG ================= */
router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // delete images from folder
        blog.images.forEach(imgPath => {
            const fullPath = path.join(process.cwd(), imgPath);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        });

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
