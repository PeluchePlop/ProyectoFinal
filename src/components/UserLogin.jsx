import React, { useState } from 'react';
import './UserLogin.css';
import { avatars } from '../assets/avatars/avatars';

const UserLogin = () => {
  const [nombre, setNombre] = useState('');
  const [avatar, setAvatar] = useState(avatars[0].id);
  const [guardado, setGuardado] = useState(null);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') return;
    const avatarObj = avatars.find(a => a.id === avatar);
    setGuardado({ nombre, avatar: avatarObj });
    setNombre('');
  };

  return (
    <div className="user-login-container">
      {guardado ? (
        <div className="user-greeting">
          <img src={guardado.avatar.img} alt={guardado.avatar.name} className="avatar-img" />
          <h2>👋 Hola, {guardado.nombre}</h2>
        </div>
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
          <label>Elige tu personaje:</label>
          <div className="avatar-options">
            {avatars.map((a) => (
              <label key={a.id} className={`avatar-option${avatar === a.id ? ' selected' : ''}`}>
                <input
                  type="radio"
                  name="avatar"
                  value={a.id}
                  checked={avatar === a.id}
                  onChange={() => setAvatar(a.id)}
                  style={{ display: 'none' }}
                />
                <img src={a.img} alt={a.name} className="avatar-img-small" />
                <div>{a.name}</div>
              </label>
            ))}
          </div>
          <button type="submit" className="user-button">Ingresar</button>
        </form>
      )}
    </div>
  );
};

export default UserLogin;
