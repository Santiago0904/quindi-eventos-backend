import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { leerDb, guardarDb } from "../utils/db.ts";
import type { Usuario } from "../types/usuario.types.ts";

type UserBody = {
  nombre?: string;
  correo?: string;
  contrasena?: string;
  rol?: "visitante" | "administrador";
};

function validarTexto(valor: unknown): valor is string {
  return typeof valor === "string" && valor.trim().length > 0;
}

function formatearUsuario(usuario: Usuario) {
  const { contrasena, ...usuarioSinContrasena } = usuario;
  return usuarioSinContrasena;
}

export const getUsersController = async (_req: Request, res: Response): Promise<void> => {
  const db = await leerDb();
  res.status(200).json({
    data: db.usuarios.map(formatearUsuario),
  });
};

export const getUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const db = await leerDb();

  const usuario = db.usuarios.find((item) => item.id === id);

  if (!usuario) {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
    return;
  }

  res.status(200).json({ data: formatearUsuario(usuario) });
};

export const createUserController = async (
  req: Request<never, unknown, UserBody>,
  res: Response
): Promise<void> => {
  const { nombre, correo, contrasena, rol } = req.body;

  if (!validarTexto(nombre) || !validarTexto(correo) || !validarTexto(contrasena)) {
    res.status(400).json({ mensaje: "nombre, correo y contraseña son obligatorios" });
    return;
  }

  if (rol !== "visitante" && rol !== "administrador") {
    res.status(400).json({ mensaje: "Rol inválido" });
    return;
  }

  const correoNormalizado = correo.trim().toLowerCase();
  const db = await leerDb();

  const correoDuplicado = db.usuarios.some(
    (usuario) => usuario.correo.toLowerCase() === correoNormalizado
  );

  if (correoDuplicado) {
    res.status(409).json({ mensaje: "El correo ya está registrado" });
    return;
  }

  const nuevoUsuario: Usuario = {
    id: uuidv4(),
    nombre: nombre.trim(),
    correo: correoNormalizado,
    contrasena: contrasena.trim(),
    rol,
  };

  db.usuarios.push(nuevoUsuario);
  await guardarDb(db);

  res.status(201).json({
    mensaje: "Usuario creado correctamente",
    data: formatearUsuario(nuevoUsuario),
  });
};

export const updateUserController = async (
  req: Request<{ id: string }, unknown, UserBody>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { nombre, correo, contrasena, rol } = req.body;

  const db = await leerDb();
  const usuario = db.usuarios.find((item) => item.id === id);

  if (!usuario) {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
    return;
  }

  if (correo !== undefined) {
    if (!validarTexto(correo)) {
      res.status(400).json({ mensaje: "El correo no puede estar vacío" });
      return;
    }

    const correoNormalizado = correo.trim().toLowerCase();
    const correoDuplicado = db.usuarios.some(
      (item) => item.id !== id && item.correo.toLowerCase() === correoNormalizado
    );

    if (correoDuplicado) {
      res.status(409).json({ mensaje: "El correo ya está registrado" });
      return;
    }

    usuario.correo = correoNormalizado;
  }

  if (nombre !== undefined) {
    if (!validarTexto(nombre)) {
      res.status(400).json({ mensaje: "El nombre no puede estar vacío" });
      return;
    }

    usuario.nombre = nombre.trim();
  }

  if (contrasena !== undefined && contrasena.trim().length > 0) {
    usuario.contrasena = contrasena.trim();
  }

  if (rol !== undefined) {
    if (rol !== "visitante" && rol !== "administrador") {
      res.status(400).json({ mensaje: "Rol inválido" });
      return;
    }

    usuario.rol = rol;
  }

  await guardarDb(db);

  res.status(200).json({
    mensaje: "Usuario actualizado correctamente",
    data: formatearUsuario(usuario),
  });
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const db = await leerDb();
  const existeUsuario = db.usuarios.some((item) => item.id === id);

  if (!existeUsuario) {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
    return;
  }

  db.usuarios = db.usuarios.filter((item) => item.id !== id);
  await guardarDb(db);

  res.status(200).json({
    mensaje: "Usuario eliminado correctamente",
  });
};