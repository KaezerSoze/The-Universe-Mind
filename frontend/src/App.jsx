import { useState } from 'react';
import NavBar from './components/globals/NavBar';
import Router from './components/navigation/Router';
import StarField from './components/pages/StarField';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <StarField numStars={50} />
      <Router isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}   />
    </div>
  );
}

export default App;
