import { Db } from "../db.js";

export const getPrestamos = async (req, res) => {
  try {
    const [result] = await Db.query(
      "SELECT * FROM prestamos ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPrestamo = async (req, res) => {
  try {
    const [result] = await Db.query("SELECT * FROM prestamos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "prestamo no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPrestamo = async (req, res) => {
  try {
    const { usuario_id, libro_id, suscriptor_id, fechaprestamo,fechadevolucion} = req.body;
    const [result] = await Db.query(
      "INSERT INTO prestamos (usuario_id, libro_id, suscriptor_id, fechaprestamo, fechadevolucion) VALUES (?, ?, ?, ?, ?)",
      [usuario_id, libro_id, suscriptor_id, fechaprestamo,fechadevolucion]
    );
    res.json({
      id: result.insertId,
      usuario_id, 
      libro_id, 
      suscriptor_id, 
      fechaprestamo,
      fechadevolucion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePrestamo = async (req, res) => {
  try {
    const result = await Db.query("UPDATE prestamos SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const  deletePrestamo = async (req, res) => {
  try {
    const [result] = await Db.query("DELETE FROM prestamos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "prestamo no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};