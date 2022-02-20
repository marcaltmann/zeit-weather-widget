const API_KEY = process.env.REACT_APP_API_KEY;
const DATA_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/direct';

export async function fetchWeatherData(lat, lon) {
    const url = `${DATA_ENDPOINT}?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=${API_KEY}`;

    const response = await fetch(url);

    // TODO: Handle fetch failing completely.
    if (response.ok) {
        const weatherData = await response.json();
        return {
            data: weatherData,
            error: null,
        };
    } else {
        return {
            data: null,
            error: response.statusText,
        };
    }
}

export async function fetchCity(name) {
    const url = `${GEOCODING_ENDPOINT}?q=${name}&limit=1&appid=${API_KEY}`;

    const response = await fetch(url);

    if (response.ok) {
        const locationData = await response.json();
        const firstCity = locationData[0];
        const coords = [firstCity.lat, firstCity.lon];
        return coords;
    } else {
        return null;
        // Todo: Throw.
    }
}
