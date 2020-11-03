export function getDate(time, options) {
  return new Date(time * 1e3).toLocaleDateString('en', options);
}

export function getTime(time, options) {
  return new Date(time * 1e3).toLocaleTimeString('en', options);
}

export function KtoC(tempK) {
  return tempK - 272.15;
}

export function KtoF(tempK) {
  return tempK * 1.8 - 459.67;
}

export function getIcon(owIconType) {
  switch (owIconType) {
    case '01n':
      return 'clear-night';
    case '02d':
    case '04d':
      return 'partly-cloudy-day';
    case '02n':
    case '04n':
      return 'partly-cloudy-night';
    case '03d':
    case '03n':
      return 'cloudy';
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return 'rain';
    case '11d':
    case '11n':
      return 'thunderstorm';
    case '13d':
    case '13n':
      return 'snow';
    case '50d':
    case '50n':
      return 'fog';
    default:
      return 'clear-day';
  }
}
