import React, { useState } from 'react';
import ActivityForm from './components/ActivityForm';

function App() {
  const [actividades, setActividades] = useState([]);

  const agregarActividad = (actividad) => {
    setActividades([...actividades, actividad]);
    console.log('Actividad agregada:', actividad);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Planificador de Bienestar</h2>
      <ActivityForm onAddActivity={agregarActividad} />
    </div>
  );
}

export default App;
