import React, { useState } from 'react';
import './UserLogin.css'; // Asegúrate de tener este archivo CSS

const UserLogin = () => {
  const [nombre, setNombre] = useState('');
  const [guardado, setGuardado] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') return;
    setGuardado(nombre);
    setNombre('');
  };

  return (
    <div className="user-login-container">
      {guardado ? (
        <h2 className="user-greeting">👋 Hola, {guardado}</h2>
      ) : (
        <form onSubmit={manejarEnvio} className="user-form">
          <label htmlFor="nombre">¿Cómo te llamas?</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre..."
            className="user-input"
          />
          <button type="submit" className="user-button">Ingresar</button>
        </form>
      )}
    </div>
  );
};

export default UserLogin;
