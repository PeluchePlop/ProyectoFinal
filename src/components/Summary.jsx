import React from 'react';

const Summary = ({ actividades, onClear }) => {
  const total = actividades.length;

  return (
    <div>
      <h3>Resumen del Bienestar</h3>
      <p>Total de actividades registradas: <strong>{total}</strong></p>
      {total > 0 && (
        <button onClick={onClear} style={{
          padding: '8px 16px',
          backgroundColor: '#d9534f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Borrar todas las actividades
        </button>
      )}
    </div>
  );
};

export default Summary;