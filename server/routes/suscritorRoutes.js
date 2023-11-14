// Importar el módulo Router de Express
import { Router } from "express";
const router = Router();

// Importar los controladores de suscriptores
import {
  getSuscriptores,
  getSuscriptor,
  createSuscriptor,
  deleteSuscriptor,
  updateSuscriptor,
} from "../controllers/SuscriptoresControllers.js";

// Definir la ruta para obtener todos los suscriptores
router.get("/suscriptores", getSuscriptores);

// Definir la ruta para obtener un suscriptor por su ID
router.get("/suscriptores/:id", getSuscriptor);

// Definir la ruta para crear un nuevo suscriptor
router.post("/suscriptores", createSuscriptor);

// Definir la ruta para actualizar un suscriptor existente por su ID
router.put("/suscriptores/:id", updateSuscriptor);

// Definir la ruta para eliminar un suscriptor por su ID
router.delete("/suscriptores/:id", deleteSuscriptor);

// Exportar el router para ser utilizado por la aplicación principal
export default router;
