import transformWeatherData from './transformWeatherData';

test('transforms API data into our own data format', () => {
    const apiData = {
        "coord": {
            "lon": 13.3889,
            "lat": 52.517
        },
        "weather": [
            {
                "id": 802,
                "main": "Clouds",
                "description": "Mäßig bewölkt",
                "icon": "03d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 7.46,
            "feels_like": 2.13,
            "temp_min": 6.32,
            "temp_max": 8.47,
            "pressure": 1001,
            "humidity": 60
        },
        "visibility": 10000,
        "wind": {
            "speed": 13.41,
            "deg": 274,
            "gust": 16.09
        },
        "clouds": {
            "all": 40
        },
        "dt": 1645282079,
        "sys": {
            "type": 2,
            "id": 2009543,
            "country": "DE",
            "sunrise": 1645251310,
            "sunset": 1645287945
        },
        "timezone": 3600,
        "id": 7576815,
        "name": "Alt-Kölln",
        "cod": 200
    };

    const actual = transformWeatherData(apiData);
    const expected = {
        description: 'Mäßig bewölkt',
        icon: '03d',
        temp: 7,
        city: 'Alt-Kölln',
    };

    expect(actual).toEqual(expected);
});
