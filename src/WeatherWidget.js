import { useState } from 'react';
import PropTypes from 'prop-types';

import useWeatherData from './useWeatherData';
import fetchCity from './fetchCity';
import './weather-widget.css';

export default function WeatherWidget({
    lat,
    lon,
    onCoordsChange,
}) {
    const [city, setCity] = useState('');

    const { isLoading, error, data } = useWeatherData(lat, lon);

    function setNewCoords() {
        navigator.geolocation.getCurrentPosition(position => {
            const coords = [
                position.coords.latitude,
                position.coords.longitude,
            ];
            onCoordsChange(coords);
        }, error => console.log(error));
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const input = form.elements[0];
        const value = input.value;
        console.log(input, value);

        const coords = await fetchCity(value.trim());
        if (coords) {
            onCoordsChange(coords);
            input.value = '';
        }
    }

    if (isLoading) {
        return <article className="weather">Loading...</article>;
    }

    if (error) {
        return (
            <article className="weather">
                <p className="weather__text">
                    Error: {error}
                </p>
            </article>
        );
    }

    // TODO: dynamic weather stuff

    return (
        <article className="weather">
            <img
                className="weather__img"
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt=""
            />
            <div className="weather__body">
                <p className="weather__text">{data.weather[0].description}</p>
                <p className="weather__text weather__text--large">{Math.round(data.main.temp)}°</p>
                <p className="weather__text weather__text--detail">
                    <button
                        type="button"
                        onClick={setNewCoords}
                    >
                        x
                    </button>
                    {data.name}
                </p>
                <form onSubmit={handleFormSubmit}>
                    <input placeholder="Stadt eingeben" />
                    <button type="submit">Absenden</button>
                </form>
            </div>
        </article>
    );
}

WeatherWidget.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    onCoordsChange: PropTypes.func.isRequired,
};
