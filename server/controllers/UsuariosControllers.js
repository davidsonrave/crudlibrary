import { db } from "../db.js";

// Obtener todos los usuarios de la base de datos
export const getUsuarios = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar todos los usuarios ordenados por ID
    const [result] = await db.query("SELECT * FROM usuarios ORDER BY id ASC");
    
    // Devolver los resultados en formato JSON
    res.json(result);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario específico por ID
export const getUsuario = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar un usuario por su ID
    const [result] = await db.query("SELECT * FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el usuario no fue encontrado
    if (result.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Devolver el primer resultado (debería ser el único) en formato JSON
    res.json(result[0]);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario en la base de datos
export const createUsuario = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombre, password_hash } = req.body;

    // Validar los datos de entrada
    if (!nombre || !password_hash) {
      return res.status(400).json({ message: "Datos de entrada no válidos" });
    }

    // Ejecutar consulta para insertar un nuevo usuario en la base de datos
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, password_hash) VALUES (?, ?)",
      [nombre, password_hash]
    );

    // Devolver los detalles del usuario creado en formato JSON
    res.json({
      id: result.insertId,
      nombre, 
      password_hash,
    });
  } catch (error) {
    // Manejar errores, registrar el error y devolver un código de estado 500 con un mensaje de error
    console.error("Error creando usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un usuario existente en la base de datos
export const updateUsuario = async (req, res) => {
  try {
    // Ejecutar consulta para actualizar un usuario por su ID
    const result = await db.query("UPDATE usuarios SET ? WHERE id = ?", [
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

// Eliminar un usuario por ID de la base de datos
export const deleteUsuario = async (req, res) => {
  try {
    // Ejecutar consulta para eliminar un usuario por su ID
    const [result] = await db.query("DELETE FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el usuario no fue encontrado
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Devolver un código de estado 204 (Sin contenido) indicando que la operación fue exitosa
    return res.sendStatus(204);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};
