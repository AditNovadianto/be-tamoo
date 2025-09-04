import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://adityanovadianto:N6xPX5rKpgePC7xz@cluster0.fhqhxcp.mongodb.net/tamoo?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
