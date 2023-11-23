import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const PlanetForm = ({ planets, fetchPlanets }) => {
  const navigate = useNavigate();
  const [planetData, setPlanetData] = useState({
    name: '',
    radius: '',
    mass: '',
    distanceFromSun: '',
    image: '',
  });

  // Ajout d'un état pour stocker l'ID de la planète sélectionnée pour la mise à jour
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  useEffect(() => {
    fetchPlanets();
  }, [planets, fetchPlanets]);

  const handleChange = (e) => {
    setPlanetData((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vous pouvez récupérer le JWT du localStorage ici
      const jwt = localStorage.getItem('jwt');

      // Configurer les headers de la requête avec le JWT
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      // Si l'ID de la planète sélectionnée est défini, cela signifie que nous mettons à jour la planète
      if (selectedPlanetId) {
        const response = await axios.put(`http://localhost:5020/planets/${selectedPlanetId}`, planetData, config);
        console.log('Planète mise à jour:', response.data);
      } else {
        // Sinon, nous créons une nouvelle planète
        const response = await axios.post('http://localhost:5020/planets', planetData, config);
        console.log('Nouvelle planète créée:', response.data);
      }

      // Réinitialiser le formulaire après la soumission
      setPlanetData({
        name: '',
        radius: '',
        mass: '',
        distanceFromSun: '',
        image: '',
      });

      // Réinitialiser l'ID de la planète sélectionnée
      setSelectedPlanetId(null);

      // Mettre à jour la liste des planètes
      // fetchPlanets();
      setTimeout(() => {
        navigate("/")
      }, 1000)

    } catch (error) {
      console.error('Erreur lors de la création ou de la mise à jour de la planète:', error);
    }
  };

  return (
    <div className="planet-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input type="text" name="name" value={planetData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Radius :</label>
          <input type="text" name="radius" value={planetData.radius} onChange={handleChange} />
        </div>
        <div>
          <label>Mass :</label>
          <input type="text" name="mass" value={planetData.mass} onChange={handleChange} />
        </div>
        <div>
          <label>Distance from sun :</label>
          <input type="text" name="distanceFromSun" value={planetData.distanceFromSun} onChange={handleChange} />
        </div>
        <div>
          <label>Image :</label>
          <input type="text" name="image" value={planetData.image} onChange={handleChange} />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default PlanetForm;
