import { db } from "../db.js";

// Obtener todos los suscriptores de la base de datos
export const getSuscriptores = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar todos los suscriptores ordenados por ID
    const [result] = await db.query("SELECT * FROM suscriptores ORDER BY id ASC");
    
    // Devolver los resultados en formato JSON
    res.json(result);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un suscriptor específico por ID
export const getSuscriptor = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar un suscriptor por su ID
    const [result] = await db.query("SELECT * FROM suscriptores WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el suscriptor no fue encontrado
    if (result.length === 0)
      return res.status(404).json({ message: "Suscriptor no encontrado" });

    // Devolver el primer resultado (debería ser el único) en formato JSON
    res.json(result[0]);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo suscriptor en la base de datos
export const createSuscriptor = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { documento, nombre, direccion } = req.body;

    // Validar los datos de entrada
    if (!documento || !nombre || !direccion) {
      return res.status(400).json({ message: "Datos de entrada no válidos" });
    }

    // Ejecutar consulta para insertar un nuevo suscriptor en la base de datos
    const [result] = await db.query(
      "INSERT INTO suscriptores (documento, nombre, direccion) VALUES (?, ?, ?)",
      [documento, nombre, direccion]
    );

    // Devolver los detalles del suscriptor creado en formato JSON
    res.json({
      id: result.insertId,
      documento, 
      nombre, 
      direccion,
    });
  } catch (error) {
    // Manejar errores, registrar el error y devolver un código de estado 500 con un mensaje de error
    console.error("Error creando suscriptor:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un suscriptor existente en la base de datos
export const updateSuscriptor = async (req, res) => {
  try {
    // Ejecutar consulta para actualizar un suscriptor por su ID
    const result = await db.query("UPDATE suscriptores SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    // Devolver el resultado de la operación en formato JSON
    res.json(result);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un suscriptor por ID de la base de datos
export const deleteSuscriptor = async (req, res) => {
  try {
    // Ejecutar consulta para eliminar un suscriptor por su ID
    const [result] = await db.query("DELETE FROM suscriptores WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el suscriptor no fue encontrado
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Suscriptor no encontrado" });

    // Devolver un código de estado 204 (Sin contenido) indicando que la operación fue exitosa
    return res.sendStatus(204);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};
