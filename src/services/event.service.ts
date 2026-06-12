import { v4 as uuidv4 } from "uuid";
import type { Event, EventPayload } from "../types/evento.types";
import { events } from "../data/events.data";

const normalizeEvent = (event: Event): Event => {
  const imagen = String(event.imagen ?? "").trim();
  const imagenes = Array.isArray(event.imagenes)
    ? event.imagenes.map((item) => String(item).trim()).filter(Boolean)
    : [];

  return {
    ...event,
    imagen,
    imagenes: imagenes.length > 0 ? imagenes : imagen ? [imagen] : [],
    precio: Number(event.precio ?? 0),
    edadMinima: Number(event.edadMinima ?? 0),
  };
};

export const getAllEvents = (): Event[] => {
  return events.map(normalizeEvent);
};

export const getEventById = (id: string): Event | undefined => {
  const event = events.find((item) => item.id === id);
  return event ? normalizeEvent(event) : undefined;
};

export const createEvent = (eventData: EventPayload): Event => {
  const newEvent: Event = normalizeEvent({
    id: uuidv4(),
    ...eventData,
  });

  events.push(newEvent);
  return newEvent;
};

export const updateEvent = (id: string, eventData: EventPayload): Event | undefined => {
  const index = events.findIndex((item) => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedEvent: Event = normalizeEvent({
    id,
    ...eventData,
  });

  events[index] = updatedEvent;
  return updatedEvent;
};

export const deleteEvent = (id: string): void => {
  const index = events.findIndex((item) => item.id === id);

  if (index !== -1) {
    events.splice(index, 1);
  }
};