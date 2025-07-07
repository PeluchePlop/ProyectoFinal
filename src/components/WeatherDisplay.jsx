import React, { useState, useEffect } from 'react';

const ciudades = [
  { name: 'Puerto Montt', lat: -41.469, lon: -72.942 },
  { name: 'Frutillar', lat: -41.148, lon: -73.111 },
  { name: 'Llanquihue', lat: -41.317, lon: -72.973 },
  { name: 'Puerto Varas', lat: -41.319, lon: -72.973 },
  { name: 'Ancud', lat: -41.868, lon: -73.826 },
];

const WeatherDisplay = () => {
  const [ciudad, setCiudad] = useState(ciudades[0]);
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      setClima(null);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.lat}&longitude=${ciudad.lon}&current_weather=true&timezone=America/Santiago`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener clima');
        const data = await res.json();
        setClima(data.current_weather);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [ciudad]);

  return (
    <div style={{
      maxWidth: 420, margin: '20px auto', padding: 24,
      backgroundColor: '#f3e8ff', borderRadius: 14,
      boxShadow: '0 4px 10px rgba(156,110,222,0.25)',
      textAlign: 'center', fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h3 style={{ color: '#5a2a83', marginBottom: 16 }}>🌤️ Clima Actual</h3>

      <select
        value={ciudad.name}
        onChange={e => {
          const sel = ciudades.find(c => c.name === e.target.value);
          setCiudad(sel);
        }}
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: '1.5px solid #9c6ede',
          marginBottom: 20,
          width: '100%',
          fontSize: '1rem',
        }}
      >
        {ciudades.map(c => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>

      {loading && <p style={{ color: '#555' }}>Cargando clima...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {clima && !error && (
        <div>
          <p style={{ fontSize: '1.8rem' }}>🌡️ {clima.temperature} °C</p>
          <p>🌬️ Velocidad viento: {clima.windspeed} km/h</p>
          <p>🌡️ Dirección: {clima.winddirection}°</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;







