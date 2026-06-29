// Routes
import express from "express"
import { isAuth } from "../middleware/isAuth"


const userRouter = express.Router();

userRouter.get("/current-user" , isAuth, analyzeVideo)