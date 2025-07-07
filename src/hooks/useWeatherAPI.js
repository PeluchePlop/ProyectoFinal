import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeatherAPI = (city = "Puerto Montt") => { // Valor por defecto Puerto Montt
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY?.trim();
        if (!apiKey) throw new Error("API Key no configurada en .env");

        // 1. Verificar caché local primero
        const cacheKey = `weather_${city.replace(/\s+/g, '_')}`;
        const cachedData = localStorage.getItem(cacheKey);
        const cacheExpiry = localStorage.getItem(`${cacheKey}_expiry`);

        if (cachedData && cacheExpiry > Date.now()) {
          setWeather(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // 2. Hacer la petición a la API
        const encodedCity = encodeURIComponent(city); // Codificar para URLs
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json`, {
            params: {
              q: encodedCity,
              key: apiKey,
              lang: 'es',
              aqi: 'no' // Datos adicionales opcionales
            },
            timeout: 5000 // Timeout de 5 segundos
          }
        );

        // 3. Transformar datos
        const weatherData = {
          ...response.data,
          // Estructura compatible con componentes existentes
          name: response.data.location.name,
          main: {
            temp: response.data.current.temp_c,
            humidity: response.data.current.humidity,
            feelslike: response.data.current.feelslike_c
          },
          weather: [{
            description: response.data.current.condition.text,
            icon: response.data.current.condition.icon,
            wind: response.data.current.wind_kph
          }]
        };

        // 4. Guardar en estado y caché
        setWeather(weatherData);
        localStorage.setItem(cacheKey, JSON.stringify(weatherData));
        localStorage.setItem(`${cacheKey}_expiry`, Date.now() + 30 * 60 * 1000); // 30 mins de caché
        setError(null);

      } catch (error) {
        // Manejo mejorado de errores
        let errorMessage = "Error al cargar el clima";
        
        if (error.response) {
          errorMessage = error.response.data.error?.message || 
                        `Error ${error.response.status}: ${error.response.statusText}`;
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = "Tiempo de espera agotado";
        }

        console.error("Error en useWeatherAPI:", {
          city,
          error: errorMessage,
          details: error.config
        });

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Limpieza si el componente se desmonta
    return () => {
      // Puedes añadir lógica de cancelación si es necesario
    };
  }, [city]);

  return { weather, loading, error };
};

export default useWeatherAPI;