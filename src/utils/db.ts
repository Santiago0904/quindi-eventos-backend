import path from "path"
import { readFile, writeFile } from "fs/promises"
import { fileURLToPath } from "url"
import type { Usuario } from "../types/usuario.types.ts"

export interface Database {
  usuarios: Usuario[]
  [key: string]: unknown
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_PATH = path.join(__dirname, "../data/db.json")

export async function leerDb(): Promise<Database> {
  const contenido = await readFile(DB_PATH, "utf-8")
  const db = JSON.parse(contenido) as Database
  if (!Array.isArray(db.usuarios)) {
    return { ...db, usuarios: [] }
  }
  return db
}

export async function guardarDb(db: Database): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8")
}
