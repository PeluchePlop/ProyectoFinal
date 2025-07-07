import React, { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import EmotionTracker from './components/EmotionTracker';
import RoutineList from './components/RoutineList';
import Summary from './components/Summary';
import Bienestar from './components/Bienestar';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [actividades, setActividades] = useState(() => {
    const guardadas = localStorage.getItem('actividades');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem('actividades', JSON.stringify(actividades));
  }, [actividades]);

  const agregarActividad = (actividad) => {
    setActividades([...actividades, { ...actividad, id: Date.now() }]);
  };

  const eliminarActividad = (id) => {
    setActividades(actividades.filter((act) => act.id !== id));
  };

  const actualizarActividad = (id, nuevaActividad) => {
    setActividades((prev) =>
      prev.map((act) => (act.id === id ? nuevaActividad : act))
    );
  };

  const borrarTodasLasActividades = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres borrar todas las actividades?");
    if (confirmar) {
      setActividades([]);
      localStorage.removeItem('actividades');
    }
  };

  return (
    <div className="app-container">
      <h1>🌿 Planificador de Bienestar</h1>

      <div className="section-box">
        <Bienestar />
      </div>

      <div className="section-box">
        <WeatherDisplay />
      </div>

      <div className="row">
        <div className="column section-box">
          <ActivityForm onAddActivity={agregarActividad} />
        </div>
        <div className="column section-box">
          <RoutineList
            actividades={actividades}
            onDelete={eliminarActividad}
            onUpdate={actualizarActividad}  // <-- Aquí se pasa la función para actualizar
          />
        </div>
      </div>

      <div className="section-box">
        <EmotionTracker />
      </div>

      <div className="footer-box">
        <Summary
          actividades={actividades}
          onClear={borrarTodasLasActividades}
        />
      </div>
    </div>
  );
};

export default App;

