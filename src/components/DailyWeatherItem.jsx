import { getDate, iconCodeToFileMapper, kelvinsToCelcius, kelvinsToFahrenheit } from '../model/model.js';

export default function DailyWeatherItem({ day, dateOptions, isCelsius }) {
  const { dt, temp, weather } = day;
  const { min, max } = temp;
  const [weatherDetails] = weather;

  const getTemp = (temperature) => (isCelsius ? kelvinsToCelcius(temperature) : kelvinsToFahrenheit(temperature));

  const getIconURL = (iconCode) => {
    const icon = iconCodeToFileMapper[iconCode] ?? 'clear-day';
    return `/images/icons/${icon}.svg`;
  };

  return (
    <div className="dailyWeather">
      <div>
        <div className="icon">
          <img src={getIconURL(weatherDetails.icon)} alt="icon" />
        </div>
        <div className="date">{getDate(dt, dateOptions)}</div>
        <div>
          {getTemp(min)}&deg; / {getTemp(max)}&deg; {isCelsius ? 'C' : 'F'}
        </div>
        <div className="forecastSummary">{weatherDetails.description}</div>
        <hr />
      </div>
    </div>
  );
}
