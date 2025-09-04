import Data from "../models/Data.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const submitData = async (req, res) => {
  try {
    const { name, address } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "audios",
    });

    const newData = new Data({
      name,
      address,
      audioUrl: result.secure_url,
    });

    await newData.save();

    fs.unlinkSync(req.file.path);

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
