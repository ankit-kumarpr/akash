import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* CONTACT FORM SUBMIT (Public) */
router.post("/", async (req, res) => {
    try {
        const { name, email, contactNumber, message } = req.body;

        // ✅ validate all fields
        if (!name || !email || !contactNumber || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const contact = new Contact({
            name,
            email,
            contactNumber, // ✅ added
            message
        });

        await contact.save();
        res.status(201).json({ message: "Message sent successfully", data: contact });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* GET ALL CONTACT MESSAGES (Admin only) */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
        

    }
});

/* DELETE MESSAGE (Admin only) */
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
