import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { connectDB } from "./database";

dotenv.config();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use("/", router);

connectDB();

export default app;
