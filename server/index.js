import express from "express";

import cors from "cors";
import { PORT } from "./config.js";
const app = express();

import usuarioRoutes from "./routes/usuarioRoutes.js";
import libroRoutes from "./routes/libroRoutes.js";
import suscritorRoutes from "./routes/suscritorRoutes.js";
import prestamoRoutes from "./routes/prestamoRoutes.js";


app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);
app.use(libroRoutes);
app.use(suscritorRoutes);
app.use(prestamoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
