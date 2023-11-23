import argon2 from 'argon2';
import Admin from '../models/admin.model.js';

const createAdmin = async (req, res) => {
  try {
    // Vérifier si l'administrateur existe déjà dans la base de données
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Un administrateur existe déjà.' });
    }

    // Récupérer le mot de passe défini dans la clé secrète
    const secretKey = process.env.SECRET_KEY;
    const password = secretKey; // Utilisez la clé secrète comme mot de passe pour l'administrateur

    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await argon2.hash(password);

    // Créer le nouvel administrateur dans la BDD avec le mot de passe défini dans la clé secrète
    await Admin.create({
      username: 'julien', // Définissez ici le nom d'utilisateur souhaité pour l'administrateur
      email: 'kaezersozeoff@gmail.com', // Définissez ici l'adresse e-mail souhaitée pour l'administrateur
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Administrateur créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur :', error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'administrateur.' });
  }
};

export { createAdmin };
