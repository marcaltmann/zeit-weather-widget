export default function transformWeatherData(apiData) {
    if (typeof apiData !== 'object') {
        throw new TypeError('apiData must be object.')
    }

    return {
        description: apiData.weather[0].description,
        icon: apiData.weather[0].icon,
        temp: Math.round(apiData.main.temp),
        city: apiData.name,
    };
}
