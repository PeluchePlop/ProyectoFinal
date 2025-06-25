import React, { useState, useEffect } from 'react';

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
    <div className="mt-5">
      <h4>¿Cómo te sientes hoy?</h4>
      <select
        className="form-select my-2"
        value={emocion}
        onChange={(e) => setEmocion(e.target.value)}
      >
        <option value="">Selecciona una emoción</option>
        {emociones.map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>
      <button className="btn btn-success" onClick={registrarEmocion}>Registrar</button>

      <div className="mt-3">
        <h5>Historial Emocional</h5>
        <ul className="list-group">
          {historial.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.fecha} - {item.emocion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmotionTracker;
