import Data from "../models/Data.js";
import cloudinary from "../config/cloudinary.js";

export const submitData = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }

    // Upload langsung dari buffer memory
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "audios" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const newData = new Data({
      name,
      address,
      audioUrl: result.secure_url,
    });

    await newData.save();

    res.json({ success: true, data: newData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
};

export const getAllData = async (req, res) => {
  try {
    const datas = await Data.find().sort({ createdAt: -1 });
    res.json(datas);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
