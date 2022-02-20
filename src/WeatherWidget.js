import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMyLocation } from 'react-icons/md';

import CityForm from './CityForm';
import './WeatherWidget.css';

export default function WeatherWidget({
    isLoading,
    error,
    data,
    onMyLocationClick,
    onCityChange,
}) {
    const [showForm, setShowForm] = useState(false);

    if (isLoading) {
        return <article className="weather-widget">Loading...</article>;
    }

    if (error) {
        return (
            <article className="weather-widget">
                <p className="weather-widget__text">
                    Error: {error}
                </p>
            </article>
        );
    }

    return (
        <article className="weather-widget">
            <img
                className="weather-widget__img"
                src={data.iconUrl}
                alt=""
            />
            <div className="weather-widget__body">
                <p className="weather-widget__text">{data.description}</p>
                <p className="weather-widget__text weather-widget__text--large">{data.temp}°</p>
                {
                    showForm ? (
                        <CityForm
                            onSubmit={name => {
                                onCityChange(name);
                                setShowForm(false);
                            }}
                            onCancel={() => setShowForm(false)}
                        />
                    ) : (
                        <div className="weather-widget__city">
                            <button
                                type="button"
                                className="weather-widget__location"
                                onClick={() => setShowForm(true)}
                            >
                                {data.city}
                            </button>
                            <button
                                type="button"
                                className="weather-widget__my-location"
                                onClick={onMyLocationClick}
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
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    data: PropTypes.object,
    onMyLocationClick: PropTypes.func.isRequired,
    onCityChange: PropTypes.func.isRequired,
};
