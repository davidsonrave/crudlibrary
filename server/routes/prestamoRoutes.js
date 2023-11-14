// Importar el módulo Router de Express
import { Router } from "express";
const router = Router();

// Importar los controladores de préstamos
import {
  getPrestamos,
  getPrestamo,
  createPrestamo,
  deletePrestamo,
  updatePrestamo,
} from "../controllers/PrestamosControllers.js";

// Definir la ruta para obtener todos los préstamos
router.get("/prestamos", getPrestamos);

// Definir la ruta para obtener un préstamo por su ID
router.get("/prestamos/:id", getPrestamo);

// Definir la ruta para crear un nuevo préstamo
router.post("/prestamos", createPrestamo);

// Definir la ruta para actualizar un préstamo existente por su ID
router.put("/prestamos/:id", updatePrestamo);

// Definir la ruta para eliminar un préstamo por su ID
router.delete("/prestamos/:id", deletePrestamo);

// Exportar el router para ser utilizado por la aplicación principal
export default router;
