import argon2 from 'argon2';
import User from '../models/user.model.js';

// Créer un nouvel user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifie si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre utilisateur.' });
    }

    // Hasher le mot de passe 
    const hashedPassword = await argon2.hash(password);
    

    // Créer le nouvel utilisateur dans la BDD
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
};

export { createUser };
