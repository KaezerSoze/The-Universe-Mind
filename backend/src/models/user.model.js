// user.model.js

import database from '../datasource.js';
import argon2 from 'argon2';

const User = {
  async createUser(username, email, password) {
    try {
      // Vérifier si l'utilisateur existe déjà dans la base de données
      const existingUser = await database.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser[0].length) {
        return { error: 'Cet email est déjà utilisé par un autre utilisateur.' };
      }


      // Créer le nouvel utilisateur dans la BDD
      const newUser = await database.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

      return { message: 'Utilisateur créé avec succès.', user: newUser[0] };
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      return { error: 'Une erreur est survenue lors de la création de l\'utilisateur.' };
    }
  },

  async findOne(condition) {
    try {
      const query = 'SELECT * FROM users WHERE ?';
      const [result] = await database.query(query, condition);
      return result.length ? result[0] : null;
    } catch (error) {
      console.error('Erreur lors de la recherche de l\'utilisateur :', error);
      return null;
    }
  },
};

export default User;
