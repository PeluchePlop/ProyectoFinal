import React, { useEffect, useState } from 'react';
import ActivityForm from './components/ActivityForm';
import RoutineList from './components/RoutineList';
import { guardarActividades, obtenerActividades } from './services/localStorage';

function App() {
  const [actividades, setActividades] = useState([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const datosGuardados = obtenerActividades();
    setActividades(datosGuardados);
  }, []);

  // Guardar en localStorage cuando cambia
  useEffect(() => {
    guardarActividades(actividades);
  }, [actividades]);

  const agregarActividad = (actividad) => {
    setActividades([...actividades, actividad]);
  };

  const eliminarActividad = (id) => {
    setActividades(actividades.filter(act => act.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Planificador de Bienestar</h2>
      <ActivityForm onAddActivity={agregarActividad} />
      <hr />
      <RoutineList actividades={actividades} onDelete={eliminarActividad} />
    </div>
  );
}

export default App;
