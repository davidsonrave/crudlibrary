// Importar la función createPool del módulo mysql2/promise
import { createPool } from 'mysql2/promise';

// Configurar la conexión a la base de datos utilizando createPool
export const db = createPool({
    host: 'localhost',   // Dirección del servidor de la base de datos
    port: 3306,          // Puerto de la base de datos
    user: 'root',        // Usuario de la base de datos
    password: '',        // Contraseña de la base de datos
    database: 'biblioteca'  // Nombre de la base de datos
});
