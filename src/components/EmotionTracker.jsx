import React, { useState, useEffect } from 'react';
import './EmotionTracker.css';

const emociones = [
  { nombre: 'Feliz', emoji: '😊' },
  { nombre: 'Neutral', emoji: '😐' },
  { nombre: 'Triste', emoji: '😢' },
  { nombre: 'Enojado', emoji: '😡' },
  { nombre: 'Cansado', emoji: '😴' },
  { nombre: 'Amado', emoji: '🥰' },
  { nombre: 'Estresado', emoji: '🤯' },
  { nombre: 'Relajado', emoji: '😌' }
];

const EMOCIONES_KEY = 'emociones';

const EmotionTracker = () => {
  const [emocionSeleccionada, setEmocionSeleccionada] = useState('');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem(EMOCIONES_KEY);
    if (datos) setHistorial(JSON.parse(datos));
  }, []);

  useEffect(() => {
    localStorage.setItem(EMOCIONES_KEY, JSON.stringify(historial));
  }, [historial]);

  const registrarEmocion = () => {
    if (!emocionSeleccionada) return;

    const ahora = new Date();
    const fecha = ahora.toLocaleDateString();
    const hora = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const nuevaEntrada = {
      fecha,
      hora,
      emocion: emocionSeleccionada
    };

    setHistorial([...historial, nuevaEntrada]);
    setEmocionSeleccionada('');
  };

  return (
    <div className="emotion-box">
      <h3>¿Cómo te sientes hoy?</h3>

      <div className="emoji-grid">
        {emociones.map((e) => (
          <button
            key={e.nombre}
            className={`emoji-button ${emocionSeleccionada === e.nombre ? 'selected' : ''}`}
            onClick={() => setEmocionSeleccionada(e.nombre)}
          >
            <span className="emoji-icon">{e.emoji}</span>
            <span className="emoji-label">{e.nombre}</span>
          </button>
        ))}
      </div>

      <button
        className="emotion-button"
        onClick={registrarEmocion}
        disabled={!emocionSeleccionada}
      >
        Registrar
      </button>

      <div className="emotion-history">
        <h4>Historial Emocional</h4>
        {historial.length === 0 ? (
          <p className="no-history">No hay emociones registradas aún.</p>
        ) : (
          <ul>
            {historial.map((item, index) => (
              <li key={index} className="history-item">
                <span className="fecha">{item.fecha} - {item.hora}</span>
                <span className="emocion">{item.emocion}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmotionTracker;
