import React from 'react';
import useWeatherAPI from '../hooks/useWeatherAPI';

const WeatherDisplay = ({ city }) => {
  const { weather, loading, error } = useWeatherAPI(city);

  if (loading) return <div className="alert alert-info">Cargando clima...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!weather) return <div className="alert alert-warning">No hay datos del clima</div>;

  return (
    <div className="weather-card p-3 border rounded">
      <h3>{weather.name}</h3>
      <p>🌡️ Temp: {weather.main?.temp ?? 'N/A'}°C</p>
      <p>☁️ {weather.weather?.[0]?.description ?? 'N/A'}</p>
      {weather.weather?.[0]?.icon && (
        <img 
          src={weather.weather[0].icon} 
          alt="Estado del clima"
          className="weather-icon"
        />
      )}
    </div>
  );
};

export default WeatherDisplay;