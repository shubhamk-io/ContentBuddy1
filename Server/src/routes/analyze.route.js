import express from "express"
import { analyzeVideo } from "../controllers/analyzeController";



const router = express.Router();

router.post("/analyze", analyzeVideo)

export default router