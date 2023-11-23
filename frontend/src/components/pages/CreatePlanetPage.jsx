import axios from "axios";
import { useState, useEffect } from 'react';
import PlanetForm from "../pages/CreatePlanet"

const CreatePlanetPage = () => {
  // Définir l'état pour stocker la liste des planètes
  const [planets, setPlanets] = useState([]);

  // Fonction pour récupérer les planètes depuis le serveur
  const fetchPlanets = async () => {
    try {
      const response = await axios.get('http://localhost:5020/planets');
      setPlanets(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des planètes:', error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []); // Utilisez une dépendance vide pour ne récupérer les planètes qu'une seule fois lors du montage du composant

  return (
    <div>
      <PlanetForm planets={planets} fetchPlanets={fetchPlanets} />
    </div>
  );
};

export default CreatePlanetPage;
