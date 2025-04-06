import pool from "../config/db.js";

// Obtener cotizaciones con paginación
export const getQuotation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [quotation] = await pool.query(
      "SELECT * FROM quotation LIMIT ? OFFSET ?",
      [limit, offset]
    );

    const [total] = await pool.query("SELECT COUNT(*) AS count FROM quotation");
    const totalItems = total[0].count;

    //  **Asegurar que se devuelve un objeto con la clave `quotation`**
    res.json({
      quotation: quotation, // 👈 Ahora está dentro de un objeto
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
