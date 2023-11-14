import { db } from "../db.js";

// Obtener todos los libros de la base de datos
export const getLibros = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar todos los libros ordenados por ID
    const [result] = await db.query("SELECT * FROM libros ORDER BY id ASC");
    
    // Devolver los resultados en formato JSON
    res.json(result);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un libro específico por ID
export const getLibro = async (req, res) => {
  try {
    // Ejecutar consulta para seleccionar un libro por su ID
    const [result] = await db.query("SELECT * FROM libros WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el libro no fue encontrado
    if (result.length === 0)
      return res.status(404).json({ message: "Libro no encontrado" });

    // Devolver el primer resultado (debería ser el único) en formato JSON
    res.json(result[0]);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo libro en la base de datos
export const createLibro = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { codigo, titulo, autor, disponible } = req.body;

    // Validar los datos de entrada
    if (!codigo || !titulo || !autor || disponible === undefined) {
      return res.status(400).json({ message: "Datos de entrada no válidos" });
    }

    // Ejecutar consulta para insertar un nuevo libro en la base de datos
    const [result] = await db.query(
      "INSERT INTO libros (codigo, titulo, autor, disponible) VALUES (?, ?, ?, ?)",
      [codigo, titulo, autor, disponible]
    );

    // Devolver los detalles del libro creado en formato JSON
    res.json({
      id: result.insertId,
      codigo,
      titulo,
      autor,
      disponible,
    });
  } catch (error) {
    // Manejar errores, registrar el error y devolver un código de estado 500 con un mensaje de error
    console.error("Error creando libro:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un libro existente en la base de datos
export const updateLibro = async (req, res) => {
  try {
    // Ejecutar consulta para actualizar un libro por su ID
    const result = await db.query("UPDATE libros SET ? WHERE id = ?", [
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

// Eliminar un libro por ID de la base de datos
export const deleteLibro = async (req, res) => {
  try {
    // Ejecutar consulta para eliminar un libro por su ID
    const [result] = await db.query("DELETE FROM libros WHERE id = ?", [
      req.params.id,
    ]);

    // Verificar si el libro no fue encontrado
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Libro no encontrado" });

    // Devolver un código de estado 204 (Sin contenido) indicando que la operación fue exitosa
    return res.sendStatus(204);
  } catch (error) {
    // Manejar errores y devolver un código de estado 500 con un mensaje de error
    return res.status(500).json({ message: error.message });
  }
};
