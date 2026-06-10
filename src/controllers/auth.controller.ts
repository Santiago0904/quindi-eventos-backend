import type { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { leerDb, guardarDb } from "../utils/db.ts"
import type { Usuario } from "../types/usuario.types.ts"

type RegistroBody = {
  nombre: string
  correo: string
  contrasena: string
}

type LoginBody = {
  correo: string
  contrasena: string
}

function validarTexto(valor: unknown): valor is string {
  return typeof valor === "string" && valor.trim().length > 0
}

function formatearUsuario(usuario: Usuario) {
  const { contrasena, ...usuarioSinContrasena } = usuario
  return usuarioSinContrasena
}

export const registrarUsuario = async (
  req: Request<never, unknown, RegistroBody>,
  res: Response
): Promise<void> => {
  const { nombre, correo, contrasena } = req.body

  if (!validarTexto(nombre) || !validarTexto(correo) || !validarTexto(contrasena)) {
    res.status(400).json({ mensaje: "nombre, correo y contraseña son obligatorios" })
    return
  }

  const correoNormalizado = correo.trim().toLowerCase()
  const db = await leerDb()
  const correoDuplicado = db.usuarios.some(
    (usuario) => usuario.correo.toLowerCase() === correoNormalizado
  )

  if (correoDuplicado) {
    res.status(409).json({ mensaje: "El correo ya está registrado" })
    return
  }

  const nuevoUsuario: Usuario = {
    id: uuidv4(),
    nombre: nombre.trim(),
    correo: correoNormalizado,
    contrasena: contrasena.trim(),
    rol: "visitante"
  }

  db.usuarios.push(nuevoUsuario)
  await guardarDb(db)

  res.status(201).json({ ...formatearUsuario(nuevoUsuario) })
}

export const iniciarSesion = async (
  req: Request<never, unknown, LoginBody>,
  res: Response
): Promise<void> => {
  const { correo, contrasena } = req.body

  if (!validarTexto(correo) || !validarTexto(contrasena)) {
    res.status(400).json({ mensaje: "correo y contraseña son obligatorios" })
    return
  }

  const correoNormalizado = correo.trim().toLowerCase()
  const db = await leerDb()
  const usuario = db.usuarios.find(
    (item) => item.correo.toLowerCase() === correoNormalizado
  )

  if (!usuario || usuario.contrasena !== contrasena.trim()) {
    res.status(401).json({ mensaje: "Credenciales incorrectas" })
    return
  }

  res.status(200).json({ ...formatearUsuario(usuario), token: usuario.id })
}

export const cerrarSesion = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ mensaje: "Cerrar sesión en frontend" })
}
