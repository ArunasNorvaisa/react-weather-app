const commonDateFormats = {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
};

const commonTimeFormats = {
  hour: '2-digit',
  minute: '2-digit'
};

export const DATE_TIME_OPTIONS = {
  date: {
    fullWithTime: {
      ...commonDateFormats,
      ...commonTimeFormats,
      hour12: true
    },
    shortWithWeekday: {
      ...commonDateFormats
    },
    weekdayOnly: {
      weekday: 'long'
    }
  },
  time: {
    noSeconds24hours: {
      ...commonTimeFormats,
      hour12: false
    },
    noSeconds12hours: {
      ...commonTimeFormats,
      hour12: true
    }
  }
};

export function getDate(time, options) {
  return new Date(time * 1e3).toLocaleDateString('en', options);
}

export function getTime(time, options) {
  return new Date(time * 1e3).toLocaleTimeString('en', options);
}

export function kelvinsToCelcius(tempK) {
  return (tempK - 272.15).toFixed(0);
}

export function kelvinsToFahrenheit(tempK) {
  return (tempK * 1.8 - 459.67).toFixed(0);
}

export const iconCodeToFileMapper = {
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'partly-cloudy-day',
  '04n': 'partly-cloudy-night',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'fog',
  '50n': 'fog'
};
