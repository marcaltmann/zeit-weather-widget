export default function isDayTime(sunrise, sunset, dateObject = Date) {
    const currentTime = dateObject.now();

    return (sunrise < currentTime && currentTime < sunset);
}
