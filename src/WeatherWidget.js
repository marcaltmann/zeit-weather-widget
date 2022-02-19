import useWeatherData from './useWeatherData';

import './weather-widget.css';

const coords = [53.550556, 9.993333];  // Hamburg

export default function WeatherWidget() {
    const { isLoading, error, data } = useWeatherData(coords[0], coords[1]);

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
        </article>
    );
}
