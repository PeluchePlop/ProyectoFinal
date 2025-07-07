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

  const [ciudad, setCiudad] = useState("Puerto Montt");
  const [weatherError, setWeatherError] = useState(null);


  useEffect(() => {
    localStorage.setItem('actividades', JSON.stringify(actividades));
  }, [actividades]);


  useEffect(() => {
    if (import.meta.env.VITE_WEATHER_API_KEY) {
      console.log("API Key cargada correctamente");
    } else {
      console.error("API Key no encontrada en .env");
      setWeatherError("Error de configuración del clima");
    }
  }, []);


  const agregarActividad = (actividad) => {
    setActividades([...actividades, { ...actividad, id: Date.now() }]);
  };

  const eliminarActividad = (id) => {
    setActividades(actividades.filter((act) => act.id !== id));
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

      {weatherError && (
        <div className="alert alert-danger mb-3">
          {weatherError} - Verifica tu configuración
        </div>
      )}

      <div className="section-box">
        <Bienestar />
      </div>

      <div className="section-box weather-section">
        <select 
  value={ciudad} 
  onChange={(e) => setCiudad(e.target.value)}
  className="form-select mb-3"
>
  <option value="Puerto Montt">Puerto Montt</option>
  <option value="Santiago">Santiago</option>
  <option value="Buenos Aires">Buenos Aires</option>
  <option value="Lima">Lima</option>
  <option value="London">London (Prueba)</option>
</select>
        <WeatherDisplay city={ciudad} />
      </div>

      <div className="row">
        <div className="column section-box">
          <ActivityForm onAddActivity={agregarActividad} />
        </div>
        <div className="column section-box">
          <RoutineList 
            actividades={actividades} 
            onDelete={eliminarActividad} 
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