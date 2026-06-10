import type { NextFunction, Request, Response } from "express"
import { leerDb } from "../utils/db.ts"
import type { Usuario } from "../types/usuario.types.ts"

export interface AuthenticatedRequest extends Request {
  user?: Usuario
}

export const validarAutenticado = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.header("x-user-id")

  if (!userId) {
    res.status(401).json({ mensaje: "Usuario no autenticado" })
    return
  }

  const db = await leerDb()
  const usuario = db.usuarios.find((item) => item.id === userId)

  if (!usuario) {
    res.status(401).json({ mensaje: "Usuario no válido" })
    return
  }

  req.user = usuario
  next()
}

export const validarAdministrador = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ mensaje: "Usuario no autenticado" })
    return
  }

  if (req.user.rol !== "administrador") {
    res.status(403).json({ mensaje: "Se necesita rol administrador" })
    return
  }

  next()
}
