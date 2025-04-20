import pool from "../config/db.js";

// Obtener getQuotationItems
export const getQuotationItems = async (req, res) => {
  try {
    const [quotationItems] = await pool.query("SELECT * FROM quotationprice ");

    //  **Asegurar que se devuelve un objeto con la clave `customers`**
    res.json({
      quotationItems: quotationItems,
    });
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
