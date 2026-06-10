import { v4 as uuidv4 } from "uuid";
import type { Event } from "../types/evento.types";
import { events } from "../data/events.data";

export const createEvent = (eventData: Omit<Event, "id">): Event => {
  const newEvent: Event = {
    id: uuidv4(),
    ...eventData
  };

  events.push(newEvent);
  return newEvent;
};

export const getEventById = (id: string): Event | undefined => {
  return events.find((event) => event.id === id);
};

export const getAllEvents = (): Event[] => {
  return events;
};

export const updateEvent = (
  id: string,
  eventData: Partial<Omit<Event, "id">>
): Event | undefined => {
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return undefined;
  }

  events[eventIndex] = {
    ...events[eventIndex],
    ...eventData
  } as Event;

  return events[eventIndex];
};

export const deleteEvent = (id: string): boolean => {
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return false;
  }

  events.splice(eventIndex, 1);
  return true;
};
