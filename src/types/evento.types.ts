export interface Event {
  id: string;
  nombre: string;
  descripcion: string;
  municipio: string;
  lugar: string;
  fecha: string;
  hora: string;
  categoria: string;
  imagen: string;
  imagenes: string[];
  precio: number;
  edadMinima: number;
}

export type EventPayload = Omit<Event, "id">;