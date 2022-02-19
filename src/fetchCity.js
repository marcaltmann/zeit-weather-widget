const endpoint = 'https://api.openweathermap.org/geo/1.0/direct';
const apiKey = '***REMOVED***';

export default async function fetchCity(name) {
    const url = `${endpoint}?q=${name}&limit=1&appid=${apiKey}`;

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
