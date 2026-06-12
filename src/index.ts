import express from "express";
import cors from "cors";
import eventoRoutes from "./routes/evento.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes.ts";
import reviewRoutes from "./routes/review.routes.ts";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
}));

app.use(express.json());

const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({
    mensaje: "Backend de QuindioEventos funcionando 🚀"
  });
});

// Routes
app.use("/events", eventoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});