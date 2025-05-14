import express from "express";
import cors from "cors";
import updateCustomersRoutes from "./routes/updateCustomersRoutes.js";
import customersRoutes from "./routes/customersRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import getCustomersRoutes from "./routes/getCustomersRoutes.js";
import getQuotationRoutes from "./routes/getQuotationRoutes.js";
import getQuotationItemsRoutes from "./routes/getQuotationItemsRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // Permite recibir JSON en las peticiones
// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send(`Servidor funcionando correctamente`);
});

// Rutas para la API
app.use("/api/customers/update", updateCustomersRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/quotationItems", getQuotationItemsRoutes);
app.use("/api/quotation", getQuotationRoutes);
app.use("/api/customers/get", getCustomersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo`);
});
