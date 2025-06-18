// src/components/ActivityForm.jsx
import React, { useState } from 'react';

const ActivityForm = ({ onAddActivity }) => {
  const [nombre, setNombre] = useState('');
  const [dias, setDias] = useState([]);

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleCheckboxChange = (dia) => {
    if (dias.includes(dia)) {
      setDias(dias.filter((d) => d !== dia));
    } else {
      setDias([...dias, dia]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || dias.length === 0) return;

    const nuevaActividad = {
      id: Date.now(),
      nombre,
      dias
    };

    onAddActivity(nuevaActividad);
    setNombre('');
    setDias([]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h4>Agregar Actividad</h4>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Ej: Meditar"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <div className="mb-2">
        {diasSemana.map((dia) => (
          <div key={dia} className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id={dia}
              checked={dias.includes(dia)}
              onChange={() => handleCheckboxChange(dia)}
            />
            <label htmlFor={dia} className="form-check-label">
              {dia}
            </label>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" type="submit">
        Guardar Actividad
      </button>
    </form>
  );
};

export default ActivityForm;
