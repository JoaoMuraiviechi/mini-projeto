import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI!;
    if (!uri) throw new Error("MONGO_URI não definido");

    await mongoose.connect(uri, {
      dbName: "mini-projeto",
    });

    console.log("✅ MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
};