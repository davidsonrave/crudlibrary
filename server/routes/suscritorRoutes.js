import { Router } from "express";
const router = Router();
import {
  getSuscriptores,
  getSuscriptor,
  createSuscriptor,
  deleteSuscriptor,
  updateSuscriptor,
} from "../controllers/SuscriptoresControllers.js";

router.get("/suscriptores", getSuscriptores);

router.get("/suscriptores/:id", getSuscriptor);

router.post("/suscriptores", createSuscriptor);

router.put("/suscriptores/:id", updateSuscriptor);

router.delete("/suscriptores/:id", deleteSuscriptor);

export default router;