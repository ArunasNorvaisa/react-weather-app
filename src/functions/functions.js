export const getDate = (time, options) => {
  return new Date(time * 1e3).toLocaleDateString('en', options);
};

export const CtoF = tempC => { return tempC * 1.8 + 32 };