import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    default: ""
  },
  salary: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Career", careerSchema);
