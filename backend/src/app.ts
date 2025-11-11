import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import { connectDB } from "./database";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-projeto-cl4a.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.options("*", cors());

app.use(express.json());


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use("/", router);

connectDB();

export default app;
