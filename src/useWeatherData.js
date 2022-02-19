import { useState, useEffect } from 'react';

import transformWeatherData from './transformWeatherData';

const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '***REMOVED***';

const REFRESH_INTERVAL = 60;

export default function useWeatherData(lat, lon) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchWeatherData() {
        const url = `${endpoint}?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=${apiKey}`;

        const response = await fetch(url);

        if (response.ok) {
            const weatherData = await response.json();
            setData(weatherData);
            setError(null);
        } else {
            setData(null);
            setError(response.statusText);
        }
    }

    useEffect(() => {
        fetchWeatherData();

        const interval = setInterval(() => {
            fetchWeatherData();
        }, REFRESH_INTERVAL * 1000);

        return () => {
            clearInterval(interval);
        }
    }, [lat, lon]);

    const selectedData = data ? transformWeatherData(data) : null;

    return {
        isLoading: !data && !error,
        error,
        data: selectedData,
    };
}
