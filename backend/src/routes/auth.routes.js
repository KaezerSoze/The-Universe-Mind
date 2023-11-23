import express from 'express';
import dotenv from "dotenv";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

dotenv.config();

const router = express.Router();

// Fonction pour générer un token JWT
const generateJWT = (userId) => {
  // Créez le token avec l'ID de l'utilisateur et votre clé secrète
  const token = jwt.sign({ user: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
  return token;
}; 

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  hashLength: 50,
  paralellism: 1,
};

// Route pour l'inscription d'un nouvel utilisateur
router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Voici mon existingUser", existingUser)

      return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre utilisateur.' });
    }

    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await argon2.hash(password, hashingOptions);
    console.log("Voici mon hashed", hashedPassword)

    // Créer le nouvel utilisateur dans la BDD
    const newUser = await User.createUser(username, email, hashedPassword);
    console.log("Voici mon user", newUser)

    // Générer un token JWT pour l'utilisateur nouvellement créé
    const token = generateJWT(newUser.id);

    return res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser, token });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
});

// Route pour la connexion de l'utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'Cet email n\'existe pas dans la base de données.' });
    }

    // Vérifier le mot de passe en comparant le mot de passe fourni avec le mot de passe haché stocké
    console.log(existingUser)
    const isPasswordValid = await argon2.verify(existingUser.password, password, hashingOptions);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT pour l'utilisateur authentifié
    const token = generateJWT(existingUser.id);

    return res.status(200).json({ message: 'Authentification réussie.', user: existingUser, token });
  } catch (error) {
    console.error('Erreur lors de l\'authentification de l\'utilisateur :', error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de l\'authentification de l\'utilisateur.' });
  }
});

export default router;
