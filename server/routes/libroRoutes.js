import { Router } from "express";
const router = Router();
import {
  getLibros,
  getLibro,
  createLibro,
  deleteLibro,
  updateLibro,
} from "../controllers/LibrosControllers.js";

router.get("/libros", getLibros);

router.get("/libros/:id", getLibro);

router.post("/libros", createLibro);

router.put("/libros/:id", updateLibro);

router.delete("/libros/:id", deleteLibro);

export default router;
