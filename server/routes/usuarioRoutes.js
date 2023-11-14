import { Router } from "express";
const router = Router();
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from "../controllers/UsuariosControllers.js";

router.get("/usuarios", getUsuarios);

router.get("/usuarios/:id", getUsuario);

router.post("/usuarios", createUsuario);

router.put("/usuarios/:id", updateUsuario);

router.delete("/usuarios/:id", deleteUsuario);

export default router;