import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ActivityForm = ({ onAddActivity }) => {
  const [nombre, setNombre] = useState('');
  const [dias, setDias] = useState([]);

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleCheckboxChange = (dia) => {
    setDias(prevDias => 
      prevDias.includes(dia)
        ? prevDias.filter(d => d !== dia)
        : [...prevDias, dia]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || dias.length === 0) {
      alert('Por favor completa el nombre y selecciona al menos un día');
      return;
    }

    const nuevaActividad = {
      id: Date.now(),
      nombre: nombre.trim(),
      dias
    };

    onAddActivity(nuevaActividad);
    setNombre('');
    setDias([]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h4 className="mb-3">Agregar Actividad</h4>
      
      <div className="mb-3">
        <label htmlFor="nombreActividad" className="form-label">Nombre de la actividad</label>
        <input
          type="text"
          id="nombreActividad"
          className="form-control"
          placeholder="Ej: Meditar, Ejercicio, Leer..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <fieldset className="mb-3">
        <legend className="form-label">Días de la semana</legend>
        <div className="d-flex flex-wrap gap-2">
          {diasSemana.map((dia) => (
            <div key={dia} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`dia-${dia}`}
                checked={dias.includes(dia)}
                onChange={() => handleCheckboxChange(dia)}
              />
              <label htmlFor={`dia-${dia}`} className="form-check-label">
                {dia}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <button 
        className="btn btn-primary w-100" 
        type="submit"
        disabled={!nombre.trim() || dias.length === 0}
      >
        Guardar Actividad
      </button>
    </form>
  );
};

ActivityForm.propTypes = {
  onAddActivity: PropTypes.func.isRequired
};

export default ActivityForm;