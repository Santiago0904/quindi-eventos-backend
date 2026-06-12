import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.ts";
import eventoRoutes from "./routes/evento.routes.ts";
import userRoutes from "./routes/user.routes.ts";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
}));

app.use(express.json());

app.use("/events", eventoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.json({ mensaje: "Backend de QuindioEventos funcionando 🚀" });
});

export default app;