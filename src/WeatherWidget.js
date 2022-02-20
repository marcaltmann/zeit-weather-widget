import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMyLocation } from 'react-icons/md';

import CityForm from './CityForm';
import './weather-widget.css';

export default function WeatherWidget({
    isLoading,
    error,
    data,
    onMyLocationClick,
    onCityChange,
}) {
    const [showForm, setShowForm] = useState(false);

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
                                onCityChange(name);
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
