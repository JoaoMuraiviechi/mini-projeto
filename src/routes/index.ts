import { Router } from "express";
import { register, login, protectedRoute } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { health } from "../controllers/healthController ";

const router = Router();

router.get("/", health); // rota raiz
router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, protectedRoute);

export default router;