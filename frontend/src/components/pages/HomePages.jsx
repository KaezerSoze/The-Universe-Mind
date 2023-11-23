import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlanetsCard from "../PlanetsCard";

function HomePages() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Select");

  useEffect(() => {
    fetch("http://localhost:5020/planets")
      .then((response) => response.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  function handleChange(e) {
    setSelectedValue(e.target.value);
  }

  return (
    <main className="home-page">
     <div className="create-planet-link">
        <Link to="/create-planet">
        
          <p> 🚀 Créer ton Univers 🚀 </p>
        </Link>
        
      </div>
      <select className="home-page_select" onChange={handleChange}>
        <option>🌎 Selectionne Ton Monde 🌎</option>
        {data &&
          data.map((el) => (
            <option key={el.id}>{el.name}</option>
          ))}
      </select>
      <ul className="home-page_ul">
        {data &&
          data
            .filter(
              (el) =>
                selectedValue === "Select" || selectedValue === el.name
            )
            .map((el) => (
              <PlanetsCard
                id={el.id}
                key={el.id}
                name={el.name}
                radius={el.radius}
                mass={el.mass}
                distanceFromSun={el.distanceFromSun}
                image={el.image}
                fetchPlanets={() => {}} // Assurez-vous de passer correctement la fonction fetchPlanets ici
              />
            ))}
      </ul>
    </main>
  );
}

export default HomePages;
