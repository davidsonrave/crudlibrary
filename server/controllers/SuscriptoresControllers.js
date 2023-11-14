import { Db } from "../db.js";

export const getSuscriptores = async (req, res) => {
  try {
    const [result] = await Db.query(
      "SELECT * FROM suscriptores ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSuscriptor = async (req, res) => {
  try {
    const [result] = await Db.query("SELECT * FROM suscriptores WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "suscriptor no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSuscriptor = async (req, res) => {
  try {
    const { documento, nombre, direccion } = req.body;
    const [result] = await Db.query(
      "INSERT INTO suscriptores (documento, nombre, direccion) VALUES (?, ?, ?)",
      [documento, nombre, direccion]
    );
    res.json({
      id: result.insertId,
      documento, 
      nombre, 
      direccion
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSuscriptor = async (req, res) => {
  try {
    const result = await Db.query("UPDATE suscriptores SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const  deleteSuscriptor = async (req, res) => {
  try {
    const [result] = await Db.query("DELETE FROM suscriptores WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "suscriptores no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};