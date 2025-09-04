import express from "express";
import multer from "multer";
import { getAllData, submitData } from "../controllers/dataController.js";

const router = express.Router();

// Setup multer (lokal)
const storage = multer.memoryStorage(); // file disimpan di memory, bukan disk

const upload = multer({ storage });

// Routes
router.post("/submit", upload.single("audio"), submitData);
router.get("/", getAllData);

export default router;
