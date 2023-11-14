// Importar el módulo Router de Express
import { Router } from "express";
const router = Router();

// Importar los controladores de usuarios
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from "../controllers/UsuariosControllers.js";

// Definir la ruta para obtener todos los usuarios
router.get("/usuarios", getUsuarios);

// Definir la ruta para obtener un usuario por su ID
router.get("/usuarios/:id", getUsuario);

// Definir la ruta para crear un nuevo usuario
router.post("/usuarios", createUsuario);

// Definir la ruta para actualizar un usuario existente por su ID
router.put("/usuarios/:id", updateUsuario);

// Definir la ruta para eliminar un usuario por su ID
router.delete("/usuarios/:id", deleteUsuario);

// Exportar el router para ser utilizado por la aplicación principal
export default router;
