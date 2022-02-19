import PropTypes from 'prop-types';

import useWeatherData from './useWeatherData';
import './weather-widget.css';

export default function WeatherWidget({
    lat,
    lon,
    onCoordsChange,
}) {
    const { isLoading, error, data } = useWeatherData(lat, lon);

    function setNewCoords() {
        navigator.geolocation.getCurrentPosition(position => {
            const coords = [
                position.coords.latitude,
                position.coords.longitude,
            ];
            console.log(coords);
            onCoordsChange(coords);
        }, error => console.log(error));
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
                <p className="weather__text weather__text--detail">{data.name}</p>
            </div>
            <button
                type="button"
                onClick={setNewCoords}
            >
                x
            </button>
        </article>
    );
}

WeatherWidget.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    onCoordsChange: PropTypes.func.isRequired,
};
