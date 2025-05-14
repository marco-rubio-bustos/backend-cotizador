import pool from "../config/db.js";

export const updateCustomerController = async (req, res) => {
  try {
    console.log(
      "Solicitud recibida para actualizar cliente con ID:",
      req.params.id
    );

    const { id } = req.params;
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

    const [result] = await pool.query(
      "UPDATE customers SET name = ?, address = ?, rut = ?, attention = ?, phone = ?, email = ?, notesGeneral = ? WHERE id = ?",
      [name, address, rut, attention, phone, email, notesGeneral, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res
      .status(500)
      .json({ error: "Error en el servidor", details: error.message });
  }
};
