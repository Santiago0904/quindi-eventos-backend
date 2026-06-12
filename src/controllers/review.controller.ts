import type { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { leerDb, guardarDb } from "../utils/db.ts";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.ts";
import type { Resena } from "../types/resena.types.ts";

function obtenerEventId(req: AuthenticatedRequest): string | null {
  const eventId = req.params.eventId;

  if (!eventId || Array.isArray(eventId)) {
    return null;
  }

  return eventId;
}

export const getReviewsByEventController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const eventId = obtenerEventId(req);

  if (!eventId) {
    res.status(400).json({ mensaje: "ID del evento requerido" });
    return;
  }

  const db = await leerDb();

  res.status(200).json({
    data: db.resenas.filter((item) => item.eventId === eventId),
  });
};

export const createReviewController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const eventId = obtenerEventId(req);
  const { rating, comment } = req.body;

  if (!eventId) {
    res.status(400).json({ mensaje: "ID del evento requerido" });
    return;
  }

  if (!req.user) {
    res.status(401).json({ mensaje: "Usuario no autenticado" });
    return;
  }

  const ratingNumber = Number(rating);

  if (!Number.isInteger(ratingNumber) || ratingNumber < 0 || ratingNumber > 5) {
    res.status(400).json({ mensaje: "La calificación debe estar entre 0 y 5" });
    return;
  }

  if (typeof comment !== "string" || comment.trim().length === 0) {
    res.status(400).json({ mensaje: "El comentario es obligatorio" });
    return;
  }

  const db = await leerDb();

  const nuevaResena: Resena = {
    id: uuidv4(),
    eventId,
    userId: req.user.id,
    userName: req.user.nombre,
    rating: ratingNumber,
    comment: comment.trim(),
    createdAt: new Date().toISOString(),
  };

  db.resenas.push(nuevaResena);
  await guardarDb(db);

  res.status(201).json({
    mensaje: "Reseña creada correctamente",
    data: nuevaResena,
  });
};