import dotenv from "dotenv"; // Module pour charger les variables d'environnement depuis un fichier .env
import mysql from "mysql2"; // Module pour se connecter à une base de données MySQL
import fs from "fs"; // Module pour lire des fichiers

dotenv.config(); // Charge les variables d'environnement à partir du fichier .env

const database = mysql.createPool({
    host: process.env.DB_HOST, // Variable d'environnement pour l'hôte de la base de données
    port: process.env.DB_PORT, // Variable d'environnement pour le port de la base de données
    user: process.env.DB_USER, // Variable d'environnement pour le nom d'utilisateur de la base de données
    password: process.env.DB_PASSWORD, // Variable d'environnement pour le mot de passe de la base de données
    database: process.env.DB_NAME,// Variable d'environnement pour le nom de la base de données
    multipleStatements:true,
});

database.getConnection((error, connection) => {
    if (error) {
        console.error("Impossible to reach the database", error); // Affiche une erreur si la connexion échoue
        return;
    }
    console.log("Success!"); // Affiche un message de succès si la connexion est établie avec succès

    const sqlFile = fs.readFileSync("./script.sql", "utf-8"); // Lit le contenu du fichier .script.sql

    connection.query(sqlFile, (error) => {
        if (error) {
            console.error("Impossible to add data to the database", error); // Affiche une erreur si l'exécution de la requête échoue
            return;
        }
        console.log("Success, the data has been added to the database"); // Affiche un message de succès si la requête est exécutée avec succès

        connection.release(); // Libère la connexion à la base de données
    });
});
