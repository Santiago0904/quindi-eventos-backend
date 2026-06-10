import { Router } from "express"
import { registrarUsuario, iniciarSesion, cerrarSesion } from "../controllers/auth.controller.ts"

const router = Router()

router.post("/register", registrarUsuario)
router.post("/login", iniciarSesion)
router.post("/logout", cerrarSesion)

export default router
