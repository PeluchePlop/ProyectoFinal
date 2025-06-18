import React from 'react';

const RoutineList = ({ actividades, onDelete }) => {
  if (actividades.length === 0) {
    return <p className="text-muted">Aún no has agregado ninguna rutina.</p>;
  }

  return (
    <div>
      <h4>Mis Rutinas</h4>
      <ul className="list-group">
        {actividades.map((actividad) => (
          <li key={actividad.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{actividad.nombre}</strong>
              <div className="text-muted">
                {actividad.dias.join(', ')}
              </div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(actividad.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoutineList;
