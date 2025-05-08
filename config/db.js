import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function connectToDatabase() {
  let connection;

  try {
    console.log("Intentando conexión con cPanel...");
    connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const testConnection = await connection.getConnection();
    console.log("✅ Conectado a MySQL en cPanel 🚀");
    testConnection.release();
  } catch (err) {
    console.error("❌ Error al conectar a MySQL en cPanel:", err);
    console.log("⚠️ Intentando conexión local...");

    try {
      connection = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      const testLocalConnection = await connection.getConnection();
      console.log("✅ Conectado a MySQL Local (XAMPP) 🚀");
      testLocalConnection.release();
    } catch (errLocal) {
      console.error("❌ Error al conectar a MySQL Local:", errLocal);
      process.exit(1); // Si ninguna conexión funciona, se cierra la aplicación
    }
  }

  return connection;
}

const pool = await connectToDatabase();
export default pool;
