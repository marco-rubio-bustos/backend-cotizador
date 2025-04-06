import pool from "../config/db.js";

// Guardar un cliente en la base de datos
export const customerController = async (req, res) => {
  try {
    const { name, address, rut, attention, phone, email, notesGeneral } =
      req.body;

    if (
      !name ||
      !address ||
      !rut ||
      !attention ||
      !phone ||
      !email ||
      notesGeneral == null
    ) {
      return res.status(400).json({ error: "Hay campos obligatorios" });
    }

    const data = {
      name: name,
      address: address,
      rut: rut,
      attention: attention,
      phone: phone,
      email: email,
      notesGeneral: notesGeneral || null,
    };

    const [result] = await pool.query(
      "INSERT INTO customers (name, address, rut, attention, phone, email, notesGeneral) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.address,
        data.rut,
        data.attention,
        data.phone,
        data.email,
        data.notesGeneral,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      ...data,
    });
  } catch (error) {
    console.error("Error al guardar el cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
