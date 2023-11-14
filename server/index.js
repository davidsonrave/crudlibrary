// Importar express para la creación de la aplicación
import express from "express";

// Importar el middleware cors para gestionar las solicitudes entre dominios
import cors from "cors";

// Importar el puerto desde el archivo de configuración
import { PORT } from "./config.js";

// Crear una instancia de la aplicación Express
const app = express();

// Importar las rutas específicas para usuarios, libros, suscriptores y préstamos
import usuarioRoutes from "./routes/usuarioRoutes.js";
import libroRoutes from "./routes/libroRoutes.js";
import suscritorRoutes from "./routes/suscritorRoutes.js";
import prestamoRoutes from "./routes/prestamoRoutes.js";

// Utilizar el middleware cors para gestionar las solicitudes entre dominios
app.use(cors());

// Habilitar el middleware para el análisis de datos JSON en las solicitudes
app.use(express.json());

// Utilizar las rutas específicas para gestionar las diferentes entidades
app.use(usuarioRoutes);
app.use(libroRoutes);
app.use(suscritorRoutes);
app.use(prestamoRoutes);

// Configurar el servidor para escuchar en el puerto definido en el archivo de configuración
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
