import { useState, useEffect } from 'react';

export function useWeather() {
  const [weather, setWeather] = useState(null); // { temperature }
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Géolocalisation non disponible sur cet appareil");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
          );
          const data = await res.json();
          setWeather({ temperature: Math.round(data.current.temperature_2m) });
        } catch (e) {
          setError("Impossible de récupérer la météo");
        }
      },
      () => setError("Géolocalisation refusée")
    );
  }, []);

  return { weather, error };
}