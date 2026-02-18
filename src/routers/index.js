import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";

const router = Router();

// routing des features
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
