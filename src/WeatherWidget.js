import { useState, useEffect } from 'react';

import './weather-widget.css';

const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '***REMOVED***';

const REFRESH_INTERVAL = 60;

export default function WeatherWidget() {
    const coords = [53.550556, 9.993333];  // Hamburg

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchWeatherData() {
        const url = `${endpoint}?lat=${coords[0]}&lon=${coords[1]}&units=metric&lang=de&appid=${apiKey}`;

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
    }, []);

    if (error) {
        return (
            <article className="weather">
                <p className="weather__text">
                    Error: {error}
                </p>
            </article>
        );
    }

    if (!data) {
        return <article className="weather">Loading...</article>;
    }

    return (
        <article className="weather">
            <img
                className="weather__img"
                src="http://openweathermap.org/img/wn/04n@2x.png"
                alt=""
            />
            <div className="weather__body">
                <p className="weather__text">{data.weather[0].description}</p>
                <p className="weather__text weather__text--large">{Math.round(data.main.temp)}°</p>
                <p className="weather__text weather__text--detail">{data.name}</p>
            </div>
        </article>
    );
}
