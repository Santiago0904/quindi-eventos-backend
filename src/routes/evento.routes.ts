import { Router } from "express";
import {
  createEventController,
  updateEventController,
  deleteEventController,
  getEventsController,
  getEventController,
} from "../controllers/evento.controller";

const router = Router();

router.post("/", createEventController);
router.get("/", getEventsController);
router.get("/:id", getEventController);
router.put("/:id", updateEventController);
router.delete("/:id", deleteEventController);

export default router;