import { Db } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [result] = await Db.query(
      "SELECT * FROM usuarios ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [result] = await Db.query("SELECT * FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Libro no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const {nombre, password_hash} = req.body;
    const [result] = await Db.query(
      "INSERT INTO usuarios(nombre, password_hash) VALUES (?, ?)",
      [nombre, password_hash]
    );
    res.json({
      id: result.insertId,
      nombre, 
      password_hash
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const result = await Db.query("UPDATE usuario SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const  deleteUsuario = async (req, res) => {
  try {
    const [result] = await Db.query("DELETE FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "usuario  no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};