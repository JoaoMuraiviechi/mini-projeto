import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ importa o CORS
import router from "./routes";
import { connectDB } from "./database";

dotenv.config();
const app = express();

// ✅ habilita o CORS para permitir requisições do frontend (ex: localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // ou "*" se quiser liberar tudo
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// log básico das requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// suas rotas
app.use("/", router);

// conecta ao banco
connectDB();

export default app;
