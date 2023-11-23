import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlanetsCard({ id, name, radius, mass, distanceFromSun, image, fetchPlanets }) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [planetData, setPlanetData] = useState({
    name: name,
    radius: radius,
    mass: mass,
    distanceFromSun: distanceFromSun,
    image: image,
  });

  

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Effectue la mise à jour en envoyant la requête PUT au serveur avec les nouvelles données
      await axios.put(`http://localhost:5020/planets/${id}`, planetData);
      console.log('Planète mise à jour');

      // Sortir du mode d'édition
      setEditMode(false);

      // permet de mettre à jour la liste des planètes
      fetchPlanets();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la planète:', error);
    }
  };

  const handleDelete = async () => {
    try {
      //permet d'effectuer la requête DELETE au serveur pour supprimer la planète
      await axios.delete(`http://localhost:5020/planets/${id}`);
      console.log('Planète supprimée');

    } catch (error) {
      console.error('Erreur lors de la suppression de la planète:', error);
    }
  };
  
  
  return (
    <li className="planet-card" >
      <NavLink to={`/planets/${id}`}>
        <img src={image} alt={name} />
        <p>{name}</p>
      </NavLink>
      {editMode ? (
        <div className="planet-details">
          <input
            type="text"
            name="name"
            value={planetData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="radius"
            value={planetData.radius}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mass"
            value={planetData.mass}
            onChange={handleChange}
          />
          <input
            type="text"
            name="distanceFromSun"
            value={planetData.distanceFromSun}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            value={planetData.image}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Enregistrer</button>
        </div>
      ) : (
        <div className="planet-details">
          <h2>{name}</h2>
          <button onClick={handleEdit}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}
    </li>
  );
}

export default PlanetsCard;
