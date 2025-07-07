import React, { useState, useEffect } from 'react';
import './EmotionTracker.css';

const EMOCIONES_KEY = 'emociones';

const emociones = ['😊 Feliz', '😐 Neutral', '😢 Triste', '😡 Enojado', '😴 Cansado'];

const EmotionTracker = () => {
  const [emocion, setEmocion] = useState('');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem(EMOCIONES_KEY);
    if (datos) setHistorial(JSON.parse(datos));
  }, []);

  useEffect(() => {
    localStorage.setItem(EMOCIONES_KEY, JSON.stringify(historial));
  }, [historial]);

  const registrarEmocion = () => {
    if (!emocion) return;

    const hoy = new Date().toLocaleDateString();
    const nuevaEntrada = { fecha: hoy, emocion };

    setHistorial([...historial, nuevaEntrada]);
    setEmocion('');
  };

  return (
    <div className="emotion-box">
      <h3>¿Cómo te sientes hoy?</h3>

      <select
        value={emocion}
        onChange={(e) => setEmocion(e.target.value)}
        className="emotion-select"
        aria-label="Selecciona una emoción"
      >
        <option value="">Selecciona una emoción</option>
        {emociones.map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>

      <button
        className="emotion-button"
        onClick={registrarEmocion}
        disabled={!emocion}
        aria-disabled={!emocion}
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
                <span className="fecha">{item.fecha}</span>
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


