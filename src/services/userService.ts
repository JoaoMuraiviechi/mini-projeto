import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "troque_esta_chave_por_uma_segura";
const jwtExpires = process.env.JWT_EXPIRES_IN || "1h";

export const registerUser = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err: any = new Error("E-mail já cadastrado.");
    err.status = 409;
    throw err;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  // don't return password
  const obj = user.toObject();
  delete (obj as any).password;
  return obj;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const err: any = new Error("E-mail não encontrado.");
    err.status = 401;
    throw err;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err: any = new Error("Senha inválida.");
    err.status = 401;
    throw err;
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string, 
    { expiresIn: jwtExpires }
  );
  return token;
};
