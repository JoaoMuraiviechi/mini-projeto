import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/userService";

const validateEmail = (email: string) => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Campos 'name', 'email' e 'password' são obrigatórios." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido." });
    }
    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Senha inválida. Deve ter ao menos 6 caracteres." });
    }
    const user = await registerUser(name, email, password);
    return res.status(201).json({ message: "Usuário criado com sucesso.", user });
  } catch (err: any) {
    console.error("register error:", err.message);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro no servidor." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Campos 'email' e 'password' são obrigatórios." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido." });
    }
    const token = await loginUser(email, password);
    return res.json({ message: "Login bem-sucedido.", token });
  } catch (err: any) {
    console.error("login error:", err.message);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || "Erro no servidor." });
  }
};

export const protectedRoute = async (req: Request, res: Response) => {
  return res.json({ message: "Acesso autorizado!" });
};
