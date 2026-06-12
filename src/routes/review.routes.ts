import { Router } from "express";
import {
  createReviewController,
  getReviewsByEventController,
} from "../controllers/review.controller.ts";
import { validarAutenticado } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/events/:eventId/reviews", getReviewsByEventController);
router.post("/events/:eventId/reviews", validarAutenticado, createReviewController);

export default router;