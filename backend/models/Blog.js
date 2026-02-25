import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },

  images: {
    type: [String], // multiple image URLs
    default: []
  },

  timeDuration: String,
  imageText: String,
  authorName: String,
  authorQuote: String,

}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
