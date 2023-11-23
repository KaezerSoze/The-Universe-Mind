import { useState } from 'react';
import axios from 'axios';
import {  NavLink, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }
 
    navigate("/auth/users")
    
    
    try {
      const response = await axios.post('http://localhost:5020/auth/users', {
        username,
        email,
        password,
      });
      

      setMessage(response.data.message); // Succès ou message d'erreur
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Une erreur est survenue lors de l\'inscription.');
      }
  
    }
  };

  return (
    <div className='centered-container'>
    <div className='Form-container'>
      <h2 className='login'>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={!username ? 'error' : ''}
          />
          {!username && <span className='error-message'>Veuillez saisir un nom d'utilisateur !</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={!email ? 'error' : ''}
          />
          {!email && <span className='error-message'>Veuillez saisir une adresse email !</span>}
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={!password ? 'error' : ''}
          />
          {!password && <span className='error-message'>Veuillez saisir un mot de passe !</span>}
        </div>
        <button className= 'button'type="submit">S'inscrire</button>
        {message && <p>{message}</p>}
        <button className= 'button' as={NavLink} to="/auth/users">Connexion</button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
