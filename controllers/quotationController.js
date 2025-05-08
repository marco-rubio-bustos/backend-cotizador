import pool from "../config/db.js";

// Guardar una cotización en la base de datos
export const quotationController = async (req, res) => {
  try {
    const {
      createdCustomer,
      name,
      address,
      rut,
      attention,
      phone,
      email,
      subTotal,
      iva,
      total,
      notesGeneral,
      quotations,
    } = req.body;

    if (!name || !address || !rut || !attention || !phone || !email) {
      return res
        .status(400)
        .json({ error: "Hay campos obligatorios faltantes" });
    }

    // Extraemos los campos dentro de getCustomerData
    // const { name, address, rut, attention, phone, email, notesGeneral } =
    //   getCustomerData;

    // Construimos el objeto con toda la información
    const data = {
      createdCustomer: createdCustomer || null,
      name: name || null,
      address: address || null,
      rut: rut || null,
      attention: attention || null,
      phone: phone || null,
      email: email || null,
      subTotal: subTotal || null,
      iva: iva || null,
      total: total || null,
      notesGeneral: notesGeneral || null,
    };

    // Consulta SQL para guardar la cotización y los datos del cliente
    const [quotationResult] = await pool.query(
      "INSERT INTO quotation (createdCustomer, name, address, rut, attention, phone, email, subTotal, iva, total, notesGeneral) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.createdCustomer,
        data.name,
        data.address,
        data.rut,
        data.attention,
        data.phone,
        data.email,
        data.subTotal,
        data.iva,
        data.total,
        data.notesGeneral,
      ]
    );

    const quotationId = quotationResult.insertId;

    // Insertar en la tabla quotationPrice
    for (const item of quotations) {
      await pool.query(
        "INSERT INTO quotationprice (idPrice, description, qty, priceUnit, total, notes) VALUES (?, ?, ?, ?, ?, ?)",
        [
          quotationId,
          item.description,
          item.qty,
          item.priceUnit,
          item.total,
          item.notes,
        ]
      );
    }

    res.status(201).json({
      id: quotationResult.insertId,
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

// ALTER TABLE nombre_de_la_tabla CHANGE nombre_antiguo nombre_nuevo varchar(225);

// ALTER TABLE quotation MODIFY COLUMN subTotal varchar(225) AFTER email;

// name, address, rut, attention, phone, email, subTotal, iva, total, notesGeneral

// ALTER TABLE clientes DROP COLUMN telefono;

// UPDATE quotation
// SET createdCustomer = 6
// WHERE name = 'asdssss';

// TRUNCATE TABLE nombre_de_tu_tabla;
