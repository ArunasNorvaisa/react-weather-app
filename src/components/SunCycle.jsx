import { DATE_TIME_OPTIONS, getTime } from '../model/model.js';

export default function SunCycle({ sunrise, sunset, timezone }) {
  const timeNow = Math.floor(Date.now() / 1000);
  const dayLength = sunset - sunrise;

  const calculateSunPosition = (timeNow, sunrise, sunset, dayLength) => {
    if (sunrise === undefined || sunset === undefined) {
      return { x: 1, y: 1 }; // White night
    }
    if (timeNow < sunrise) {
      return { x: 0, y: 0 }; // Before sunrise
    }
    if (timeNow > sunset) {
      return { x: 2, y: 0 }; // After sunset
    }
    const dayProgress = sunset - timeNow;
    const normalizedProgress = (dayProgress / dayLength) * Math.PI;
    return {
      x: Math.cos(normalizedProgress) + 1,
      y: Math.sin(normalizedProgress)
    };
  };

  const sunPosition = calculateSunPosition(timeNow, sunrise, sunset, dayLength);

  const timeOptions = {
    ...DATE_TIME_OPTIONS.time.noSeconds12hours,
    timeZone: timezone
  };

  const sunRise = sunrise ? getTime(sunrise, timeOptions) : 'White night';
  const sunSet = sunset ? getTime(sunset, timeOptions) : 'White night';

  return (
    <div className="sunCycle">
      <span className="sunrise">
        <img src="/images/icons/sunrise.svg" alt="Sunrise" />
        <span className="sunriseTime">{sunRise}</span>
      </span>
      <span className="sunset">
        <img src="/images/icons/sunset.svg" alt="Sunset" />
        <span className="sunsetTime">{sunSet}</span>
      </span>
      <span className="sun">
        <img
          src="/images/icons/sun.svg"
          alt="Sun"
          style={{
            left: `calc(${sunPosition.x} * 50% - 23px)`,
            bottom: `calc(${sunPosition.y} * 100% - 12px)`
          }}
        />
      </span>
    </div>
  );
}
