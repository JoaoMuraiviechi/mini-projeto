// src/routes/notes.routes.ts
import { Router } from "express";
import * as noteController from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authMiddleware";

const notesRouter = Router();

notesRouter.use(authMiddleware); // protege todas as rotas

notesRouter.post("/", noteController.create);
notesRouter.get("/", noteController.list);
notesRouter.get("/:id", noteController.getById);
notesRouter.put("/:id", noteController.put);
notesRouter.delete("/:id", noteController.remove);

export { notesRouter };
