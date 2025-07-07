import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ActivityForm = ({ onAddActivity }) => {
  const [nombre, setNombre] = useState('');
  const [dias, setDias] = useState([]);

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleCheckboxChange = (dia) => {
    setDias((prevDias) =>
      prevDias.includes(dia)
        ? prevDias.filter((d) => d !== dia)
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
      dias,
    };

    onAddActivity(nuevaActividad);
    setNombre('');
    setDias([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#d9b8f9',
        borderRadius: '12px',
        padding: '24px 28px',
        boxShadow: '0 6px 15px rgba(156, 110, 222, 0.3)',
        maxWidth: '420px',
        margin: '40px auto',
        border: '1.5px solid #b095f9',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3
        style={{
          marginBottom: '22px',
          color: '#4b2a8c',
          fontWeight: '700',
          fontSize: '1.5rem',
          textAlign: 'center',
          letterSpacing: '0.04em',
        }}
      >
        Agregar Actividad
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="nombreActividad"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#4b2a8c',
            fontSize: '1rem',
          }}
        >
          Nombre de la actividad
        </label>
        <input
          type="text"
          id="nombreActividad"
          placeholder="Ej: Meditar, Ejercicio, Leer..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '10px',
            border: '2px solid #9c6ede',
            fontSize: '1rem',
            outlineColor: '#7a4cf5',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#7a4cf5')}
          onBlur={(e) => (e.target.style.borderColor = '#9c6ede')}
        />
      </div>

      <fieldset style={{ marginBottom: '26px', border: 'none' }}>
        <legend
          style={{
            marginBottom: '12px',
            fontWeight: '700',
            fontSize: '1.1rem',
            color: '#4b2a8c',
          }}
        >
          Días de la semana
        </legend>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {diasSemana.map((dia) => (
            <label
              key={dia}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px',
                borderRadius: '16px',
                backgroundColor: dias.includes(dia) ? '#7a4cf5' : '#ede6fc',
                color: dias.includes(dia) ? 'white' : '#7a4cf5',
                fontWeight: '600',
                boxShadow: dias.includes(dia)
                  ? '0 4px 12px rgba(122, 76, 245, 0.4)'
                  : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <input
                type="checkbox"
                checked={dias.includes(dia)}
                onChange={() => handleCheckboxChange(dia)}
                style={{ display: 'none' }}
              />
              {dia}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!nombre.trim() || dias.length === 0}
        style={{
          backgroundColor:
            !nombre.trim() || dias.length === 0 ? '#bdbdbd' : '#7a4cf5',
          color: 'white',
          border: 'none',
          borderRadius: '14px',
          padding: '14px',
          width: '100%',
          fontSize: '1.1rem',
          fontWeight: '700',
          cursor: !nombre.trim() || dias.length === 0 ? 'not-allowed' : 'pointer',
          boxShadow:
            !nombre.trim() || dias.length === 0
              ? 'none'
              : '0 6px 15px rgba(122, 76, 245, 0.5)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled)
            e.currentTarget.style.backgroundColor = '#592ce8';
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled)
            e.currentTarget.style.backgroundColor = '#7a4cf5';
        }}
      >
        Guardar Actividad
      </button>
    </form>
  );
};

ActivityForm.propTypes = {
  onAddActivity: PropTypes.func.isRequired,
};

export default ActivityForm;


