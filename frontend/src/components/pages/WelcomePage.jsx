import { NavLink } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1>🧞‍♂️ Bienvenue à vous,  Cher créateur ! 🧞‍♂️</h1>
      <NavLink to="/home">
        <button>Explorer </button>
      </NavLink>
    </div>
  );
}

export default WelcomePage;
