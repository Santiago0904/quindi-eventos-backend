import express from "express";
import cors from "cors";
import eventoRoutes from "./routes/evento.routes";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({
    mensaje: "Backend de QuindioEventos funcionando 🚀"
  });
});

// Routes
app.use("/events", eventoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})