import React, { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import EmotionTracker from './components/EmotionTracker';
import RoutineList from './components/RoutineList';
import Summary from './components/Summary';
import Bienestar from './components/Bienestar';
import WeatherDisplay from './components/WeatherDisplay';
import EmotionChart from './components/EmotionChart'; // ✅ NUEVA IMPORTACIÓN

const App = () => {
  // ... estado y funciones

  return (
    <div className="app-container">
      <h1>🌿 Planificador de Bienestar</h1>

      <div className="section-box">
        <Bienestar />
      </div>

      <div className="row">
        <div className="column section-box">
          <ActivityForm onAddActivity={agregarActividad} />
        </div>
        <div className="column section-box">
          <RoutineList
            actividades={actividades}
            onDelete={eliminarActividad}
            onUpdate={actualizarActividad}
          />
        </div>
      </div>

      <div className="section-box">
        <EmotionTracker />
      </div>

      <div className="section-box">
        <EmotionChart /> {/* ✅ AÑADIDO AQUÍ */}
      </div>

      <div className="section-box">
        <WeatherDisplay />
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
