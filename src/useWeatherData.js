import { useState, useEffect } from 'react';

import { fetchWeatherData } from './api';
import transformWeatherData from './transformWeatherData';

const REFRESH_INTERVAL = 60;

export default function useWeatherData(lat, lon) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchNewData() {
        const result = await fetchWeatherData(lat, lon);

        if (result.data) {
            setData(result.data);
            setError(null);
        } else {
            setData(null);
            setError(result.error);
        }
    }

    useEffect(() => {
        fetchNewData();

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
