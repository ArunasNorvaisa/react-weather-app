import React from 'react';
import { getTime } from '../functions/functions';

const SunCycle = props => {

  const dayLength = props.sunset - props.sunrise;
  const timeNow = (new Date() / 1e3).toFixed(0);
  const dayProgress = props.sunset - timeNow;
  // We're adding 1 to sunPositionX so it be 0÷2 rather than -1÷1
  let sunPositionX = Math.cos((dayProgress / dayLength) * Math.PI) + 1;
  let sunPositionY = Math.sin((dayProgress / dayLength) * Math.PI);

  // 2 conditions valid at night (before sunrise and after sunset), placing the Sun
  // on the sunCycle rather than leaving it somewhere below the semicircle
  if (timeNow < props.sunrise) {
    sunPositionX = 0;
    sunPositionY = 0;
  } else if (timeNow > props.sunset) {
    sunPositionX = 2;
    sunPositionY = 0;
  }

  const timeOptions = {
    timeZone : props.timezone,
    hour     : '2-digit',
    minute   : '2-digit',
    hour12   : true
  };

  return (
    <div className='sunCycle'>
      <span className='sunrise'>
        <img src='./images/icons/sunrise.svg' alt='Sunrise'/>
        <span className='sunriseTime'>{getTime(props.sunrise, timeOptions)}</span>
      </span>
      <span className='sunset'>
        <img src='./images/icons/sunset.svg' alt='Sunset'/>
        <span className='sunsetTime'>{getTime(props.sunset, timeOptions)}</span>
      </span>
      <span className='sun'>
        <img
          src='./images/icons/sun.svg'
          alt='Sun'
          style={{
            left: `calc(${sunPositionX} * 50% - 23px)`,
            bottom: `calc((${sunPositionY} * 100%) - 12px)`
          }}
        />
      </span>
    </div>
  );
};

export default SunCycle;
