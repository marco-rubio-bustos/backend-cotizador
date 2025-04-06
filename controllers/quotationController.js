import pool from "../config/db.js";

// Guardar una cotización en la base de datos
export const quotationController = async (req, res) => {
  try {
    const {
      name,
      address,
      rut,
      attention,
      phone,
      email,
      notesGeneral,
      description,
      qty,
      priceUnit,
      total,
      notes,
    } = req.body;

    if (!description || qty == null || priceUnit == null || total == null) {
      return res.status(400).json({ error: "Hay campos obligatorios" });
    }

    const data = {
      name: name || null,
      address: address || null,
      rut: rut || null,
      attention: attention || null,
      phone: phone || null,
      email: email || null,
      notesGeneral: notesGeneral || null,
      description: description,
      qty: qty,
      priceUnit: priceUnit,
      total: total,
      notes: notes || null,
    };

    const [result] = await pool.query(
      "INSERT INTO quotation (name, address, rut, attention, phone, email, notesGeneral, description, qty, priceUnit, total, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.address,
        data.rut,
        data.attention,
        data.phone,
        data.email,
        data.notesGeneral,
        data.description,
        data.qty,
        data.priceUnit,
        data.total,
        data.notes,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      ...data,
    });
  } catch (error) {
    console.error("Error al guardar la cotización:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// CREATE TABLE quotation (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255),
//   address VARCHAR(255),
//   rut VARCHAR(255),
//   attention VARCHAR(255),
//   phone VARCHAR(255),
//   email VARCHAR(255),
//   notesGeneral TEXT
//   description  VARCHAR(255),
//   qty  VARCHAR(255),
//   priceUnit  VARCHAR(255),
//   total  VARCHAR(255),
//   notes TEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );

// ALTER TABLE quotation
// ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY,
// ADD COLUMN description VARCHAR(255),
