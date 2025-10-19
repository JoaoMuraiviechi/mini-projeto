import { Router } from "express";
import { register, login, protectedRoute } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, protectedRoute);

export default router;
