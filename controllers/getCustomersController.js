import pool from "../config/db.js";

// Obtener clientes con paginación
export const getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    //const [customers] = await pool.query("SELECT * FROM customers");
    let customers = [];
    // Dependerá del front para mostrar todos o algunos
    if (req.query.all === "true") {
      [customers] = await pool.query("SELECT * FROM customers");
    } else {
      [customers] = await pool.query(
        "SELECT * FROM customers LIMIT ? OFFSET ?",
        [limit, offset]
      );
    }

    const [total] = await pool.query("SELECT COUNT(*) AS count FROM customers");
    const totalItems = total[0].count;

    //  **Asegurar que se devuelve un objeto con la clave `customers`**
    res.json({
      customers: customers, // 👈 Ahora está dentro de un objeto
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
