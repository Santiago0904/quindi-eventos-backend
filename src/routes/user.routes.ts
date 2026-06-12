import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller.ts";
import {
  validarAdministrador,
  validarAutenticado,
} from "../middlewares/auth.middleware.ts";

const router = Router();

router.use(validarAutenticado);
router.use(validarAdministrador);

router.get("/", getUsersController);
router.get("/:id", getUserController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;