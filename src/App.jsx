import React, { useEffect, useState } from 'react';
import ActivityForm from './components/ActivityForm';
import RoutineList from './components/RoutineList';
import EmotionTracker from './components/EmotionTracker';
import QuoteBox from './components/QuoteBox';
import Dashboard from './pages/Dashboard';
import { guardarActividades, obtenerActividades } from './services/localStorage';
import Bienestar from './components/Bienestar';

function App() {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const datosGuardados = obtenerActividades();
    setActividades(datosGuardados);
  }, []);

  useEffect(() => {
    guardarActividades(actividades);
  }, [actividades]);

  const agregarActividad = (actividad) => {
    setActividades([...actividades, actividad]);
  };

  const eliminarActividad = (id) => {
    setActividades(actividades.filter((act) => act.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Planificador de Bienestar</h2>

      <Bienestar />

      <ActivityForm onAddActivity={agregarActividad} />
      <hr />

      <RoutineList actividades={actividades} onDelete={eliminarActividad} />
      <hr />

      <EmotionTracker />
      <QuoteBox />
      <Dashboard actividades={actividades} setActividades={setActividades} />
    </div>
  );
}

export default App;

