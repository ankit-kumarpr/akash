import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // image path/url
    required: true
  },
  link: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Portfolio", portfolioSchema);
