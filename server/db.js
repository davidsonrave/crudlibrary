import { createPool } from "mysql2/promise";

export class Db {
  constructor() {
    this.pool = createPool({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "biblioteca",
    });
  }

  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      console.log("Conexión exitosa a la base de datos!");
      connection.release(); // Importante liberar la conexión después de usarla
      return true;
    } catch (error) {
      console.error("Error de conexión a la base de datos:", error.message);
      return false;
    }
  }
}
