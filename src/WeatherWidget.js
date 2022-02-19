import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMyLocation } from 'react-icons/md';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import CityForm from './CityForm';
import useWeatherData from './useWeatherData';
import fetchCity from './fetchCity';
import isNightTime from './isNightTime';
import './weather-widget.css';

export default function WeatherWidget({
    lat,
    lon,
    onCoordsChange,
}) {
    const [showForm, setShowForm] = useState(false);
    const { isLoading, error, data } = useWeatherData(lat, lon);

    const nightTime = isNightTime();

    function setNewCoords() {
        navigator.geolocation.getCurrentPosition(position => {
            const coords = [
                position.coords.latitude,
                position.coords.longitude,
            ];
            onCoordsChange(coords);
        }, error => console.log(error));
    }

    async function handleCityChange(name) {
        const coords = await fetchCity(name);
        if (coords) {
            onCoordsChange(coords);
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

    return (
        <article className="weather">
            <Helmet>
                <html className={classNames({ 'color-scheme-dark': nightTime })} />
            </Helmet>
            <img
                className="weather__img"
                src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt=""
            />
            <div className="weather__body">
                <p className="weather__text">{data.description}</p>
                <p className="weather__text weather__text--large">{data.temp}°</p>
                {
                    showForm ? (
                        <CityForm
                            onSubmit={name => {
                                handleCityChange(data.name);
                                setShowForm(false);
                            }}
                            onCancel={() => setShowForm(false)}
                        />
                    ) : (
                        <div className="weather__city">
                            <button
                                type="button"
                                className="weather__location"
                                onClick={() => setShowForm(true)}
                            >
                                {data.city}
                            </button>
                            <button
                                type="button"
                                className="weather__my-location"
                                onClick={setNewCoords}
                            >
                                <MdMyLocation />
                            </button>
                        </div>
                    )
                }
            </div>
        </article>
    );
}

WeatherWidget.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    onCoordsChange: PropTypes.func.isRequired,
};
