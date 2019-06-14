export const getDate = (time, options) => {
  return new Date(time * 1e3).toLocaleDateString('en', options);
};

export const getTime = (time, options) => {
  return new Date(time * 1e3).toLocaleTimeString('en', options);
};

export const CtoF = tempC => tempC * 1.8 + 32;