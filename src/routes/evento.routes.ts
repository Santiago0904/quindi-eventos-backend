import { Router } from "express";
import {
  createEventController,
  updateEventController,
  deleteEventController,
  getEventsController,
  getEventController
} from "../controllers/evento.controller";

const router = Router();

// RF-09: Crear Evento (Admin)
router.post("/", createEventController);

// READ: Obtener todos los eventos
router.get("/", getEventsController);

// READ: Obtener un evento por ID
router.get("/:id", getEventController);

// RF-10: Editar Evento (Admin)
router.put("/:id", updateEventController);

// RF-11: Eliminar Evento (Admin)
router.delete("/:id", deleteEventController);

export default router;
