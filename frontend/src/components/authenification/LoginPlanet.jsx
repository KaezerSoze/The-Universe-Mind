import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    
    
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5020/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
  
     
    
      
      setIsLoggedIn(true);

      
      navigate("/welcome"); 
      
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de la connexion.');
      }
    }
  };
  
  return (
    <div className='centered-container'>
    <div className='planet-form'>
      <h3>Connexion</h3>
      <form onSubmit={handleLogin}>
        <div className='form-group'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {!email && <span className='error-message'>Veuillez saisir une adresse email.</span>}
        </div>
        <div className='form-group'>
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {!password && <span className='error-message'>Veuillez saisir un mot de passe.</span>}
        </div>
        <button className='button'type="submit">Se connecter</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
