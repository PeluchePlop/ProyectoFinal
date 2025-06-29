import React, { useEffect, useState } from 'react';

const Bienestar = () => {
  const [frase, setFrase] = useState('');
  const [autor, setAutor] = useState('');
  const [frases, setFrases] = useState([]);
  const [cargando, setCargando] = useState(true);

  const mostrarFraseAleatoria = () => {
    if (frases.length > 0) {
      const aleatoria = frases[Math.floor(Math.random() * frases.length)];
      setFrase(aleatoria.texto);
      setAutor(aleatoria.autor);
    }
  };

  useEffect(() => {
    const cargarFrases = async () => {
      try {
        const res = await fetch('/data/frases_motivacionales_200.json');
        const data = await res.json();
        setFrases(data);
        const aleatoria = data[Math.floor(Math.random() * data.length)];
        setFrase(aleatoria.texto);
        setAutor(aleatoria.autor);
      } catch (error) {
        console.error('Error al cargar las frases:', error);
        setFrase('No se pudo cargar una frase motivacional.');
        setAutor('');
      } finally {
        setCargando(false);
      }
    };

    cargarFrases();
  }, []);

  return (
    <div style={{
      backgroundColor: '#c994f0',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '600px',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        color: '#333'
      }}>
        <h2 style={{ color: '#4dc268', marginBottom: '1.5rem' }}>Tarjeta Motivacional </h2>

        {cargando ? (
          <p>Cargando frase...</p>
        ) : (
          <>
            <p style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>"{frase}"</p>
            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>— {autor}</p>
          </>
        )}

        <button
          onClick={mostrarFraseAleatoria}
          disabled={cargando}
          style={{
            marginTop: '2rem',
            backgroundColor: '#58b454',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          Otra frase
        </button>
      </div>
    </div>
  );
};

export default Bienestar;






