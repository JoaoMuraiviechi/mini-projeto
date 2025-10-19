import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "troque_esta_chave_por_uma_segura";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido." });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(400).json({ error: "Token mal formatado." });

  const scheme = parts[0];
  const token = parts[1];
  if (!/^Bearer$/i.test(scheme)) return res.status(400).json({ error: "Token mal formatado." });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    (req as any).user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido." });
  }
};
