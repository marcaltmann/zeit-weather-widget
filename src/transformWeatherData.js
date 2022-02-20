export default function transformWeatherData(apiData) {
    if (typeof apiData !== 'object') {
        throw new TypeError('apiData must be object.')
    }

    return {
        description: apiData.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`,
        temp: Math.round(apiData.main.temp),
        city: apiData.name,
        sunrise: apiData.sys.sunrise * 1000,
        sunset: apiData.sys.sunset * 1000,
    };
}
