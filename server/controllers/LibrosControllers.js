import { Db } from "../db.js";

export const getLibros = async (req, res) => {
  try {
    const [result] = await Db.query(
      "SELECT * FROM libros ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLibro = async (req, res) => {
  try {
    const [result] = await Db.query("SELECT * FROM libros WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Libro no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createLibro = async (req, res) => {
  try {
    const { codigo, titulo, autor, disponible } = req.body;

    // Validación
    if (!codigo || !titulo || !autor || disponible === undefined) {
      return res.status(400).json({ message: "Datos de entrada no válidos" });
    }

    const [result] = await Db.query(
      "INSERT INTO libros (codigo, titulo, autor, disponible) VALUES (?, ?, ?, ?)",
      [codigo, titulo, autor, disponible]
    );

    res.json({
      id: result.insertId,
      codigo,
      titulo,
      autor,
      disponible,
    });
  } catch (error) {
    console.error("Error creando libro:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const updateLibro = async (req, res) => {
  try {
    const result = await Db.query("UPDATE libros SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const  deleteLibro = async (req, res) => {
  try {
    const [result] = await Db.query("DELETE FROM libros WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Libro no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};