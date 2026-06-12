import express from "express";
import cors from "cors";
import eventoRoutes from "./routes/evento.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes.ts";
import reviewRoutes from "./routes/review.routes.ts";

const app = express();

/**
 * CORS
 * En producción podrás restringirlo a la URL de Vercel.
 * Por ahora lo dejamos abierto para evitar problemas de conexión.
 */
app.use(
  cors({
    origin: [
    "http://localhost:5173",
    "https://quindi-eventos.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
  })
);

app.use(express.json());

/**
 * Puerto dinámico para Render
 */
const PORT = process.env.PORT || 3000;

/**
 * Ruta de prueba
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    mensaje: "Backend de QuindioEventos funcionando 🚀",
    estado: "OK",
  });
});

/**
 * Rutas principales
 */
app.use("/events", eventoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", reviewRoutes);

/**
 * Middleware para rutas inexistentes
 */
app.use((_req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

/**
 * Inicio servidor
 */
app.listen(PORT, () => {
  console.log(
    `🚀 Servidor corriendo en puerto ${PORT}`
  );
});