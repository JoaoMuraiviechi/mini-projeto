import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ importa o CORS
import router from "./routes";
import { connectDB } from "./database";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

connectDB();

export default app;