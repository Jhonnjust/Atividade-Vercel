import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // alterado aqui
import 'firebase/compat/auth'; // alterado aqui
import './styles/styles.css';
import logo from'./governo_etec.png';

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAV9V6_E47EGHJDZRUtDL7GMWYROvDEiNY",
  authDomain: "projetopw-e2614.firebaseapp.com",
  // adicione outras configurações do Firebase aqui
};

// Initialize Firebase app (if not already done)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setError(null);
      setUser(null);
      // Optionally, redirect to login page after logout
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container"> {/* Use className for CSS */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" /> {}
        <h1>Firebase Authentication</h1>
      </header>
      <main className="main-content">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <div className="button-container">
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
          <button onClick={handleGoogleLogin} className="google-login-button">
            Login with Google
          </button>
          {user && <button onClick={handleLogout} className="logout-button">SAIR</button>} {/* Logout button for logged-in users */}
        </div>
        {error && <p className="error-message">{error}</p>}
        {user && (
          <div className="user-info">
            <h2>Dados do Usuário:</h2>
            <p>Nome: {user.displayName || 'Não fornecido'}</p>
            <p>Email: {user.email}</p>
            <p>ID do Usuário: {user.uid}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
