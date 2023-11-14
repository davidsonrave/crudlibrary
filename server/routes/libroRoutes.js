// Importar el módulo Router de Express
import { Router } from "express";
const router = Router();

// Importar los controladores de libros
import {
  getLibros,
  getLibro,
  createLibro,
  deleteLibro,
  updateLibro,
} from "../controllers/LibrosControllers.js";

// Definir la ruta para obtener todos los libros
router.get("/libros", getLibros);

// Definir la ruta para obtener un libro por su ID
router.get("/libros/:id", getLibro);

// Definir la ruta para crear un nuevo libro
router.post("/libros", createLibro);

// Definir la ruta para actualizar un libro existente por su ID
router.put("/libros/:id", updateLibro);

// Definir la ruta para eliminar un libro por su ID
router.delete("/libros/:id", deleteLibro);

// Exportar el router para ser utilizado por la aplicación principal
export default router;
