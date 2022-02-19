import isDayTime from './isDayTime';

test('is true if current time is between sunset and sunrise', () => {
    const sunrise = 1645251310000;
    const sunset = 1645287945000;

    const FakeDate = {
        now() {
            return 1645285658307;  // daytime
        }
    }

    const actual = isDayTime(sunrise, sunset, FakeDate);
    const expected = true;

    expect(actual).toEqual(expected);
});

test('is false otherwise', () => {
    const sunrise = 1645251310000;
    const sunset = 1645287945000;

    const FakeDate = {
        now() {
            return 1645297967000;  // evening
        }
    }

    const actual = isDayTime(sunrise, sunset, FakeDate);
    const expected = false;

    expect(actual).toEqual(expected);
});
