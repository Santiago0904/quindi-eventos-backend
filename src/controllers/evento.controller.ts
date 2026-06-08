import type { Request, Response } from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents
} from "../services/event.service";
import type { Event } from "../types/evento.types";

const REQUIRED_FIELDS = [
  "nombre",
  "descripcion",
  "municipio",
  "lugar",
  "fecha",
  "hora",
  "categoria",
  "imagen",
  "edadMinima"
];

const validateEventFields = (data: any): boolean => {
  return REQUIRED_FIELDS.every((field) => data.hasOwnProperty(field) && data[field] !== "");
};

export const createEventController = (req: Request, res: Response): void => {
  const eventData = req.body;

  if (!validateEventFields(eventData)) {
    res.status(400).json({
      message: "Todos los campos son obligatorios"
    });
    return;
  }

  const newEvent = createEvent(eventData);

  res.status(201).json({
    message: "Evento creado correctamente",
    data: newEvent
  });
};

export const getEventsController = (_req: Request, res: Response): void => {
  const all = getAllEvents();
  res.status(200).json({ data: all });
};

export const getEventController = (req: Request, res: Response): void => {
  const idParam = req.params.id;
  if (!idParam || Array.isArray(idParam)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }
  const id = String(idParam);

  const event = getEventById(id);

  if (!event) {
    res.status(404).json({
      message: "Evento no encontrado"
    });
    return;
  }

  res.status(200).json({ data: event });
};

export const updateEventController = (req: Request, res: Response): void => {
  const idParam = req.params.id;
  if (!idParam || Array.isArray(idParam)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }
  const id = String(idParam);
  const eventData = req.body;

  const event = getEventById(id);

  if (!event) {
    res.status(404).json({
      message: "Evento no encontrado"
    });
    return;
  }

  const updatedEvent = updateEvent(id, eventData);

  res.status(200).json({
    message: "Evento actualizado correctamente",
    data: updatedEvent
  });
};

export const deleteEventController = (req: Request, res: Response): void => {
  const idParam = req.params.id;
  if (!idParam || Array.isArray(idParam)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }
  const id = String(idParam);

  const event = getEventById(id);

  if (!event) {
    res.status(404).json({
      message: "Evento no encontrado"
    });
    return;
  }

  deleteEvent(id);

  res.status(200).json({
    message: "Evento eliminado correctamente"
  });
};
