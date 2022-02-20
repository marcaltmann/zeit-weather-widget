import { useState } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import { loadState, saveState } from './persistence';
import { fetchCity } from './api';
import useWeatherData from './useWeatherData';
import WeatherWidget from './WeatherWidget';
import isDayTime from './isDayTime';
import './App.css';

let initialCoords = loadState('coords');

if (!initialCoords) {
    initialCoords = [53.550556, 9.993333];  // Hamburg
}

function App() {
    const [coords, setCoords] = useState(initialCoords);
    const { isLoading, error, data } = useWeatherData(coords[0], coords[1]);

    function saveNewCoords(coords) {
        setCoords(coords);
        saveState('coords', coords);
    }

    function handleMyLocationClick() {
        navigator.geolocation.getCurrentPosition(position => {
            const coords = [
                position.coords.latitude,
                position.coords.longitude,
            ];
            saveNewCoords(coords);
        }, error => console.log(error));
    }

    async function handleCityChange(name) {
        const coords = await fetchCity(name);
        if (coords) {
            saveNewCoords(coords);
        }
    }

    return (
        <div className="App">
            {data && (
                <Helmet>
                    <html className={classNames({
                        'color-scheme-dark': !isDayTime(data.sunrise, data.sunset),
                        })}
                    />
                </Helmet>
            )}

            <header className="App-header">
                <WeatherWidget
                    isLoading={isLoading}
                    error={error}
                    data={data}
                    onMyLocationClick={handleMyLocationClick}
                    onCityChange={handleCityChange}
                />
            </header>
        </div>
  );
}

export default App;
