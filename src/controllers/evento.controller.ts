import type { Request, Response } from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
} from "../services/event.service";
import type { EventPayload } from "../types/evento.types";

const REQUIRED_FIELDS = [
  "nombre",
  "descripcion",
  "municipio",
  "lugar",
  "fecha",
  "hora",
  "categoria",
  "imagen",
  "precio",
  "edadMinima",
];

const validateEventFields = (data: Partial<EventPayload>): boolean => {
  return REQUIRED_FIELDS.every((field) => {
    const value = data[field as keyof EventPayload];

    if (typeof value === "string") {
      return value.trim() !== "";
    }

    if (field === "precio" || field === "edadMinima") {
      return value !== undefined && value !== null && !Number.isNaN(Number(value));
    }

    return value !== undefined && value !== null;
  });
};

const normalizeEventPayload = (data: any): EventPayload => {
  const imagen = String(data.imagen ?? "").trim();

  const imagenes = Array.isArray(data.imagenes)
    ? data.imagenes.map((item: unknown) => String(item).trim()).filter(Boolean)
    : [];

  return {
    nombre: String(data.nombre ?? "").trim(),
    descripcion: String(data.descripcion ?? "").trim(),
    municipio: String(data.municipio ?? "").trim(),
    lugar: String(data.lugar ?? "").trim(),
    fecha: String(data.fecha ?? "").trim(),
    hora: String(data.hora ?? "").trim(),
    categoria: String(data.categoria ?? "").trim(),
    imagen,
    imagenes: imagenes.length > 0 ? imagenes : imagen ? [imagen] : [],
    precio: Number(data.precio),
    edadMinima: Number(data.edadMinima),
  };
};

export const createEventController = (req: Request, res: Response): void => {
  const eventData = normalizeEventPayload(req.body);

  if (!validateEventFields(eventData)) {
    res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
    return;
  }

  const newEvent = createEvent(eventData);

  res.status(201).json({
    message: "Evento creado correctamente",
    data: newEvent,
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

  const event = getEventById(String(idParam));

  if (!event) {
    res.status(404).json({
      message: "Evento no encontrado",
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
  const event = getEventById(id);

  if (!event) {
    res.status(404).json({
      message: "Evento no encontrado",
    });
    return;
  }

  const eventData = normalizeEventPayload({
    ...event,
    ...req.body,
  });

  if (!validateEventFields(eventData)) {
    res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
    return;
  }

  const updatedEvent = updateEvent(id, eventData);

  res.status(200).json({
    message: "Evento actualizado correctamente",
    data: updatedEvent,
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
      message: "Evento no encontrado",
    });
    return;
  }

  deleteEvent(id);

  res.status(200).json({
    message: "Evento eliminado correctamente",
  });
};