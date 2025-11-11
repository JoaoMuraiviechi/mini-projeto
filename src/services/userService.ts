import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

const jwtSecret: Secret = process.env.JWT_SECRET || "supersegredo123";

// Converte a string de tempo (ex: "1h") em segundos
const parseExpires = (expires: string | undefined): number => {
  if (!expires) return 3600; // default 1h
  const match = expires.match(/^(\d+)([smhd])$/);
  if (!match) return 3600;
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s": return value;
    case "m": return value * 60;
    case "h": return value * 3600;
    case "d": return value * 86400;
    default: return 3600;
  }
};

const jwtExpiresSeconds = parseExpires(process.env.JWT_EXPIRES_IN);

export const registerUser = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw Object.assign(new Error("E-mail já cadastrado."), { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();

  const obj = user.toObject();
  delete (obj as any).password;

  return obj;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw Object.assign(new Error("E-mail não encontrado."), { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Object.assign(new Error("Senha inválida."), { status: 401 });

  const signOptions: SignOptions = { expiresIn: jwtExpiresSeconds };

  const token = jwt.sign(
    { id: user._id, email: user.email },
    jwtSecret,
    signOptions
  );

  return token;
};
