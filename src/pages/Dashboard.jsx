import React from 'react';

const Dashboard = ({ actividades, setActividades }) => {
  const total = actividades.length;

  const borrarTodo = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar todas las actividades?");
    if (confirmar) {
      setActividades([]);
      localStorage.removeItem('actividades');
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Resumen del Bienestar</h5>
        <p className="card-text">
          Total de actividades registradas: <strong>{total}</strong>
        </p>
        <button className="btn btn-danger btn-sm" onClick={borrarTodo}>
          Borrar todas las actividades
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
