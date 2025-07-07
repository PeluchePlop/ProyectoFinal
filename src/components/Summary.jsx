import React from 'react';

const Summary = ({ actividades, onClear }) => {
  const totalActividades = actividades.length;
  const diasUnicos = new Set();
  actividades.forEach(act => act.dias.forEach(dia => diasUnicos.add(dia)));
  const totalDiasUnicos = diasUnicos.size;

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '30px auto',
        backgroundColor: '#f9f5ff',
        borderRadius: '14px',
        boxShadow: '0 6px 16px rgba(156, 110, 222, 0.2)',
        padding: '24px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#4a3c75',
      }}
    >
      <h3 style={{ marginBottom: '20px', textAlign: 'center', fontWeight: '700', fontSize: '1.6rem' }}>
        Resumen del Bienestar
      </h3>

      <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
        Total de actividades registradas: <strong>{totalActividades}</strong>
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
        Total de días activos en la semana: <strong>{totalDiasUnicos}</strong>
      </p>

      {totalActividades > 0 && (
        <>
          <h4 style={{ marginBottom: '14px', borderBottom: '2px solid #9c6ede', paddingBottom: '8px' }}>
            Detalles de actividades
          </h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0, maxHeight: '180px', overflowY: 'auto' }}>
            {actividades.map(({ id, nombre, dias }) => (
              <li
                key={id}
                style={{
                  marginBottom: '10px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#e6d7ff',
                  boxShadow: 'inset 0 0 6px rgba(156, 110, 222, 0.3)',
                  fontWeight: '600',
                  fontSize: '1rem',
                  color: '#5a2a83',
                }}
                title={`Días: ${dias.join(', ')}`}
              >
                {nombre} — <span style={{ fontWeight: '400', fontSize: '0.9rem' }}>{dias.join(', ')}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={onClear}
            style={{
              marginTop: '24px',
              backgroundColor: '#d9534f',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              userSelect: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b03a3a')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#d9534f')}
          >
            Borrar todas las actividades
          </button>
        </>
      )}
    </div>
  );
};

export default Summary;

