import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

(async () => {
  try {
    const connection = await database.getConnection();
    console.log("Success! Connected to the database");
    connection.release();
  } catch (error) {
    console.error("Impossible to reach the database", error);
  }
})();

export default database;
