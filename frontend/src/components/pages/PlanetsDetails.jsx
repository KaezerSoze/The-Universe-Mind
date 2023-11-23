import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function PlanetsDetails() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:5020/planets/${id}`)
      .then((response) => response.json())
      .then((res) => setData(res[0]))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <ul className="home-page_ul">
      {data !== undefined && (
        <li className="planet-card">
          <img src={data.image} alt={data.name} />
          <NavLink to="/home" className="back-link">
            <FaArrowLeft />
            <span> 🛰️ Retour 🛰️</span>
          </NavLink>
          <div className="planet-name">
          <p>Name: {data.name}</p>
          <p>Radius: {data.radius}</p>
          <p>Mass: {data.mass}</p>
          <p>Distance from Sun: {data.distanceFromSun}</p>
          </div>
        </li>
      )}
    </ul>
  );
}

export default PlanetsDetails;
