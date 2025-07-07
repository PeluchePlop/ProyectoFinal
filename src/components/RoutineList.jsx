import React, { useState } from 'react';

const RoutineList = ({ actividades, onDelete, onUpdate }) => {
  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDias, setEditDias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [actividadModal, setActividadModal] = useState(null);

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const comenzarEdicion = (actividad) => {
    setEditandoId(actividad.id);
    setEditNombre(actividad.nombre);
    setEditDias(actividad.dias);
  };

  const guardarEdicion = () => {
    onUpdate(editandoId, {
      id: editandoId,
      nombre: editNombre,
      dias: editDias,
    });
    setEditandoId(null);
    setEditNombre('');
    setEditDias([]);
  };

  const alternarDia = (dia) => {
    setEditDias((prevDias) =>
      prevDias.includes(dia)
        ? prevDias.filter((d) => d !== dia)
        : [...prevDias, dia]
    );
  };

  const abrirModal = (actividad) => {
    setActividadModal(actividad);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setActividadModal(null);
  };

  if (!actividades || actividades.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#777', fontStyle: 'italic' }}>
        Aún no has agregado ninguna rutina.
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: '520px',
        margin: '24px auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 style={{ marginBottom: '18px', color: '#5a2a83', textAlign: 'center' }}>
        Mis Rutinas
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {actividades.map((actividad) => (
          <div
            key={actividad.id}
            style={{
              border: '1.5px solid #9c6ede',
              borderRadius: '14px',
              padding: '20px',
              backgroundColor: '#f3e8ff',
              boxShadow: '0 4px 10px rgba(156, 110, 222, 0.25)',
              transition: 'transform 0.15s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {editandoId === actividad.id ? (
              <>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  placeholder="Nombre de la actividad"
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '14px',
                    borderRadius: '10px',
                    border: '1.8px solid #9c6ede',
                    fontSize: '1rem',
                    outlineColor: '#9c6ede',
                    boxShadow: '0 0 6px #b991ff55',
                  }}
                />
                <div
                  style={{
                    marginBottom: '14px',
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
                        fontWeight: '600',
                        color: editDias.includes(dia) ? '#5a2a83' : '#aaa',
                        backgroundColor: editDias.includes(dia)
                          ? '#d9bef8'
                          : '#f7f3fc',
                        padding: '6px 14px',
                        borderRadius: '14px',
                        boxShadow: editDias.includes(dia)
                          ? '0 2px 6px rgba(156,110,222,0.4)'
                          : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={editDias.includes(dia)}
                        onChange={() => alternarDia(dia)}
                        style={{ display: 'none' }}
                      />
                      {dia}
                    </label>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <button
                    onClick={guardarEdicion}
                    style={{
                      backgroundColor: '#7c4dff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 18px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px #9c6edeaa',
                      transition: 'background-color 0.3s ease',
                      userSelect: 'none',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#5a2a83')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#7c4dff')
                    }
                    aria-label="Actualizar rutina"
                  >
                    ✏️ Actualizar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    style={{
                      backgroundColor: '#ccc',
                      color: '#444',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 18px',
                      fontSize: '15px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      boxShadow: '0 2px 8px #bbb',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#aaa')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#ccc')
                    }
                    aria-label="Cancelar edición"
                  >
                    ✖️ Cancelar
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong
                    style={{ fontSize: '1.2rem', color: '#5a2a83' }}
                  >
                    {actividad.nombre}
                  </strong>
                  <div
                    style={{
                      fontSize: '0.95rem',
                      color: '#7a5fc0',
                      marginTop: '6px',
                    }}
                  >
                    {actividad.dias.join(', ')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => comenzarEdicion(actividad)}
                    style={{
                      backgroundColor: '#8a73ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 3px 8px #9c6edeaa',
                      transition: 'background-color 0.3s ease',
                      userSelect: 'none',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#5a2a83')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#8a73ff')
                    }
                    aria-label="Editar rutina"
                  >
                    ✏️ Editar
                  </button>

                  <button
                    onClick={() => abrirModal(actividad)}
                    style={{
                      backgroundColor: '#6b8cff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 3px 8px #688effaa',
                      transition: 'background-color 0.3s ease',
                      userSelect: 'none',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#3f62c7')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#6b8cff')
                    }
                    aria-label="Ver detalles de rutina"
                  >
                    🔍 Ver detalles
                  </button>

                  <button
                    onClick={() => onDelete(actividad.id)}
                    style={{
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 3px 8px #ff4747aa',
                      transition: 'background-color 0.3s ease',
                      userSelect: 'none',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#d93f3f')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#ff6b6b')
                    }
                    aria-label="Eliminar rutina"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalVisible && actividadModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          tabIndex={-1}
          onClick={cerrarModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              color: '#5a2a83',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <h2 id="modalTitle" style={{ marginBottom: '18px' }}>
              Detalles de la rutina
            </h2>
            <p>
              <strong>Nombre:</strong> {actividadModal.nombre}
            </p>
            <p>
              <strong>Días:</strong> {actividadModal.dias.join(', ')}
            </p>
            <button
              onClick={cerrarModal}
              style={{
                marginTop: '24px',
                backgroundColor: '#7c4dff',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 18px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px #9c6edeaa',
                userSelect: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#5a2a83')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#7c4dff')
              }
              aria-label="Cerrar detalles"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineList;
