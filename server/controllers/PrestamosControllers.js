import { db } from "../db.js";

// Obtener todos los préstamos de la base de datos
export const getPrestamos = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar todos los préstamos ordenados por ID
    const [result] = await db.query("SELECT * FROM prestamos ORDER BY id ASC");
    
    // Devolver los resultados en formato JSON
    res.json(result);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un préstamo específico por ID
export const getPrestamo = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar un préstamo por su ID
    const [result] = await db.query("SELECT * FROM prestamos WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el préstamo no fue encontrado
    if (result.length === 0)
      return res.status(404).json({ message: "Préstamo no encontrado" });

    // Devolver el primer resultado (debería ser el único) en formato JSON
    res.json(result[0]);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo préstamo en la base de datos
export const createPrestamo = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { usuario_id, libro_id, suscriptor_id, fechaprestamo, fechadevolucion } = req.body;

    // Validar los datos de entrada
    if (!usuario_id || !libro_id || !suscriptor_id || !fechaprestamo || !fechadevolucion) {
      return res.status(400).json({ message: "Datos de entrada no válidos" });
    }

    // Ejecutar consulta para insertar un nuevo préstamo en la base de datos
    const [result] = await db.query(
      "INSERT INTO prestamos (usuario_id, libro_id, suscriptor_id, fechaprestamo, fechadevolucion) VALUES (?, ?, ?, ?, ?)",
      [usuario_id, libro_id, suscriptor_id, fechaprestamo, fechadevolucion]
    );

    // Devolver los detalles del préstamo creado en formato JSON
    res.json({
      id: result.insertId,
      usuario_id, 
      libro_id, 
      suscriptor_id, 
      fechaprestamo,
      fechadevolucion,
    });
  } catch (error) {
    // Manejar errores, registrar el error y devolver un código de estado 500 con un mensaje de error
    console.error("Error creando préstamo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un préstamo existente en la base de datos
export const updatePrestamo = async (req, res) => {
  try {
    // Ejecutar consulta para actualizar un préstamo por su ID
    const result = await db.query("UPDATE prestamos SET ? WHERE id = ?", [
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

// Eliminar un préstamo por ID de la base de datos
export const deletePrestamo = async (req, res) => {
  try {
    // Ejecutar consulta para eliminar un préstamo por su ID
    const [result] = await db.query("DELETE FROM prestamos WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el préstamo no fue encontrado
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Préstamo no encontrado" });

    // Devolver un código de estado 204 (Sin contenido) indicando que la operación fue exitosa
    return res.sendStatus(204);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};
