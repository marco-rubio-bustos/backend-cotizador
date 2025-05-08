import pool from "../config/db.js";

// Obtener cotizaciones con paginación
export const getQuotation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 100; // Número de elementos por página, por defecto 10
    const offset = (page - 1) * limit;

    const [quotation] = await pool.query(
      "SELECT * FROM quotation ORDER BY id DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    const [total] = await pool.query("SELECT COUNT(*) AS count FROM quotation");
    const totalItems = total[0].count;

    /////////////////////////////////////////////////////
    // Obtener el último id en la tabla quotation
    const [lastQuotation] = await pool.query(
      "SELECT id FROM quotation ORDER BY id DESC LIMIT 1"
    );
    const lastId = lastQuotation.length > 0 ? lastQuotation[0].id : null;

    //  **Asegurar que se devuelve un objeto con la clave `quotation`**
    res.json({
      quotation: quotation, // Ahora está dentro de un objeto
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      lastId,
    });
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
