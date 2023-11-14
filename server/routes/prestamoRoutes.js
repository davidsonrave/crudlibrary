import { Router } from "express";
const router = Router();
import {
 getPrestamos,
  getPrestamo,
  createPrestamo,
  deletePrestamo,
  updatePrestamo,
} from "../controllers/PrestamosControllers.js";

router.get("/prestamos", getPrestamos );

router.get("/prestamos/:id", getPrestamo);

router.post("/prestamos", createPrestamo );

router.put("/prestamos/:id", updatePrestamo );

router.delete("/prestamos/:id", deletePrestamo );

export default router;