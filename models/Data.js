import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    audioUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Data", DataSchema);
