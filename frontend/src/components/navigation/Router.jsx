// components/navigation/Router.js
import { Route, Routes } from "react-router-dom";
import HomePages from "../pages/HomePages";
import PlanetsDetails from "../pages/PlanetsDetails";
import CreatePlanetPage from "../pages/CreatePlanetPage"; // Import the new component
import WelcomePage from "../pages/WelcomePage";
import LoginForm from "../authenification/LoginPlanet";
import RegistrationForm from "../authenification/FormPlanet";



export default function Router({isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
    <Route path="/" element={<RegistrationForm />} />
    <Route path="/auth/users" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
       <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/home" element={<HomePages />} />
      
      <Route path="/planets/:id" element={<PlanetsDetails />} />
      <Route path="/create-planet" element={<CreatePlanetPage />} /> {/* Add this route for the creation page */}
    </Routes>
  );
}
